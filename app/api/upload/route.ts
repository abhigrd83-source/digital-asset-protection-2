import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { generateHash } from "@/lib/hash";
import { calculateSimilarity } from "@/lib/compare";
import { db } from "@/lib/db";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads
    const uploadDir = join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Give it a unique filename
    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    // Generate hash
    const pHash = await generateHash(filePath);

    // Compare with existing
    const existingImages = await db.image.findMany();
    let isDuplicate = false;
    let maxSimilarity = 0;
    
    // Threshold > 90% is duplicate
    for (const img of existingImages) {
      const similarity = calculateSimilarity(pHash, img.hash);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
      }
      if (similarity > 90) { 
        isDuplicate = true;
      }
    }

    // Save to DB
    const status = isDuplicate ? "duplicate" : "original";
    const imageRecord = await db.image.create({
      data: {
        filename: uniqueFilename,
        hash: pHash,
        status,
        similarity: maxSimilarity > 0 ? maxSimilarity : null,
      }
    });

    return NextResponse.json({
      status: imageRecord.status,
      similarity: imageRecord.similarity,
      filename: uniqueFilename,
      id: imageRecord.id,
      hash: pHash,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
