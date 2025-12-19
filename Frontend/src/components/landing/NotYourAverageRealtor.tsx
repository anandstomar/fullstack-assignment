export const NotYourAverageRealtor = () => (
  <section className="w-full py-20 bg-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
    {/* Decorative circles */}
    <div className="absolute top-10 left-10 w-12 h-12 bg-blue-100 rounded-full opacity-40" />
    <div className="absolute bottom-10 left-0 w-32 h-32 bg-blue-50 rounded-full opacity-30" />
    <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-blue-600 rounded-full" />
    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-orange-500 rounded-full" />

    {/* Left: Text */}
    <div className="flex-1 max-w-lg ml-20 z-10 ">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Not Your Average Realtor</h2>
      <p className="text-gray-600 text-base md:text-lg">
        Real Trust is an agency for selling a property, advanced asset selling design, and effective e-marketing to get the maximum value for clients and their homes.
      </p>
    </div>

    {/* Right: Images */}
    <div className="flex-1 flex items-center justify-center relative z-10">
      <div className="relative w-[400px] h-[350px] flex items-center justify-center">
        {/* Large center image */}
        <img
          src="./taiwala.svg"
          alt="Realtor"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-4 border-blue-100 object-cover shadow-lg"
        />
        {/* Top right small image */}
        <img
          src="./Ellipse 12.svg"
          alt="Clients"
          className="absolute right-0 top-0 w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
        />
        {/* Bottom right small image */}
        <img
          src="Ellipse 13.svg"
          alt="Happy Client"
          className="absolute right-2 bottom-0 w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>
    </div>
  </section>
); 