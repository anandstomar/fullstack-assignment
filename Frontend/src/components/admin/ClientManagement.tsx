import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface Client {
  _id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
  createdAt: string;
}

export const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image: null as File | null
  });
  const { toast } = useToast();

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error: any) {
      console.error('Failed to fetch clients:', error);
      toast({
        title: "Error",
        description: "Failed to load clients",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.designation || !formData.description || !formData.image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);

      await api.post('/clients', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({ name: "", designation: "", description: "", image: null });
      setIsDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Client added successfully!"
      });

      // Refresh clients list
      fetchClients();
    } catch (error: any) {
      console.error('Failed to create client:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create client",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter(c => c._id !== id));
      toast({
        title: "Success",
        description: "Client deleted successfully!"
      });
    } catch (error: any) {
      console.error('Failed to delete client:', error);
      toast({
        title: "Error",
        description: "Failed to delete client",
        variant: "destructive"
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Clients</h3>
          <Button disabled>Add Client</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-4/5"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Clients ({clients.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Add a new client testimonial to showcase in your portfolio
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  placeholder="e.g., CEO, Web Developer"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Testimonial</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter client testimonial"
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Client Photo</Label>
                <div className="mt-1">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Image will be automatically cropped to 150x150
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding...
                    </div>
                  ) : (
                    "Add Client"
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No clients yet. Add your first client testimonial!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Card key={client._id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-3">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 ring-4 ring-primary/20">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg">{client.name}</CardTitle>
                <CardDescription className="text-sm font-medium text-primary">
                  {client.designation}
                </CardDescription>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  "{client.description}"
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(client._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};