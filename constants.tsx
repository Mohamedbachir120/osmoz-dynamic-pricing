import { Phase, PricingOption } from './types';

export const INITIAL_PHASES: Phase[] = [
  {
    id: 'p1',
    title: 'PHASE 1 — Présence Web & Acquisition',
    description: 'Mise en place de votre vitrine digitale et capture de prospects.',
    objective: 'Attirer et convertir les premiers visiteurs.',
    enabled: true,
    selectedOption: PricingOption.STARTER,
    starter: {
      type: PricingOption.STARTER,
      price: 15000,
      features: [
        'Landing page optimisée',
        'Formulaire de contact simple',
        'Hébergement inclus',
        'Nom de domaine .com/.dz'
      ]
    },
    standardPlus: {
      type: PricingOption.STANDARD_PLUS,
      price: 25000,
      features: [
        'Landing page optimisée',
        'Formulaire de contact simple',
        'Hébergement inclus',
        'Nom de domaine .com/.dz',
        'Site multi-pages (SEO)',
        'Blog & News interactives',
        'Intégration Newsletters'
      ]
    }
  },
  {
    id: 'p2',
    title: 'PHASE 2 — CRM & Pilotage Commercial',
    description: 'Centralisation de vos prospects et suivi du cycle de vente.',
    objective: 'Optimiser la conversion prospect-client.',
    enabled: true,
    selectedOption: PricingOption.STARTER,
    starter: {
      type: PricingOption.STARTER,
      price: 80000,
      features: [
        'Gestion des contacts de base',
        'Fiches prospects standards',
        'Historique des échanges',
        'Attribution manuelle'
      ]
    },
    standardPlus: {
      type: PricingOption.STANDARD_PLUS,
      price: 140000,
      features: [
        'Gestion des contacts de base',
        'Fiches prospects standards',
        'Historique des échanges',
        'Attribution manuelle',
        'Pipeline de vente dynamique',
        'Relances automatiques',
        'Segmentation avancée (Scoring)',
        'Application Mobile Commerciale'
      ]
    }
  },
  {
    id: 'p3',
    title: 'PHASE 3 — Gestion du Stock Immobilier',
    description: 'Inventaire temps réel de vos lots (appartements, locaux).',
    objective: 'Assurer une visibilité parfaite sur la disponibilité.',
    enabled: true,
    selectedOption: PricingOption.STARTER,
    starter: {
      type: PricingOption.STARTER,
      price: 90000,
      features: [
        'Tableau de bord de base',
        'Statuts Libre/Réservé/Vendu',
        'Plans de masse PDF',
        'Recherche simple'
      ]
    },
    standardPlus: {
      type: PricingOption.STANDARD_PLUS,
      price: 160000,
      features: [
        'Tableau de bord de base',
        'Statuts Libre/Réservé/Vendu',
        'Plans de masse PDF',
        'Recherche simple',
        'Maquette 3D Interactive',
        'Filtrage avancé multi-critères',
        'Génération automatique de fiches de lots',
        'Alerte stock critique'
      ]
    }
  },
  {
    id: 'p4',
    title: 'PHASE 4 — Réservations & Suivi des Ventes',
    description: 'Digitalisation du processus contractuel.',
    objective: 'Accélérer les délais de signature.',
    enabled: true,
    selectedOption: PricingOption.STARTER,
    starter: {
      type: PricingOption.STARTER,
      price: 70000,
      features: [
        'Gestion des acomptes',
        'Suivi des paiements simples',
        'Calendrier de signatures',
        'Échéancier de base'
      ]
    },
    standardPlus: {
      type: PricingOption.STANDARD_PLUS,
      price: 130000,
      features: [
        'Gestion des acomptes',
        'Suivi des paiements simples',
        'Calendrier de signatures',
        'Échéancier de base',
        'Workflow de validation notaire',
        'Portail Client sécurisé',
        'Suivi des désistements'
      ]
    }
  },
  {
    id: 'p5',
    title: 'PHASE 5 — Reporting & Analytics',
    description: 'Tableaux de bord pour la direction.',
    objective: 'Prendre des décisions basées sur la donnée.',
    enabled: true,
    selectedOption: PricingOption.STARTER,
    starter: {
      type: PricingOption.STARTER,
      price: 30000,
      features: [
        'Rapport mensuel PDF',
        'Ventes par commercial',
        'Graphiques de base',
        'Export Excel'
      ]
    },
    standardPlus: {
      type: PricingOption.STANDARD_PLUS,
      price: 70000,
      features: [
        'Rapport mensuel PDF',
        'Ventes par commercial',
        'Graphiques de base',
        'Export Excel',
        'Tableaux de bord Temps Réel',
        'Prévisionnel de CA (Forecasting)',
        'Alertes sur objectifs'
      ]
    }
  },
  {
    id: 'p6',
    title: 'PHASE 6 — Automatisations & Maintenance',
    description: 'Support technique et automatisation des tâches.',
    objective: 'Garantir la stabilité et l\'évolutivité.',
    enabled: true,
    selectedOption: PricingOption.STARTER,
    starter: {
      type: PricingOption.STARTER,
      price: 20000, // per month
      features: [
        'Support mail 48h',
        'Maintenance corrective',
        'Sauvegardes hebdo',
        '1h de formation/mois'
      ]
    },
    standardPlus: {
      type: PricingOption.STANDARD_PLUS,
      price: 70000, // per month
      features: [
        'Support mail 48h',
        'Maintenance corrective',
        'Sauvegardes hebdo',
        '1h de formation/mois',
        'Support Hotline 4h',
        'Maintenance évolutive',
        'Sauvegardes quotidiennes',
        'Accompagnement stratégique continu'
      ]
    }
  }
];

export const BRANDING = {
  logo: 'https://picsum.photos/seed/osmoz/200/60',
  primaryColor: '#2563eb', // Blue-600
  footerText: 'Cette proposition est établie par Osmoz pour Djoudi Promotion.'
};
