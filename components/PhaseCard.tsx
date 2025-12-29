
import React, { useState, useMemo } from 'react';
import { Phase, PricingOption } from '../types';

interface PhaseCardProps {
  phase: Phase;
  onToggle: () => void;
  onSelectOption: (option: PricingOption) => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onToggle, onSelectOption }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Calcul des fonctionnalités à afficher.
   * On part du principe que Standard Plus est cumulatif (inclut Starter + exclusivités Std+).
   * useMemo garantit que la liste est recalculée dès que selectedOption change.
   */
  const featureList = useMemo(() => {
    const isStandardPlus = phase.selectedOption === PricingOption.STANDARD_PLUS;
    
    // Union de toutes les fonctionnalités uniques pour cette phase
    const allUniqueFeatures = Array.from(new Set([...phase.starter.features, ...phase.standardPlus.features]));
    
    return allUniqueFeatures.map(feature => {
      const isStarterFeature = phase.starter.features.includes(feature);
      // Une fonctionnalité est incluse si :
      // 1. On est en Standard Plus (qui inclut tout)
      // 2. OU c'est une fonctionnalité de base (Starter)
      const isIncluded = isStandardPlus || isStarterFeature;
      
      return {
        text: feature,
        included: isIncluded
      };
    });
  }, [phase.selectedOption, phase.starter.features, phase.standardPlus.features]);

  return (
    <div className={`transition-all duration-300 rounded-xl border-2 bg-white ${phase.enabled ? 'border-slate-200 opacity-100 shadow-sm' : 'border-slate-100 opacity-60 grayscale'}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{phase.title}</h3>
            <div className="flex items-center space-x-2">
               <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Enjeu : {phase.objective}</span>
            </div>
          </div>
          <button 
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${phase.enabled ? 'bg-blue-600' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${phase.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-6">{phase.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            disabled={!phase.enabled}
            onClick={() => onSelectOption(PricingOption.STARTER)}
            className={`p-3 rounded-lg border text-center transition-all ${
              phase.selectedOption === PricingOption.STARTER && phase.enabled
                ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Starter</div>
            <div className="text-lg font-bold text-slate-900">{phase.starter.price.toLocaleString()} DZD</div>
          </button>
          
          <button
            disabled={!phase.enabled}
            onClick={() => onSelectOption(PricingOption.STANDARD_PLUS)}
            className={`p-3 rounded-lg border text-center transition-all ${
              phase.selectedOption === PricingOption.STANDARD_PLUS && phase.enabled
                ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">Standard Plus</div>
            <div className="text-lg font-bold text-slate-900">{phase.standardPlus.price.toLocaleString()} DZD</div>
          </button>
        </div>

        {phase.enabled && phase.selectedOption === PricingOption.STANDARD_PLUS && (
           <div className="bg-emerald-50 border border-emerald-100 p-2 rounded text-xs text-emerald-700 font-medium mb-4 flex items-center animate-in slide-in-from-top-1">
             <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
             Valeur ajoutée Osmoz : +{(phase.standardPlus.price - phase.starter.price).toLocaleString()} DZD d'innovation
           </div>
        )}

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-slate-500 flex items-center hover:text-blue-600 transition-colors"
        >
          {isExpanded ? 'Masquer les détails' : 'Voir les fonctionnalités incluses'}
          <svg className={`ml-1 w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 animate-in fade-in duration-200">
            {featureList.map((item, idx) => (
              <div key={idx} className={`flex items-start text-xs transition-opacity duration-200 ${item.included ? 'text-slate-700' : 'text-slate-400 italic opacity-50'}`}>
                {item.included ? (
                  <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-4 h-4 text-slate-300 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
                <span className={item.included ? "" : "line-through"}>{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhaseCard;
