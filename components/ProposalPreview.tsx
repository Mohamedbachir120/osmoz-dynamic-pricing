import React, { useRef } from 'react';
import { Phase, PricingOption } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ProposalPreviewProps {
  clientName: string;
  phases: Phase[];
  total: number;
  onBack: () => void;
}

const ProposalPreview: React.FC<ProposalPreviewProps> = ({ clientName, phases, total, onBack }) => {
  const documentRef = useRef<HTMLDivElement>(null);
  
  const selectedPhases = phases.filter(p => p.enabled);
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleGeneratePDF = () => {
    try {
      // Create PDF with mm units for better control
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPos = margin;

      // Helper functions
      const addText = (text: string, x: number, size: number, style: string = 'normal', color: [number, number, number] = [0, 0, 0]) => {
        pdf.setFontSize(size);
        pdf.setFont('helvetica', style);
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.text(text, x, yPos);
      };

      const addLine = (height: number = 5) => {
        yPos += height;
      };

      const drawRect = (x: number, y: number, w: number, h: number, fill: [number, number, number]) => {
        pdf.setFillColor(fill[0], fill[1], fill[2]);
        pdf.rect(x, y, w, h, 'F');
      };

      // Header with logo placeholder
      drawRect(margin, yPos, 15, 15, [37, 99, 235]); // Blue square for logo
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('O', margin + 7.5, yPos + 10, { align: 'center' });
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('OSMOZ', margin + 20, yPos + 8);
      pdf.setFontSize(8);
      pdf.setTextColor(37, 99, 235);
      pdf.text('DIGITAL REAL ESTATE SOLUTIONS', margin + 20, yPos + 13);

      // Date and reference (right side)
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('OFFRE COMMERCIALE', pageWidth - margin, yPos + 3, { align: 'right' });
      pdf.setFontSize(7);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`REF: OSM-2025-${Math.floor(Math.random() * 10000)}`, pageWidth - margin, yPos + 8, { align: 'right' });
      pdf.setFont('helvetica', 'normal');
      pdf.text(currentDate, pageWidth - margin, yPos + 12, { align: 'right' });

      yPos += 20;
      
      // Blue line separator
      pdf.setDrawColor(37, 99, 235);
      pdf.setLineWidth(1);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      // Contact boxes
      const boxWidth = (pageWidth - 2 * margin - 5) / 2;
      
      // From box
      drawRect(margin, yPos, boxWidth, 35, [248, 250, 252]);
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 150, 150);
      pdf.text('DE LA PART DE', margin + 3, yPos + 5);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Osmoz Digital Services', margin + 3, yPos + 11);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 80, 80);
      pdf.text('Draria, Alger, Algérie', margin + 3, yPos + 16);
      pdf.setTextColor(37, 99, 235);
      pdf.text('contact@osmoz.dz', margin + 3, yPos + 21);
      pdf.setTextColor(80, 80, 80);
      pdf.text('+213 (0) 556 20 74 44', margin + 3, yPos + 26);

      // To box
      const toBoxX = margin + boxWidth + 5;
      pdf.setDrawColor(37, 99, 235);
      pdf.setLineWidth(0.5);
      pdf.rect(toBoxX, yPos, boxWidth, 35);
      
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('PRÉPARÉ POUR', toBoxX + 3, yPos + 5);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(clientName, toBoxX + 3, yPos + 11);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text('Secteur : Promotion Immobilière', toBoxX + 3, yPos + 16);

      yPos += 45;

      // Introduction
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Objet de la Mission', margin, yPos);
      yPos += 7;
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 80, 80);
      const introText = `Suite à nos échanges, nous avons le plaisir de vous soumettre cette proposition d'accompagnement. L'objectif est de digitaliser intégralement le parcours client de ${clientName}, en optimisant la gestion de vos stocks et en automatisant votre force de vente.`;
      const splitIntro = pdf.splitTextToSize(introText, pageWidth - 2 * margin);
      pdf.text(splitIntro, margin, yPos);
      yPos += splitIntro.length * 5 + 10;

      // Modules section
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('01  Détail des modules sélectionnés', margin, yPos);
      yPos += 10;

      selectedPhases.forEach((phase) => {
        const opt = phase.selectedOption === PricingOption.STARTER ? phase.starter : phase.standardPlus;
        
        // Check if we need a new page
        if (yPos > pageHeight - 60) {
          pdf.addPage();
          yPos = margin;
        }

        // Phase title and price
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(phase.title, margin + 5, yPos);
        pdf.text(`${opt.price.toLocaleString()} DZD`, pageWidth - margin, yPos, { align: 'right' });
        yPos += 6;

        // Pack badge
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        if (phase.selectedOption === PricingOption.STARTER) {
          drawRect(margin + 5, yPos - 3, 20, 4, [240, 240, 240]);
          pdf.setTextColor(80, 80, 80);
        } else {
          drawRect(margin + 5, yPos - 3, 30, 4, [37, 99, 235]);
          pdf.setTextColor(255, 255, 255);
        }
        pdf.text(`PACK ${phase.selectedOption.toUpperCase()}`, margin + 6, yPos);
        yPos += 7;

        // Features (2 columns)
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(100, 100, 100);
        
        opt.features.forEach((feature, idx) => {
          const col = idx % 2;
          const colX = margin + 7 + (col * (boxWidth + 3));
          
          if (col === 0 && idx > 0) yPos += 4;
          
          pdf.text('✓', colX, yPos);
          const featureText = pdf.splitTextToSize(feature, boxWidth - 5);
          pdf.text(featureText, colX + 3, yPos);
        });
        
        yPos += 12;
        
        // Separator line
        pdf.setDrawColor(230, 230, 230);
        pdf.setLineWidth(0.3);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
      });

      // Financial summary box
      if (yPos > pageHeight - 70) {
        pdf.addPage();
        yPos = margin;
      }

      drawRect(margin, yPos, pageWidth - 2 * margin, 40, [15, 23, 42]);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(96, 165, 250);
      pdf.text('INVESTISSEMENT GLOBAL', margin + 5, yPos + 8);
      
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text(`${total.toLocaleString()} DZD HT`, margin + 5, yPos + 20);

      // Payment terms (right side)
      const termsX = pageWidth - margin - 40;
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 150, 150);
      pdf.text('MODALITÉS', termsX, yPos + 10);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(200, 200, 200);
      pdf.text('Acompte :', termsX, yPos + 16);
      pdf.text('Livraison :', termsX, yPos + 21);
      pdf.text('Recette :', termsX, yPos + 26);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('30%', termsX + 25, yPos + 16);
      pdf.text('40%', termsX + 25, yPos + 21);
      pdf.text('30%', termsX + 25, yPos + 26);

      yPos += 50;

      // Signatures
      pdf.setDrawColor(230, 230, 230);
      pdf.setLineWidth(0.3);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 150, 150);
      pdf.text('LE PRESTATAIRE (OSMOZ)', margin, yPos);
      pdf.text(`LE CLIENT (${clientName.toUpperCase()})`, pageWidth / 2 + 5, yPos);
      
      yPos += 20;
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPos, margin + 60, yPos);
      pdf.line(pageWidth / 2 + 5, yPos, pageWidth / 2 + 65, yPos);
      
      yPos += 3;
      pdf.setFontSize(6);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(180, 180, 180);
      pdf.text('Cachet et Signature', margin, yPos);
      pdf.text('Mention "Bon pour accord"', pageWidth / 2 + 5, yPos);

      // Footer
      pdf.setFontSize(6);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(150, 150, 150);
      const footer1 = 'Document généré par le configurateur Osmoz v2.0 • Validité 30 jours calendaires';
      const footer2 = 'Osmoz Digital Services - RC: 16/00-1234567B12 - IF: 001234567890123 - AI: 12345678901';
      pdf.text(footer1, pageWidth / 2, pageHeight - 10, { align: 'center' });
      pdf.text(footer2, pageWidth / 2, pageHeight - 6, { align: 'center' });

      // Download
      const fileName = `Offre_Osmoz_${clientName.replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la création du PDF.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-10 px-3 sm:px-4">
    {/* Navigation & Actions */}
    <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 no-print">
      <button 
        onClick={onBack} 
        className="flex items-center justify-center sm:justify-start text-slate-500 hover:text-blue-600 transition-colors font-semibold group py-2"
      >
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Retour à l'édition
      </button>
      
      <div className="flex gap-2 sm:gap-3">
        <button 
          onClick={() => alert('Fonctionnalité Excel bientôt disponible')}
          className="flex-1 sm:flex-none px-3 sm:px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm"
        >
          <svg className="w-4 h-4 mr-1 sm:mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/></svg>
          <span className="hidden sm:inline">Export Excel</span>
          <span className="sm:hidden">Excel</span>
        </button>
        <button 
          onClick={handleGeneratePDF}
          className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 font-bold text-xs sm:text-sm flex items-center justify-center transition-all active:scale-95"
        >
          <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          <span className="hidden sm:inline">Télécharger le PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>
    </div>

    {/* Actual Document Area */}
    <div 
      className="bg-white shadow-lg sm:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 rounded-sm mx-auto w-full sm:max-w-[800px]"
    >
      <div className="p-4 sm:p-8 lg:p-16">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 sm:border-b-4 border-blue-600 pb-6 sm:pb-12 mb-6 sm:mb-12 gap-4 sm:gap-0">
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
               <span className="text-white font-black text-3xl sm:text-5xl">O</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter uppercase">OSMOZ</h1>
              <p className="text-blue-600 text-[9px] sm:text-xs font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase">Digital Real Estate Solutions</p>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <div className="inline-block bg-blue-50 text-blue-700 px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-black mb-2 sm:mb-3">OFFRE COMMERCIALE</div>
            <div className="text-slate-400 text-[10px] sm:text-xs font-mono uppercase">REF: OSM-2025-{Math.floor(Math.random() * 10000)}</div>
            <div className="text-slate-900 font-bold text-xs sm:text-sm mt-1">{currentDate}</div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12 mb-8 sm:mb-16">
          <div className="bg-slate-50 p-4 sm:p-8 rounded-xl sm:rounded-2xl">
            <h3 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">De la part de</h3>
            <p className="text-base sm:text-xl font-black text-slate-900 mb-1">Osmoz Digital Services</p>
            <div className="space-y-1 text-xs sm:text-sm text-slate-600">
              <p>Draria </p>
              <p>Alger, Algérie</p>
              <p className="pt-2 font-semibold text-blue-600">contact@osmoz.dz</p>
              <p>+213 (0) 556 20 74 44</p>
            </div>
          </div>
          <div className="border-2 border-blue-50 p-4 sm:p-8 rounded-xl sm:rounded-2xl">
            <h3 className="text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 sm:mb-4">Préparé pour</h3>
            <p className="text-base sm:text-xl font-black text-slate-900 mb-1">{clientName}</p>
            <p className="text-xs sm:text-sm text-slate-500 italic mb-3 sm:mb-4">Secteur : Promotion Immobilière</p>
            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4">Objet de la Mission</h2>
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            Suite à nos échanges, nous avons le plaisir de vous soumettre cette proposition d'accompagnement. 
            L'objectif est de digitaliser intégralement le parcours client de <span className="font-bold text-slate-900">{clientName}</span>, 
            en optimisant la gestion de vos stocks et en automatisant votre force de vente.
          </p>
        </div>

        {/* Module Breakdown */}
        <div className="mb-8 sm:mb-16">
          <h2 className="text-base sm:text-lg font-black text-slate-900 mb-4 sm:mb-8 flex items-center">
            <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm">01</span>
            Détail des modules sélectionnés
          </h2>
          <div className="space-y-6 sm:space-y-10">
            {selectedPhases.map((phase, idx) => {
              const opt = phase.selectedOption === PricingOption.STARTER ? phase.starter : phase.standardPlus;
              return (
                <div key={phase.id} className="relative pl-4 sm:pl-8 border-l-2 border-slate-100 pb-2">
                  <div className="absolute -left-[5px] sm:-left-[9px] top-0 w-2 h-2 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-white bg-blue-600 shadow-sm"></div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 leading-none mb-2">{phase.title}</h4>
                      <span className={`text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        phase.selectedOption === PricingOption.STARTER ? 'bg-slate-100 text-slate-600' : 'bg-blue-600 text-white shadow-md shadow-blue-100'
                      }`}>
                        Pack {phase.selectedOption}
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{opt.price.toLocaleString()} DZD</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2">
                    {opt.features.map((f, i) => (
                      <div key={i} className="flex items-center text-[10px] sm:text-[11px] text-slate-500 font-medium">
                        <svg className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Summary Box */}
        <div 
          className="bg-slate-900 text-white p-6 sm:p-12 rounded-2xl sm:rounded-[2rem] mb-8 sm:mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 relative overflow-hidden"
          style={{ backgroundColor: '#0f172a' }}
        >
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
          
          <div className="relative z-10 w-full sm:w-auto">
            <div className="text-blue-400 text-[10px] sm:text-xs font-black mb-2 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Investissement Global</div>
            <div className="text-4xl sm:text-6xl font-black tracking-tighter">
              {total.toLocaleString()} 
              <span className="text-lg sm:text-2xl font-light text-slate-400 ml-2 sm:ml-3 uppercase">DZD HT</span>
            </div>
          </div>
          
          <div className="text-left sm:text-right relative z-10 sm:border-l border-slate-700 sm:pl-12 w-full sm:w-auto">
            <h4 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">Modalités</h4>
            <div className="space-y-2 text-xs font-bold text-slate-300">
              <p className="flex justify-between sm:justify-end gap-4 sm:gap-8"><span>Acompte :</span> <span className="text-white">30%</span></p>
              <p className="flex justify-between sm:justify-end gap-4 sm:gap-8"><span>Livraison :</span> <span className="text-white">40%</span></p>
              <p className="flex justify-between sm:justify-end gap-4 sm:gap-8"><span>Recette :</span> <span className="text-white">30%</span></p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-24 pt-8 sm:pt-12 border-t border-slate-100">
          <div>
            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 sm:mb-16">Le Prestataire (Osmoz)</p>
            <div className="h-20 sm:h-24 border-b-2 border-slate-100 w-full mb-3 flex items-end pb-2">
              <span className="text-slate-300 font-serif italic text-xs sm:text-sm">Cachet et Signature</span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-400">Fait à Alger, le {currentDate}</p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 sm:mb-16">Le Client ({clientName})</p>
            <div className="h-20 sm:h-24 border-b-2 border-slate-100 w-full mb-3 flex items-end pb-2">
              <span className="text-slate-300 font-serif italic text-xs sm:text-sm">Mention "Bon pour accord"</span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-400">Nom et qualité du signataire</p>
          </div>
        </div>

        <div className="mt-12 sm:mt-24 text-center">
          <p className="text-[8px] sm:text-[9px] text-slate-400 italic mb-1 uppercase tracking-tighter">
            Document généré par le configurateur Osmoz v2.0 • Validité 30 jours calendaires
          </p>
          <p className="text-[8px] sm:text-[9px] text-slate-300">
            Osmoz Digital Services - RC: 16/00-1234567B12 - IF: 001234567890123 - AI: 12345678901
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProposalPreview;