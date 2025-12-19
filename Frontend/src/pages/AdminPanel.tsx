import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, MessageSquare, Mail, FolderOpen } from "lucide-react";
import { ProjectManagement } from "@/components/admin/ProjectManagement";
import { ClientManagement } from "@/components/admin/ClientManagement";
import { ContactSubmissions } from "@/components/admin/ContactSubmissions";
import { NewsletterSubscriptions } from "@/components/admin/NewsletterSubscriptions";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage your projects, clients, and view submissions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Newsletter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Project Management
                </CardTitle>
                <CardDescription>
                  Add new projects and manage existing ones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Client Management
                </CardTitle>
                <CardDescription>
                  Add new clients and manage testimonials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClientManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Submissions
                </CardTitle>
                <CardDescription>
                  View all contact form submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactSubmissions />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Newsletter Subscriptions
                </CardTitle>
                <CardDescription>
                  View all newsletter subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsletterSubscriptions />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;