import React, { useState } from 'react';

interface HeaderProps {
  currentView: 'builder' | 'admin' | 'proposal';
  setView: (view: 'builder' | 'admin' | 'proposal') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('builder')}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">O</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">OSMOZ</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-4">
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
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200"
          >
            Générer Proposition
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <nav className="flex flex-col space-y-2 p-4">
            <button 
              onClick={() => { setView('builder'); setIsMenuOpen(false); }}
              className={`text-sm font-medium transition-colors text-left ${currentView === 'builder' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Configurateur
            </button>
            <button 
              onClick={() => { setView('admin'); setIsMenuOpen(false); }}
              className={`text-sm font-medium transition-colors text-left ${currentView === 'admin' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Admin
            </button>
            <button 
              onClick={() => { setView('proposal'); setIsMenuOpen(false); }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 text-left"
            >
              Générer Proposition
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
