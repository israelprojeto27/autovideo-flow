import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Youtube, Link, Sparkles } from "lucide-react";

interface NewVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (url: string) => void;
}

export const NewVideoModal = ({ open, onOpenChange, onSubmit }: NewVideoModalProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL obrigatória",
        description: "Por favor, insira um link do YouTube",
        variant: "destructive"
      });
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      toast({
        title: "URL inválida",
        description: "Por favor, insira um link válido do YouTube",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(url);
      setUrl("");
      setIsLoading(false);
      onOpenChange(false);
      
      toast({
        title: "Vídeo adicionado!",
        description: "Seu vídeo foi adicionado à fila de processamento",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>Nova Geração de Vídeo</span>
          </DialogTitle>
          <DialogDescription>
            Cole o link de um vídeo do YouTube para começar a geração automática de clips
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">Link do YouTube</Label>
            <div className="relative">
              <Youtube className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="youtube-url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg space-y-2">
            <h4 className="font-medium text-sm flex items-center">
              <Link className="w-4 h-4 mr-2" />
              Como funciona?
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Download automático do vídeo</li>
              <li>• Transcrição com IA (Whisper)</li>
              <li>• Identificação dos melhores momentos</li>
              <li>• Geração de clips com legendas</li>
              <li>• Publicação automática (opcional)</li>
            </ul>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !url.trim()}>
              {isLoading ? "Processando..." : "Gerar Clips"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};