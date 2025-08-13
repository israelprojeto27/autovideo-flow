import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Plus, Sparkles, Clock, Calendar, Tag, FileText, MoreHorizontal, Play, Download, Copy, Info } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface AIVideo {
  id: string;
  title: string;
  theme: string;
  thumbnail: string;
  duration: number;
  createdAt: Date;
  tags: string[];
  script: string;
}

const AIVideoGenerator = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [theme, setTheme] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<string[]>([]);
  const [newSchedule, setNewSchedule] = useState("");
  const [selectedScript, setSelectedScript] = useState<string>("");
  const [showScriptModal, setShowScriptModal] = useState(false);

  // Load saved configuration on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('ai_video_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setTheme(config.theme || "");
      setTags(config.tags || []);
      setSelectedDays(config.selectedDays || []);
      setSchedules(config.schedules || []);
    }
  }, []);

  // Mock data for AI generated videos
  const [aiVideos] = useState<AIVideo[]>([
    {
      id: "ai-1",
      title: "Como a IA está revolucionando o futuro do trabalho",
      theme: "Tecnologia",
      thumbnail: "/lovable-uploads/6e858bd9-bb2a-4d14-9f9a-cd8c3d4c2fd5.png",
      duration: 32,
      createdAt: new Date(2024, 7, 10),
      tags: ["IA", "Futuro", "Trabalho"],
      script: "Hoje vamos falar sobre como a inteligência artificial está transformando o mercado de trabalho. A IA não está aqui para substituir humanos, mas sim para potencializar nossas capacidades. Vamos explorar as principais mudanças que estão acontecendo e como você pode se preparar para esse futuro que já chegou."
    },
    {
      id: "ai-2", 
      title: "5 Dicas essenciais para produtividade pessoal",
      theme: "Produtividade",
      thumbnail: "",
      duration: 28,
      createdAt: new Date(2024, 7, 9),
      tags: ["Produtividade", "Dicas", "Organização"],
      script: "Neste vídeo, vou compartilhar 5 dicas essenciais que transformaram minha produtividade pessoal. Primeira dica: estabeleça prioridades claras todos os dias. Segunda dica: use a técnica Pomodoro para manter o foco. Terceira dica: elimine distrações do seu ambiente de trabalho..."
    },
    {
      id: "ai-3",
      title: "Tendências de design para 2024",
      theme: "Design",
      thumbnail: "",
      duration: 45,
      createdAt: new Date(2024, 7, 8),
      tags: ["Design", "Tendências", "2024", "UX"],
      script: "O design está em constante evolução, e 2024 trouxe tendências incríveis que estão moldando a experiência digital. Vamos explorar minimalismo inteligente, cores vibrantes, tipografias expressivas e como essas tendências impactam a experiência do usuário..."
    }
  ]);

  const weekDays = [
    "Segunda-feira",
    "Terça-feira", 
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
    "Todos os dias"
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addSchedule = () => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (timeRegex.test(newSchedule) && !schedules.includes(newSchedule)) {
      setSchedules([...schedules, newSchedule]);
      setNewSchedule("");
    } else {
      toast({
        title: "Horário inválido",
        description: "Use o formato HH:MM (exemplo: 14:30)",
        variant: "destructive"
      });
    }
  };

  const removeSchedule = (scheduleToRemove: string) => {
    setSchedules(schedules.filter(schedule => schedule !== scheduleToRemove));
  };

  const handleDayChange = (day: string) => {
    if (day === "Todos os dias") {
      setSelectedDays(selectedDays.includes(day) ? [] : ["Todos os dias"]);
    } else {
      if (selectedDays.includes("Todos os dias")) {
        setSelectedDays([day]);
      } else {
        setSelectedDays(
          selectedDays.includes(day)
            ? selectedDays.filter(d => d !== day)
            : [...selectedDays, day]
        );
      }
    }
  };

  const handleSave = () => {
    if (!theme.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "O tema é obrigatório",
        variant: "destructive"
      });
      return;
    }

    // Save configuration to localStorage
    const config = {
      theme,
      tags,
      selectedDays,
      schedules
    };
    localStorage.setItem('ai_video_config', JSON.stringify(config));

    toast({
      title: "Configuração salva!",
      description: "A geração de vídeos IA foi configurada com sucesso"
    });

    // Stay on the same page instead of navigating back
  };

  const handleShowScript = (script: string) => {
    setSelectedScript(script);
    setShowScriptModal(true);
  };

  const handleVideoAction = (action: string, video: AIVideo) => {
    switch (action) {
      case "play":
        toast({
          title: "Reproduzindo vídeo",
          description: `Abrindo preview de: ${video.title}`
        });
        break;
      case "download":
        toast({
          title: "Download iniciado",
          description: `Baixando: ${video.title}`
        });
        break;
      case "duplicate":
        toast({
          title: "Vídeo duplicado",
          description: "Uma cópia foi criada com sucesso"
        });
        break;
      case "details":
        // Navigate to video details page - for now just show toast
        toast({
          title: "Detalhes do vídeo",
          description: `Abrindo detalhes de: ${video.title}`
        });
        break;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (value: string) => {
    // Remove any non-digit characters
    const numbers = value.replace(/\D/g, '');
    
    // Format as HH:MM
    if (numbers.length >= 3) {
      return numbers.slice(0, 2) + ':' + numbers.slice(2, 4);
    } else if (numbers.length >= 1) {
      return numbers;
    }
    return '';
  };

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
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Gerar Videos IA</h1>
          </div>
          
          <p className="text-muted-foreground">
            Configure a geração automática de vídeos com inteligência artificial
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Configuração de Geração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tema */}
            <div className="space-y-2">
              <Label htmlFor="theme" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tema
              </Label>
              <Input
                id="theme"
                placeholder="Ex: Tecnologia, Culinária, Fitness..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addTag}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Dias da Semana */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Dia Publicação
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDays.includes(day)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleDayChange(day)}
                  >
                    <span className="text-sm font-medium">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Horários */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horário Publicação
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="HH:MM (ex: 14:30)"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(formatTime(e.target.value))}
                  onKeyPress={(e) => e.key === 'Enter' && addSchedule()}
                  maxLength={5}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addSchedule}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {schedules.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {schedules.map((schedule) => (
                    <Badge key={schedule} variant="secondary" className="cursor-pointer" onClick={() => removeSchedule(schedule)}>
                      {schedule} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Salvar */}
            <div className="pt-4">
              <Button onClick={handleSave} className="w-full">
                Salvar Configuração
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        {aiVideos.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Vídeos Gerados por IA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative overflow-hidden">
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
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {formatDuration(video.duration)}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{video.title}</h3>
                    
                    <div className="space-y-2 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        <span className="font-medium">Tema:</span>
                        <span>{video.theme}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span className="font-medium">Criado:</span>
                        <span>{video.createdAt.toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {video.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShowScript(video.script)}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Script
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVideoAction("play", video)}>
                            <Play className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleVideoAction("download", video)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleVideoAction("duplicate", video)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleVideoAction("details", video)}>
                            <Info className="w-4 h-4 mr-2" />
                            Detalhes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Script Modal */}
      <Dialog open={showScriptModal} onOpenChange={setShowScriptModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Script do Vídeo
            </DialogTitle>
            <DialogDescription>
              Texto gerado pela inteligência artificial para este vídeo
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {selectedScript}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIVideoGenerator;