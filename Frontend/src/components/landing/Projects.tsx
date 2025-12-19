import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
}

export const Projects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (error: any) {
        toast({ title: "Error", description: error.response?.data?.error || "Failed to load projects", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [toast]);

  if (loading) {
    return <div className="text-center py-10">Loading projects...</div>;
  }

  return (
    <section id="projects" className="py-20 bg-[#f6fafd]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Our Projects</h2>
          <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
            We know what buyers are looking for and suggest projects that will bring clients top dollar for the sale of their homes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {projects.map((project, idx) => (
            <div key={project._id || idx} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={project.image} alt={project.name} className="w-full  h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl text-primary font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};