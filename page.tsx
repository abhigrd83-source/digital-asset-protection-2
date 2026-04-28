import ImageCard from "@/components/ImageCard";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  let images:any[]=[];
  try {
    images = await db.image.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch images from DB:", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Media Dashboard</h1>
        <p className="mt-2 text-slate-600">View all protected digital assets and their duplication status.</p>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img: any) => (
            <ImageCard key={img.id} image={img} />
          ))}
        </div>
      )}
    </div>
  );
}
