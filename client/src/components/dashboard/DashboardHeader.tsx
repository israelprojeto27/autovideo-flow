import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Video, Settings, LogOut, TrendingUp, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

interface DashboardHeaderProps {
  userEmail: string;
  onNewVideo: () => void;
  onLogout: () => void;
}

export const DashboardHeader = ({ userEmail, onNewVideo, onLogout }: DashboardHeaderProps) => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("darker");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    if (theme === "light") {
      return <Sun className="h-4 w-4" />;
    } else if (theme === "dark") {
      return <Moon className="h-4 w-4" />;
    } else {
      return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              AutoClip.AI
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            MVP
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button onClick={onNewVideo} className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
            <Video className="w-4 h-4 mr-2" />
            Nova Geração
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="h-9 w-9"
            title={`Alterar para ${theme === "light" ? "escuro" : theme === "dark" ? "muito escuro" : "claro"}`}
          >
            {getThemeIcon()}
            <span className="sr-only">Alternar tema</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Usuário</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};