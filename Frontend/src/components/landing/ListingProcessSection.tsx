import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const ListingProcessSection = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/newsletter", { email });
      toast({ title: "Success", description: "Subscribed successfully!" });
      setEmail("");
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.error || "Subscription failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full">
      {/* Background image with overlay and heading/button */}
      <div
        className="relative h-64 flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/Rectangle.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 max-w-2xl">
            Learn more about our listing process, as well as our additional staging and design work.
          </h2>
          <button className="bg-white text-black font-semibold px-8 py-2 rounded shadow hover:bg-gray-200 transition">LEARN MORE</button>
        </div>
      </div>

      {/* Blue bar with navigation and subscribe */}
      <div id="subscribe" className="bg-blue-700 py-4 flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <div className="flex flex-wrap gap-6 items-center text-white font-medium">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#subscribe" className="hover:underline">Subscribe Us</a>
        </div>
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="px-3 py-2 rounded text-black focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-[#232533] py-6 px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-white text-xs mb-2 md:mb-0">All Rights Reserved 2023</div>
        <div className="flex items-center gap-2">
          <img  width="150px" src="./logo.svg" alt="logo" />
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="text-white hover:text-blue-400"><i className="fab fa-twitter" /></a>
          <a href="#" className="text-white hover:text-blue-400"><i className="fab fa-facebook" /></a>
          <a href="#" className="text-white hover:text-blue-400"><i className="fab fa-youtube" /></a>
          <a href="#" className="text-white hover:text-blue-400"><i className="fab fa-linkedin" /></a>
        </div>
         
         <div className=" flex gap-3">
         <a href="/#Linkedin">
         <img src="./Linkedin.svg" alt="" className="bg-white border rounded-md p-1" />
         </a>
         <a href="/#instagram">
         <img src="./Group.svg" alt="" className="bg-white border rounded-md p-1" /></a>
          <a href="/#Facebook">
          <img src="./Frame.svg" alt="" className="bg-white border rounded-md p-1" />
          </a>
          <a href="/#Twitter">
          <img src="./Group-1.svg" alt="" className="bg-white border rounded-md p-1" />
          </a>
         </div>

      </footer>
    </section>
  );
}; 