import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Download,
  ExternalLink,
  Play,
  Share2,
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Video } from "@/components/dashboard/VideoCard";

// Mock data for demonstration - in real app this would come from API/storage
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

const StatusIcon = ({ status }: { status: Video['status'] }) => {
  switch (status) {
    case 'processing':
      return <Loader2 className="w-5 h-5 animate-spin text-orange-500" />;
    case 'ready':
      return <Clock className="w-5 h-5 text-blue-500" />;
    case 'published':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
  }
};

const getStatusInfo = (status: Video['status']) => {
  const statusMap = {
    processing: { label: 'Processando', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' },
    ready: { label: 'Pronto para publicar', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
    published: { label: 'Publicado', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
    error: { label: 'Erro no processamento', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' }
  };
  
  return statusMap[status];
};

const VideoDetails = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from API
    const foundVideo = mockVideos.find(v => v.id === id);
    setVideo(foundVideo || null);
  }, [id]);

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Vídeo não encontrado</h2>
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(video.status);
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mock publish dates for demonstration
  const publishDates = video.publishedTo?.map(platform => ({
    platform,
    date: new Date(2024, 7, 5) // Mock date
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <StatusIcon status={video.status} />
            <h1 className="text-3xl font-bold">{video.title}</h1>
          </div>
          
          <Badge className={statusInfo.color}>
            {statusInfo.label}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Preview do Vídeo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                      <Play className="w-16 h-16 text-primary/60" />
                    </div>
                  )}
                  
                  <Button 
                    size="lg"
                    className="absolute inset-0 m-auto w-fit h-fit bg-black/80 hover:bg-black/90 text-white"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Reproduzir Preview
                  </Button>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {video.status === 'ready' && (
                    <Button className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Publicar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duração:</span>
                  <span className="font-medium">{formatDuration(video.duration)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className={statusInfo.color}>
                    {statusInfo.label}
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Criado em:</span>
                  <span className="font-medium">
                    {video.createdAt.toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {video.status === 'error' && video.errorDescription && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <span className="text-muted-foreground block">Motivo do Erro:</span>
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-700 dark:text-red-300">
                            {video.errorDescription}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {video.originalUrl && (
                  <>
                    <Separator />
                    <div>
                      <span className="text-muted-foreground block mb-2">Vídeo Original:</span>
                      <Button variant="outline" size="sm" asChild>
                        <a href={video.originalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Ver no YouTube
                        </a>
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Publication History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Histórico de Publicação
                </CardTitle>
              </CardHeader>
              <CardContent>
                {video.publishedTo && video.publishedTo.length > 0 ? (
                  <div className="space-y-3">
                    {publishDates?.map((pub) => (
                      <div key={pub.platform} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <div className="font-medium">{pub.platform}</div>
                            <div className="text-sm text-muted-foreground">
                              {pub.date.toLocaleDateString('pt-BR')} às {pub.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                        <Badge variant="default">Publicado</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Share2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Este vídeo ainda não foi publicado em nenhuma rede social.</p>
                    {video.status === 'ready' && (
                      <Button className="mt-4">
                        <Share2 className="w-4 h-4 mr-2" />
                        Publicar Agora
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline de Processamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Vídeo Recebido</div>
                      <div className="text-sm text-muted-foreground">
                        {video.createdAt.toLocaleDateString('pt-BR')} às {video.createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  
                  {video.status !== 'processing' && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">Processamento Concluído</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(video.createdAt.getTime() + 3000).toLocaleDateString('pt-BR')} às {new Date(video.createdAt.getTime() + 3000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {video.status === 'processing' && (
                    <div className="flex items-start gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-orange-500 mt-1" />
                      <div>
                        <div className="font-medium">Processando...</div>
                        <div className="text-sm text-muted-foreground">
                          Gerando clipes automatizados
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;