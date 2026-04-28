"use client";

import { useState, useRef } from "react";
import ResultDisplay from "./ResultDisplay";
import { UploadCloud, Loader2, Image as ImageIcon } from "lucide-react";

export default function UploadBox() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (!file.type.includes('image')) {
      alert("Please upload an image file (JPG/PNG)");
      return;
    }
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null); // Reset result on new selection
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Make sure DB is initialized.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {!result ? (
        <>
          <div
            className={`w-full relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl transition-all duration-200 ${
              isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-300 hover:border-indigo-400 bg-slate-50/50"
            } cursor-pointer group`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleChange}
            />
            
            {preview ? (
              <div className="flex flex-col items-center">
                <img src={preview} alt="Preview" className="h-48 object-contain mb-4 rounded-lg shadow-sm" />
                <p className="text-sm font-medium text-slate-700">{file?.name}</p>
                <p className="text-xs text-slate-500 mt-1">Click or drag to change image</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500 group-hover:text-indigo-500 transition-colors">
                <UploadCloud className="w-16 h-16 mb-4 stroke-[1.5]" />
                <h3 className="text-lg font-semibold text-slate-700 mb-1">Upload Sports Image</h3>
                <p className="text-sm">Drag and drop, or click to browse</p>
                <p className="text-xs text-slate-400 mt-2">Supports JPG, PNG</p>
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white transition-all shadow-md ${
              !file || uploading
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            } flex justify-center items-center gap-2`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Verify Asset Authenticity"
            )}
          </button>
        </>
      ) : (
        <ResultDisplay result={result} previewUrl={preview} onReset={() => {
          setFile(null);
          setPreview(null);
          setResult(null);
        }} />
      )}
    </div>
  );
}
