import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export const HappyClients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data);
      } catch (error: any) {
        toast({ title: "Error", description: error.response?.data?.error || "Failed to load clients", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [toast]);

  if (loading) {
    return <div className="text-center py-10">Loading clients...</div>;
  }

  return (
    <section id="testimonials" className="w-full py-20 bg-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute left-0 top-0 w-32 h-32 bg-blue-100 rounded-full opacity-30 -z-10" />
      <div className="absolute right-0 top-10 w-24 h-24 bg-blue-50 rounded-full opacity-20 -z-10" />
      <div className="absolute left-1/3 top-0 w-4 h-4 bg-orange-500 rounded-full opacity-80 -z-10" />
      <div className="absolute left-1/4 bottom-0 w-4 h-4 bg-blue-600 rounded-full opacity-80 -z-10" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Happy Clients</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {clients.map((client, idx) => (
            <div key={client._id || idx} className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-full max-w-xs">
              <img src={client.image} alt={client.name} className="w-14 h-14 object-cover rounded-full mb-4" />
              <p className="text-gray-600 text-sm mb-4 text-center">{client.description || client.testimonial}</p>
              <div className="text-blue-700 font-bold text-base text-center">{client.name}</div>
              <div className="text-gray-400 text-xs text-center">{client.designation || client.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 