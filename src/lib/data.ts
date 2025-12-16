import type { Medication, Food, Interaction } from './types';

export const medications: Medication[] = [
  {
    id: 'med1',
    genericName: 'Warfarin',
    brandNames: ['Coumadin', 'Jantoven'],
    category: 'Anticoagulant',
  },
  {
    id: 'med2',
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor'],
    category: 'Statin',
  },
  {
    id: 'med3',
    genericName: 'Lisinopril',
    brandNames: ['Zestril', 'Prinivil'],
    category: 'ACE Inhibitor',
  },
  {
    id: 'med4',
    genericName: 'Metformin',
    brandNames: ['Glucophage'],
    category: 'Antidiabetic',
  },
  {
    id: 'med5',
    genericName: 'Levothyroxine',
    brandNames: ['Synthroid', 'Levo-T'],
    category: 'Thyroid Hormone',
  },
  {
    id: 'warfarin',
    genericName: 'Warfarin',
    brandNames: ['Coumadin', 'Jantoven'],
    category: 'Anticoagulant',
  },
  {
    id: 'lipitor',
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor'],
    category: 'Statin',
  },
];

// NOTE: The `foods` and `interactions` arrays have been removed
// as this data will now be fetched dynamically by an AI flow.
export const foods: Food[] = [];
export const interactions: Interaction[] = [];


export const userProfile = {
  name: "Jane Doe",
  email: "patient@example.com",
  age: 42,
  gender: "female",
  medications: ['med1', 'med3'],
  reminders: [
    { medicationId: 'med1', time: '08:00 AM' },
    { medicationId: 'med3', time: '08:00 PM' },
  ]
};
