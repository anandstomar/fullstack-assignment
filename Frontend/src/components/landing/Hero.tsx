import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const Hero = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.placeholder.includes("Name") ? "fullName" : e.target.placeholder.toLowerCase().includes("email") ? "email" : e.target.placeholder.toLowerCase().includes("mobile") ? "mobile" : "city"]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast({ title: "Success", description: "Your request has been submitted!" });
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.error || "Submission failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="mt-19 relative min-h-[100%] flex flex-col md:flex-row items-center justify-between px-4 py-12 md:py-24"
      style={{
        backgroundImage: "url('./home.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Left: Hero Text */}
      <div className="flex-1 max-w-xl z-10 text-left">
        <h1 className=" ml-20 pt-20 text-4xl md:text-5xl font-bold text-white mb-6">
          Consultation,<br />
          Design, <br />
          & Marketing
        </h1>
        
       
      </div>

      {/* Right: Blue Card with Form */}
      <div className="flex-1 flex flex-col items-center md:items-end mt-12 md:mt-0">
        <form className="bg-[#204080] border border-white rounded-2xl shadow-xl p-8 w-full max-w-xs md:max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Get a Free Consultation</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            value={form.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter Email Address"
            className="px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            value={form.mobile}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Area/City"
            className="px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            value={form.city}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Get Quick Quote"}
          </button>
        </form>
      </div>
    </section>
  );
};