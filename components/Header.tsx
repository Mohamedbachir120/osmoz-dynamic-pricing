
import React from 'react';

interface HeaderProps {
  currentView: 'builder' | 'admin' | 'proposal';
  setView: (view: 'builder' | 'admin' | 'proposal') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('builder')}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">O</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">OSMOZ</span>
        </div>

        <nav className="flex items-center space-x-6">
          <button 
            onClick={() => setView('builder')}
            className={`text-sm font-medium transition-colors ${currentView === 'builder' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Configurateur
          </button>
          <button 
            onClick={() => setView('admin')}
            className={`text-sm font-medium transition-colors ${currentView === 'admin' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Admin
          </button>
          <button 
            onClick={() => setView('proposal')}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200"
          >
            Générer Proposition
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
