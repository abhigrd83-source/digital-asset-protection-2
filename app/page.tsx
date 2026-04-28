import UploadBox from "@/components/UploadBox";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-center mt-8 sm:mt-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Protect Your Digital Sports Media
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Upload any sports image to instantly verify its authenticity and check for unauthorized duplicates using advanced perceptual hashing.
        </p>
      </div>
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <UploadBox />
      </div>
    </div>
  );
}
