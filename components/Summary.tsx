import React from 'react';

interface SummaryProps {
  totals: {
    total: number;
    starterSubtotal: number;
    plusSubtotal: number;
  };
  onGenerateProposal: () => void;
}

const Summary: React.FC<SummaryProps> = ({ totals, onGenerateProposal }) => {
  return (
    /* 
       CHANGE: Added 'sticky top-8' to keep it visible while scrolling.
       Added 'self-start' to ensure it doesn't stretch to the full height of the parent.
    */
    <div className="mt-28 self-start bg-slate-900 text-white p-8 rounded-2xl shadow-2xl shadow-slate-300 border border-slate-800">
      <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Résumé Financier</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-slate-400">
          <span className="text-sm">Potentiel Starter</span>
          <span className="text-sm font-medium">{totals.starterSubtotal.toLocaleString()} DZD</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span className="text-sm">Option Premium (S+)</span>
          <span className="text-sm font-medium">{totals.plusSubtotal.toLocaleString()} DZD</span>
        </div>
        <div className="h-px bg-slate-700 my-4" />
        <div className="flex justify-between items-end">
          <div>
            <span className="block text-xs uppercase tracking-widest text-blue-400 font-bold mb-1">TOTAL HT</span>
            <span className="text-3xl font-black">{totals.total.toLocaleString()} DZD</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-slate-500 uppercase">Devise</span>
            <span className="text-sm font-bold">DZD</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-8">
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-xs font-bold text-slate-300">NOTE COMMERCIALE</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed italic">
          "Cette proposition est établie par Osmoz. Elle inclut l'expertise technique, l'implémentation et l'accompagnement personnalisé pour Djoudi Promotion."
        </p>
      </div>

      <button 
        onClick={onGenerateProposal}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/40"
      >
        Finaliser la Proposition
      </button>
      
      <p className="text-[10px] text-center text-slate-500 mt-4">
        Valable 30 jours à compter de ce jour.
      </p>
    </div>
  );
};

export default Summary;