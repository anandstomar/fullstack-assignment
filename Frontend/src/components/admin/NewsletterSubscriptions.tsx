import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Calendar, Download, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface NewsletterSubscription {
  _id: string;
  email: string;
  createdAt: string;
}

export const NewsletterSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch subscriptions on component mount
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/newsletter');
      setSubscriptions(response.data);
    } catch (error: any) {
      console.error('Failed to fetch newsletter subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load newsletter subscriptions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Email', 'Subscribed Date'];
    const csvContent = [
      headers.join(','),
      ...filteredSubscriptions.map(subscription => [
        subscription.email,
        new Date(subscription.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Newsletter subscriptions exported to CSV"
    });
  };

  const getGrowthRate = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const lastMonthCount = subscriptions.filter(s => {
      const date = new Date(s.createdAt);
      return date >= lastMonth && date < thisMonth;
    }).length;
    
    const thisMonthCount = subscriptions.filter(s => {
      const date = new Date(s.createdAt);
      return date >= thisMonth;
    }).length;
    
    if (lastMonthCount === 0) return thisMonthCount > 0 ? 100 : 0;
    return Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Newsletter Subscriptions</h3>
          <Button disabled>Export CSV</Button>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
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
          <h3 className="text-xl font-semibold">Newsletter Subscriptions</h3>
          <p className="text-sm text-muted-foreground">
            {subscriptions.length} total subscribers
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
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {subscriptions.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-semibold mb-2">No Newsletter Subscriptions</h4>
          <p className="text-muted-foreground">
            Newsletter subscriptions will appear here once visitors start subscribing to your newsletter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Subscribers</p>
                    <p className="text-2xl font-bold">{subscriptions.length}</p>
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
                      {subscriptions.filter(s => {
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
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                    <p className="text-2xl font-bold">
                      {getGrowthRate()}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Today</p>
                    <p className="text-2xl font-bold">
                      {subscriptions.filter(s => {
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

          {/* Subscriptions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Subscriptions</CardTitle>
              <CardDescription>
                Latest newsletter subscriptions from your website visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscribed Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription._id}>
                      <TableCell>
                        <a 
                          href={`mailto:${subscription.email}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {subscription.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {new Date(subscription.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">
                          Active
                        </Badge>
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