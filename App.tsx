
import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_PHASES } from './constants';
import { Phase, PricingOption, BrandingConfig } from './types';
import PhaseCard from './components/PhaseCard';
import Summary from './components/Summary';
import AdminPanel from './components/AdminPanel';
import ProposalPreview from './components/ProposalPreview';
import Header from './components/Header';

const App: React.FC = () => {
  const [phases, setPhases] = useState<Phase[]>(INITIAL_PHASES);
  const [clientName, setClientName] = useState('Djoudi Promotion');
  const [view, setView] = useState<'builder' | 'admin' | 'proposal'>('builder');
  
  // Real-time calculation
  const totals = useMemo(() => {
    return phases.reduce((acc, phase) => {
      if (!phase.enabled) return acc;
      const currentPrice = phase.selectedOption === PricingOption.STARTER 
        ? phase.starter.price 
        : phase.standardPlus.price;
      
      return {
        total: acc.total + currentPrice,
        starterSubtotal: acc.starterSubtotal + phase.starter.price,
        plusSubtotal: acc.plusSubtotal + phase.standardPlus.price
      };
    }, { total: 0, starterSubtotal: 0, plusSubtotal: 0 });
  }, [phases]);

  const togglePhase = (id: string) => {
    setPhases(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const selectOption = (id: string, option: PricingOption) => {
    setPhases(prev => prev.map(p => p.id === id ? { ...p, selectedOption: option } : p));
  };

  const updatePhaseData = (updatedPhases: Phase[]) => {
    setPhases(updatedPhases);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={view} setView={setView} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'builder' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Nom du Client</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ex: Djoudi Promotion"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {phases.map((phase) => (
                  <PhaseCard 
                    key={phase.id} 
                    phase={phase} 
                    onToggle={() => togglePhase(phase.id)}
                    onSelectOption={(opt) => selectOption(phase.id, opt)}
                  />
                ))}
              </div>
            </div>

            <aside className="lg:w-96 lg:sticky lg:top-8 self-start">
              <Summary 
                totals={totals} 
                onGenerateProposal={() => setView('proposal')}
              />
            </aside>
          </div>
        )}

        {view === 'admin' && (
          <AdminPanel 
            phases={phases} 
            onUpdate={updatePhaseData} 
            onBack={() => setView('builder')}
          />
        )}

        {view === 'proposal' && (
          <ProposalPreview 
            clientName={clientName}
            phases={phases}
            total={totals.total}
            onBack={() => setView('builder')}
          />
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 no-print">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Osmoz - Tous droits réservés.</p>
          <p className="text-xs mt-2 italic text-slate-500">Plateforme de chiffrage modulaire v1.0</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
