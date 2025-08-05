import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { NicheSelection } from "@/components/auth/NicheSelection";
import { Dashboard } from "@/components/dashboard/Dashboard";

type AppState = 'login' | 'niche-selection' | 'dashboard';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [userEmail, setUserEmail] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');

  const handleLogin = (email: string) => {
    setUserEmail(email);
    // Check if it's the user's first access
    const isFirstAccess = !localStorage.getItem('user_niche');
    setAppState(isFirstAccess ? 'niche-selection' : 'dashboard');
  };

  const handleNicheSelection = (niche: string) => {
    setSelectedNiche(niche);
    localStorage.setItem('user_niche', niche);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUserEmail('');
    setSelectedNiche('');
    setAppState('login');
  };

  switch (appState) {
    case 'login':
      return <LoginForm onLogin={handleLogin} />;
    
    case 'niche-selection':
      return <NicheSelection onNicheSelected={handleNicheSelection} />;
    
    case 'dashboard':
      return <Dashboard userEmail={userEmail} onLogout={handleLogout} />;
    
    default:
      return <LoginForm onLogin={handleLogin} />;
  }
};

export default Index;
