import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface NicheSelectionProps {
  onNicheSelected: (niche: string) => void;
}

const niches = [
  { id: "tecnologia", name: "Tecnologia", description: "Programação, gadgets, inteligência artificial" },
  { id: "games", name: "Games", description: "Reviews, gameplays, dicas e truques" },
  { id: "educacao", name: "Educação", description: "Tutoriais, cursos, conhecimento geral" },
  { id: "esportes", name: "Esportes", description: "Futebol, fitness, modalidades diversas" },
  { id: "entretenimento", name: "Entretenimento", description: "Comédia, música, cinema" },
  { id: "lifestyle", name: "Lifestyle", description: "Moda, viagem, bem-estar" },
  { id: "negocios", name: "Negócios", description: "Empreendedorismo, marketing, finanças" },
  { id: "culinaria", name: "Culinária", description: "Receitas, reviews de comida, técnicas" }
];

export const NicheSelection = ({ onNicheSelected }: NicheSelectionProps) => {
  const [selectedNiche, setSelectedNiche] = useState<string>("");

  const handleContinue = () => {
    if (selectedNiche) {
      onNicheSelected(selectedNiche);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Escolha seu nicho
          </CardTitle>
          <CardDescription className="text-lg">
            Selecione a categoria que melhor representa seu conteúdo. Isso nos ajuda a criar cortes mais precisos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {niches.map((niche) => (
              <Card
                key={niche.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedNiche === niche.id
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:bg-accent/50"
                }`}
                onClick={() => setSelectedNiche(niche.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{niche.name}</h3>
                    {selectedNiche === niche.id && (
                      <Badge variant="default">Selecionado</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{niche.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedNiche}
              size="lg"
              className="px-8"
            >
              Continuar para o Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};