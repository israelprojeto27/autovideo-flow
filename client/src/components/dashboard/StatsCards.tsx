import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, TrendingUp, Clock, Share } from "lucide-react";

interface StatsCardsProps {
  totalVideos: number;
  readyVideos: number;
  processingVideos: number;
  publishedVideos: number;
}

export const StatsCards = ({ totalVideos, readyVideos, processingVideos, publishedVideos }: StatsCardsProps) => {
  const stats = [
    {
      title: "Total de Vídeos",
      value: totalVideos,
      icon: Video,
      description: "Vídeos gerados"
    },
    {
      title: "Prontos",
      value: readyVideos,
      icon: TrendingUp,
      description: "Para publicação"
    },
    {
      title: "Processando",
      value: processingVideos,
      icon: Clock,
      description: "Em andamento"
    },
    {
      title: "Publicados",
      value: publishedVideos,
      icon: Share,
      description: "Nas redes sociais"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};