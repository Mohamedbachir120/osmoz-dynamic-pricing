
export enum PricingOption {
  STARTER = 'Starter',
  STANDARD_PLUS = 'Standard Plus'
}

export interface Feature {
  text: string;
  included: boolean;
}

export interface PhaseOption {
  type: PricingOption;
  price: number;
  features: string[];
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  objective: string;
  enabled: boolean;
  selectedOption: PricingOption;
  starter: PhaseOption;
  standardPlus: PhaseOption;
}

export interface ProposalState {
  clientName: string;
  phases: Phase[];
}

export interface BrandingConfig {
  primaryColor: string;
  logo: string;
  footerText: string;
}
