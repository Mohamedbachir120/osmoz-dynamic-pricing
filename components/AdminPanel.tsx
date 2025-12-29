
import React, { useState } from 'react';
import { Phase, PricingOption } from '../types';

interface AdminPanelProps {
  phases: Phase[];
  onUpdate: (phases: Phase[]) => void;
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ phases, onUpdate, onBack }) => {
  const [localPhases, setLocalPhases] = useState(phases);

  const handlePriceChange = (id: string, option: PricingOption, price: string) => {
    const numPrice = parseInt(price) || 0;
    const newPhases = localPhases.map(p => {
      if (p.id === id) {
        if (option === PricingOption.STARTER) {
          return { ...p, starter: { ...p.starter, price: numPrice } };
        } else {
          return { ...p, standardPlus: { ...p.standardPlus, price: numPrice } };
        }
      }
      return p;
    });
    setLocalPhases(newPhases);
  };

  const handleSave = () => {
    onUpdate(localPhases);
    alert('Modifications enregistrées avec succès pour Osmoz.');
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Administration Osmoz</h1>
          <p className="text-slate-500">Configurez l'offre commerciale et les tarifs par défaut.</p>
        </div>
        <div className="space-x-4">
          <button onClick={onBack} className="px-6 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-medium">Retour</button>
          <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold">Enregistrer</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Phase</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider text-right">Prix Starter (DZD)</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider text-right">Prix Std+ (DZD)</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">État</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {localPhases.map(phase => (
              <tr key={phase.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-slate-900">{phase.title}</div>
                  <div className="text-xs text-slate-500 truncate max-w-xs">{phase.objective}</div>
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="number"
                    value={phase.starter.price}
                    onChange={(e) => handlePriceChange(phase.id, PricingOption.STARTER, e.target.value)}
                    className="w-full text-right px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none font-semibold"
                  />
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="number"
                    value={phase.standardPlus.price}
                    onChange={(e) => handlePriceChange(phase.id, PricingOption.STANDARD_PLUS, e.target.value)}
                    className="w-full text-right px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none font-semibold text-blue-600"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${phase.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    {phase.enabled ? 'Actif' : 'Inactif'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-200">
          <h3 className="text-lg font-bold mb-2">Offre de Noël?</h3>
          <p className="text-blue-100 text-sm mb-4">Mettez à jour les prix pour toutes les phases en un clic pour une campagne saisonnière.</p>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-xs font-bold transition-all">Appliquer Promo -10%</button>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-2 text-slate-900">Nouvelle Phase</h3>
          <p className="text-slate-500 text-sm mb-4">Ajoutez un nouveau module de services à votre catalogue commercial.</p>
          <button className="text-blue-600 font-bold text-sm">+ Créer Module</button>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-2 text-slate-900">Versioning</h3>
          <p className="text-slate-500 text-sm mb-4">Version actuelle : 2024.Q4. Archivez les anciens tarifs pour l'historique.</p>
          <button className="text-slate-600 font-bold text-sm">Voir Historique</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
