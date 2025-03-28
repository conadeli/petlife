export interface DogWeight {
  Puppy: string;
  Adult: string;
  Senior: string;
}

export interface DogWeightData {
  [breed: string]: DogWeight;
}

export interface DogFormData {
  breed: string;
  age: number;
  gender: string;
  neutered: string;
  birthExperience?: string;
  weight: number;
  exercise: number;
  diet: string;
  vaccination: string;
  health: string;
  dental: string;
  skinDisease: string;
  genetic: string;
  checkup: string;
  supplements: string;
  hygiene: string;
  stress: string;
  training: string;
}

export interface WeightStatus {
  status: 'normal' | 'overweight' | 'underweight';
  statusText: string;
  infoText: string;
  impactText: string;
}