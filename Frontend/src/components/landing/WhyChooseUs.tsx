import { Briefcase, UserCheck, CheckCircle } from 'lucide-react';

export const WhyChooseUs = () => (
  <section id="services" className="py-16 bg-white">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-blue-600">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Box 1 */}
        <div className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
           <img src="./home-1.svg" alt="" />
          </div>
          <h3 className="text-xl text-primary font-semibold mb-2">Potential ROI</h3>
          <p className="text-gray-600">Our team brings years of industry experience to deliver top-notch solutions for your business.</p>
        </div>
        {/* Box 2 */}
        <div className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
            <img src="./paintbrush-2.svg" alt="" />
          </div>
          <h3 className="text-xl text-primary font-semibold mb-2">Design</h3>
          <p className="text-gray-600">We tailor our services to meet your unique needs, ensuring the best results for your goals.</p>
        </div>
        {/* Box 3 */}
        <div className="bg-blue-50 rounded-xl p-8 shadow hover:shadow-lg transition">
          <div className="flex justify-center mb-4">
           <img src="./dollar.svg" alt="" />
          </div>
          <h3 className="text-xl text-primary font-semibold mb-2">Marketing</h3>
          <p className="text-gray-600">Our track record speaks for itself—see measurable improvements and satisfied clients.</p>
        </div>
      </div>
    </div>
  </section>
); 