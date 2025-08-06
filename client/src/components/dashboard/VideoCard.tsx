import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Download, 
  Share, 
  Copy, 
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Info
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  status: 'processing' | 'ready' | 'published' | 'error';
  createdAt: Date;
  publishedTo?: string[];
  originalUrl?: string;
}

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  onDownload: (video: Video) => void;
  onPublish: (video: Video) => void;
  onDuplicate: (video: Video) => void;
  onDetails: (video: Video) => void;
}

const StatusIcon = ({ status }: { status: Video['status'] }) => {
  switch (status) {
    case 'processing':
      return <Loader2 className="w-4 h-4 animate-spin text-processing" />;
    case 'ready':
      return <Clock className="w-4 h-4 text-warning" />;
    case 'published':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-destructive" />;
  }
};

const getStatusBadge = (status: Video['status']) => {
  const statusConfig = {
    processing: { label: 'Processando', variant: 'secondary' as const },
    ready: { label: 'Pronto', variant: 'outline' as const },
    published: { label: 'Publicado', variant: 'default' as const },
    error: { label: 'Erro', variant: 'destructive' as const }
  };
  
  return statusConfig[status];
};

export const VideoCard = ({ video, onPlay, onDownload, onPublish, onDuplicate, onDetails }: VideoCardProps) => {
  const statusConfig = getStatusBadge(video.status);
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
              <Play className="w-12 h-12 text-primary/60" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onPlay(video)}
              className="bg-white/90 text-black hover:bg-white"
            >
              <Play className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>
          
          <div className="absolute top-2 right-2 flex items-center space-x-1">
            <Badge variant={statusConfig.variant} className="text-xs">
              <StatusIcon status={video.status} />
              <span className="ml-1">{statusConfig.label}</span>
            </Badge>
          </div>
          
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
            </Badge>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h3>
            <p className="text-xs text-muted-foreground">
              {video.createdAt.toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          {video.publishedTo && video.publishedTo.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {video.publishedTo.map((platform) => (
                <Badge key={platform} variant="outline" className="text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {video.status === 'ready' && (
                <Button size="sm" variant="outline" onClick={() => onPublish(video)}>
                  <Share className="w-3 h-3 mr-1" />
                  Publicar
                </Button>
              )}
              
              {(video.status === 'ready' || video.status === 'published') && (
                <Button size="sm" variant="ghost" onClick={() => onDownload(video)}>
                  <Download className="w-3 h-3" />
                </Button>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onPlay(video)}>
                  <Play className="mr-2 h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(video)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicar
                </DropdownMenuItem>
                {(video.status === 'ready' || video.status === 'published') && (
                  <DropdownMenuItem onClick={() => onDownload(video)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => onDetails(video)}>
                  <Info className="mr-2 h-4 w-4" />
                  Detalhes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};