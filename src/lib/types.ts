export interface Medication {
  id: string;
  genericName: string;
  brandNames: string[];
  category: string;
}

export interface Food {
  id: string;
  name: string;
  category: string;
}

export interface Interaction {
  id: string;
  medicationId: string;
  foodId: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  clinicalImpact: string;
}
