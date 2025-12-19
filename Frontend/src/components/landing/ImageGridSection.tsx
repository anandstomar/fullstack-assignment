export const ImageGridSection = () => (
  <section className="w-full py-20 bg-white relative overflow-hidden flex flex-col items-center justify-center">
    {/* Decorative background circles */}
    <div className="absolute left-0 top-1/4 w-48 h-48 bg-blue-100 rounded-full opacity-30 -z-10" />
    <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-50 rounded-full opacity-20 -z-10" />
    <div className="absolute right-1/3 top-0 w-8 h-8 bg-blue-100 rounded-full opacity-30 -z-10" />
    <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-blue-200 rounded-full opacity-20 -z-10" />
    <div className="absolute right-10 top-1/2 w-2 h-2 bg-orange-500 rounded-full opacity-80 -z-10" />
    <div className="absolute left-1/3 bottom-10 w-2 h-2 bg-blue-600 rounded-full opacity-80 -z-10" />

    <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl">
      {/* Left image */}
      <div className="relative">
        <img src="/pic 1.svg" alt="Process 1" className="w-48 h-40 object-cover rounded-lg shadow-lg" />
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-600 rounded" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-4 border-orange-500 rounded" />
      </div>
      {/* Center image */}
      <div className="relative">
        <img src="/pic 2.svg" alt="Process 2" className="w-56 h-48 object-cover rounded-lg shadow-xl" />
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-200 rounded" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-4 border-blue-600 rounded" />
      </div>
      {/* Right image */}
      <div className="relative">
        <img src="/pic 3.svg" alt="Process 3" className="w-48 h-40 object-cover rounded-lg shadow-lg" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-4 border-orange-500 rounded" />
      </div>
    </div>
  </section>
); 