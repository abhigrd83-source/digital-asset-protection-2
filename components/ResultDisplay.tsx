"use client";

import { CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";

interface ResultDisplayProps {
  result: {
    status: "original" | "duplicate";
    similarity: number | null;
    filename: string;
  };
  previewUrl: string | null;
  onReset: () => void;
}

export default function ResultDisplay({ result, previewUrl, onReset }: ResultDisplayProps) {
  const isOriginal = result.status === "original";

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full relative rounded-xl overflow-hidden bg-slate-100 mb-6 border border-slate-200">
        {previewUrl && (
          <img 
            src={previewUrl} 
            alt="Uploaded asset" 
            className="w-full h-64 object-contain" 
          />
        )}
        
        {/* Status Overlay */}
        <div className="absolute top-4 right-4">
          {isOriginal ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 shadow-sm border border-emerald-200 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4" />
              Original Asset
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-rose-100 text-rose-800 shadow-sm border border-rose-200 backdrop-blur-sm">
              <AlertTriangle className="w-4 h-4" />
              Duplicate Detected
            </span>
          )}
        </div>
      </div>

      <div className="w-full bg-white border border-slate-200 rounded-xl p-6 text-left shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Verification Results</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-sm text-slate-500 font-medium mb-1">Status</p>
            <p className={`text-lg font-semibold ${isOriginal ? "text-emerald-600" : "text-rose-600"}`}>
              {isOriginal ? "Verified Original" : "Unauthorized Copy"}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-sm text-slate-500 font-medium mb-1">Similarity Match</p>
            <p className="text-lg font-semibold text-slate-800">
              {result.similarity ? `${result.similarity.toFixed(2)}%` : "N/A"}
            </p>
          </div>
        </div>

        {!isOriginal && (
          <div className="p-4 bg-orange-50 text-orange-800 rounded-lg border border-orange-100 text-sm mb-6 flex gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              This image strongly matches an existing asset in our database. It has been flagged as a potential duplicate.
            </p>
          </div>
        )}

        <button
          onClick={onReset}
          className="w-full py-2.5 rounded-lg font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex justify-center items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Verify Another Image
        </button>
      </div>
    </div>
  );
}
