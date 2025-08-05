import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus, Settings } from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  username?: string;
}

interface SocialConnectionsProps {
  platforms: SocialPlatform[];
  onConnect: (platformId: string) => void;
  onDisconnect: (platformId: string) => void;
}

export const SocialConnections = ({ platforms, onConnect, onDisconnect }: SocialConnectionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Redes Sociais</span>
        </CardTitle>
        <CardDescription>
          Conecte suas redes sociais para publicação automática
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-lg">
                <span className="text-lg">{platform.icon}</span>
              </div>
              <div>
                <p className="font-medium">{platform.name}</p>
                {platform.connected && platform.username && (
                  <p className="text-sm text-muted-foreground">@{platform.username}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {platform.connected ? (
                <>
                  <Badge variant="default" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Conectado
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDisconnect(platform.id)}
                  >
                    Desconectar
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConnect(platform.id)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Conectar
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};