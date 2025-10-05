import { Header } from "@/components/Header";
import { HL7Parser } from "@/components/HL7Parser";
import { SegmentExplorer } from "@/components/SegmentExplorer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSearch, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="parser" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="parser" className="flex items-center gap-2">
              <FileSearch className="h-4 w-4" />
              Parser
            </TabsTrigger>
            <TabsTrigger value="explorer" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Explorador
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parser" className="space-y-6">
            <HL7Parser />
          </TabsContent>

          <TabsContent value="explorer" className="space-y-6">
            <SegmentExplorer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
