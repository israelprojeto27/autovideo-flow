import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Sparkles, Clock, Calendar, Tag } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const AIVideoGenerator = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [theme, setTheme] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<string[]>([]);
  const [newSchedule, setNewSchedule] = useState("");

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

    // Here you would normally save the data
    toast({
      title: "Configuração salva!",
      description: "A geração de vídeos IA foi configurada com sucesso"
    });

    // Go back to dashboard
    setLocation("/");
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
      </div>
    </div>
  );
};

export default AIVideoGenerator;