import { CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function ImageCard({ image }: { image: any }) {
  const isOriginal = image.status === "original";
  const date = new Date(image.createdAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {/* We use standard img instead of next/image for simpler MVP with local uploads */}
        <img
          src={`/uploads/${image.filename}`}
          alt="Asset"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          {isOriginal ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-800 shadow-sm backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Original
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100/90 text-rose-800 shadow-sm backdrop-blur-sm">
              <AlertTriangle className="w-3.5 h-3.5" />
              Duplicate
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-slate-800 truncate" title={image.filename}>
          {image.filename.split('-').slice(1).join('-') || image.filename}
        </h3>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-4 h-4" />
            <span>{date}</span>
          </div>
          
          <div className="font-medium">
            {image.similarity !== null ? (
              <span className="text-slate-700">
                Match: <span className={image.similarity > 90 ? "text-rose-600" : "text-emerald-600"}>{image.similarity.toFixed(1)}%</span>
              </span>
            ) : (
              <span className="text-slate-400">Unique</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
