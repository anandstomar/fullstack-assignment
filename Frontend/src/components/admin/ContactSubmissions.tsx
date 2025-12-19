import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone, MapPin, Calendar, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface ContactSubmission {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  createdAt: string;
}

export const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch submissions on component mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contact');
      setSubmissions(response.data);
    } catch (error: any) {
      console.error('Failed to fetch contact submissions:', error);
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Mobile', 'City', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredSubmissions.map(submission => [
        submission.fullName,
        submission.email,
        submission.mobile,
        submission.city,
        new Date(submission.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Contact submissions exported to CSV"
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Contact Submissions</h3>
          <Button disabled>Export CSV</Button>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
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
        <div>
          <h3 className="text-xl font-semibold">Contact Submissions</h3>
          <p className="text-sm text-muted-foreground">
            {submissions.length} total submissions
          </p>
        </div>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-semibold mb-2">No Contact Submissions</h4>
          <p className="text-muted-foreground">
            Contact form submissions will appear here once visitors start using your contact form.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Submissions</p>
                    <p className="text-2xl font-bold">{submissions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">
                      {submissions.filter(s => {
                        const date = new Date(s.createdAt);
                        const now = new Date();
                        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                      }).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Unique Cities</p>
                    <p className="text-2xl font-bold">
                      {new Set(submissions.map(s => s.city)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Today</p>
                    <p className="text-2xl font-bold">
                      {submissions.filter(s => {
                        const date = new Date(s.createdAt);
                        const today = new Date();
                        return date.toDateString() === today.toDateString();
                      }).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>
                Latest contact form submissions from your website visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell className="font-medium">
                        {submission.fullName}
                      </TableCell>
                      <TableCell>
                        <a 
                          href={`mailto:${submission.email}`}
                          className="text-primary hover:underline"
                        >
                          {submission.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a 
                          href={`tel:${submission.mobile}`}
                          className="text-primary hover:underline"
                        >
                          {submission.mobile}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {submission.city}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};