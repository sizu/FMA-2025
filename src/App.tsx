import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import ShareholdersForm from './components/ShareholdersForm';
import ProfileView from './components/ProfileView';
import CapitalForm from './components/CapitalForm';
import InvestmentForm from './components/InvestmentForm';
import SellingForm from './components/SellingForm';
import AssociationCostForm from './components/AssociationCostForm';
import PettyCashForm from './components/PettyCashForm';
import { AppProvider } from './context/AppContext';
import './App.css';

type UserRole = 'admin' | 'shareholder' | null;
type CurrentView = 'dashboard' | 'shareholders' | 'profile' | 'capital' | 'investment' | 'selling' | 'association' | 'petty-cash';

function App() {
  const [user, setUser] = useState<UserRole>(null);
  const [currentView, setCurrentView] = useState<CurrentView>('dashboard');

  const handleLogin = (role: UserRole) => {
    setUser(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={user} onViewChange={setCurrentView} />;
      case 'shareholders':
        return <ShareholdersForm userRole={user} onBack={() => setCurrentView('dashboard')} />;
      case 'profile':
        return <ProfileView userRole={user} onBack={() => setCurrentView('dashboard')} />;
      case 'capital':
        return <CapitalForm userRole={user} onBack={() => setCurrentView('dashboard')} />;
      case 'investment':
        return <InvestmentForm userRole={user} onBack={() => setCurrentView('dashboard')} />;
      case 'selling':
        return <SellingForm userRole={user} onBack={() => setCurrentView('dashboard')} />;
      case 'association':
        return <AssociationCostForm userRole={user} onBack={() => setCurrentView('dashboard')} />;
      case 'petty-cash':
        return <PettyCashForm userRole={user} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard userRole={user} onViewChange={setCurrentView} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FMA</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Friends Multipurpose Association</h1>
                  <p className="text-sm text-slate-600">2025 Management System</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">
                  Welcome, {user === 'admin' ? 'Master Admin' : 'Shareholder'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderCurrentView()}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;