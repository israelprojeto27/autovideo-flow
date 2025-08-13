import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { DashboardHeader } from "./DashboardHeader";
import { StatsCards } from "./StatsCards";
import { VideoCard, Video } from "./VideoCard";
import { NewVideoModal } from "./NewVideoModal";
import { SocialConnections } from "./SocialConnections";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search, Video as VideoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

// Mock data
const mockVideos: Video[] = [
  {
    id: "1",
    title: "Como programar em Python - Tutorial completo",
    thumbnail: "/lovable-uploads/6e858bd9-bb2a-4d14-9f9a-cd8c3d4c2fd5.png",
    duration: 45,
    status: "published",
    createdAt: new Date(2024, 7, 1),
    publishedTo: ["TikTok", "Instagram"],
    originalUrl: "https://youtube.com/watch?v=example1"
  },
  {
    id: "2", 
    title: "React Hooks explicados em 5 minutos",
    thumbnail: "",
    duration: 30,
    status: "ready",
    createdAt: new Date(2024, 7, 2),
    originalUrl: "https://youtube.com/watch?v=example2"
  },
  {
    id: "3",
    title: "JavaScript moderno - ES6+ features",
    thumbnail: "",
    duration: 60,
    status: "processing",
    createdAt: new Date(2024, 7, 3),
    originalUrl: "https://youtube.com/watch?v=example3"
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox - Qual usar?",
    thumbnail: "",
    duration: 38,
    status: "error",
    createdAt: new Date(2024, 7, 4),
    originalUrl: "https://youtube.com/watch?v=example4",
    errorDescription: "Falha na extração de áudio - formato de vídeo não suportado ou vídeo muito longo"
  },
  {
    id: "5",
    title: "Tutorial de Node.js para iniciantes",
    thumbnail: "",
    duration: 0,
    status: "error",
    createdAt: new Date(2024, 7, 5),
    originalUrl: "https://youtube.com/watch?v=example5",
    errorDescription: "Vídeo não encontrado ou removido - URL inválida ou vídeo privado"
  }
];

const mockSocialPlatforms = [
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    connected: true,
    username: "meucanal"
  },
  {
    id: "instagram",
    name: "Instagram Reels",
    icon: "📷",
    connected: false
  },
  {
    id: "youtube",
    name: "YouTube Shorts",
    icon: "📺",
    connected: false
  }
];

export const Dashboard = ({ userEmail, onLogout }: DashboardProps) => {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [socialPlatforms, setSocialPlatforms] = useState(mockSocialPlatforms);
  const [showNewVideoModal, setShowNewVideoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || video.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [videos, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return {
      totalVideos: videos.length,
      readyVideos: videos.filter(v => v.status === "ready").length,
      processingVideos: videos.filter(v => v.status === "processing").length,
      publishedVideos: videos.filter(v => v.status === "published").length
    };
  }, [videos]);

  const handleNewVideo = (url: string) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title: "Novo vídeo em processamento...",
      thumbnail: "",
      duration: 0,
      status: "processing",
      createdAt: new Date(),
      originalUrl: url
    };
    
    setVideos(prev => [newVideo, ...prev]);
    
    // Simulate processing
    setTimeout(() => {
      setVideos(prev => prev.map(v => 
        v.id === newVideo.id 
          ? { ...v, title: "Vídeo processado com sucesso", duration: 42, status: "ready" as const }
          : v
      ));
    }, 3000);
  };

  const handleVideoPlay = (video: Video) => {
    toast({
      title: "Reproduzindo vídeo",
      description: `Abrindo preview de: ${video.title}`
    });
  };

  const handleVideoDownload = (video: Video) => {
    toast({
      title: "Download iniciado",
      description: `Baixando: ${video.title}`
    });
  };

  const handleVideoPublish = (video: Video) => {
    const connectedPlatforms = socialPlatforms.filter(p => p.connected);
    
    if (connectedPlatforms.length === 0) {
      toast({
        title: "Nenhuma rede conectada",
        description: "Conecte pelo menos uma rede social para publicar",
        variant: "destructive"
      });
      return;
    }

    setVideos(prev => prev.map(v =>
      v.id === video.id
        ? { ...v, status: "published" as const, publishedTo: connectedPlatforms.map(p => p.name) }
        : v
    ));

    toast({
      title: "Vídeo publicado!",
      description: `Publicado em: ${connectedPlatforms.map(p => p.name).join(", ")}`
    });
  };

  const handleVideoDuplicate = (video: Video) => {
    const duplicatedVideo: Video = {
      ...video,
      id: Date.now().toString(),
      title: `${video.title} (Cópia)`,
      status: "ready",
      createdAt: new Date(),
      publishedTo: undefined
    };
    
    setVideos(prev => [duplicatedVideo, ...prev]);
    
    toast({
      title: "Vídeo duplicado",
      description: "Uma cópia foi criada com sucesso"
    });
  };

  const handleVideoDetails = (video: Video) => {
    // Navigate to video details page using wouter
    setLocation(`/video/${video.id}`);
  };

  const handleSocialConnect = (platformId: string) => {
    setSocialPlatforms(prev => prev.map(p =>
      p.id === platformId
        ? { ...p, connected: true, username: "meucanal" }
        : p
    ));

    toast({
      title: "Rede social conectada",
      description: "Agora você pode publicar automaticamente!"
    });
  };

  const handleSocialDisconnect = (platformId: string) => {
    setSocialPlatforms(prev => prev.map(p =>
      p.id === platformId
        ? { ...p, connected: false, username: undefined }
        : p
    ));

    toast({
      title: "Rede social desconectada",
      description: "A conexão foi removida"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        userEmail={userEmail}
        onNewVideo={() => setShowNewVideoModal(true)}
        onNewAIVideo={() => setLocation("/ai-video-generator")}
        onLogout={onLogout}
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards {...stats} />
        
        <Tabs defaultValue="videos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="videos">Meus Vídeos</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar vídeos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="ready">Prontos</SelectItem>
                  <SelectItem value="published">Publicados</SelectItem>
                  <SelectItem value="error">Com erro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <VideoIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Nenhum vídeo encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Tente ajustar os filtros de busca"
                    : "Comece criando seu primeiro vídeo automatizado"
                  }
                </p>
                <Button onClick={() => setShowNewVideoModal(true)}>
                  Criar Primeiro Vídeo
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={handleVideoPlay}
                    onDownload={handleVideoDownload}
                    onPublish={handleVideoPublish}
                    onDuplicate={handleVideoDuplicate}
                    onDetails={handleVideoDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="social">
            <SocialConnections
              platforms={socialPlatforms}
              onConnect={handleSocialConnect}
              onDisconnect={handleSocialDisconnect}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <NewVideoModal
        open={showNewVideoModal}
        onOpenChange={setShowNewVideoModal}
        onSubmit={handleNewVideo}
      />
    </div>
  );
};