import { dogWeightData } from '../data/dogWeightData';
import { WeightStatus } from '../types/dog';

export function calculateWeightStatus(breed: string, weight: number, age: number): WeightStatus {
  const ageCategory = age < 1 ? 'Puppy' : age >= 7 ? 'Senior' : 'Adult';
  const weightRange = dogWeightData[breed][ageCategory];
  const [minWeight, maxWeight] = weightRange.split('-').map(w => parseFloat(w));

  if (weight < minWeight * 0.9) {
    return {
      status: 'underweight',
      statusText: '저체중',
      infoText: `현재 체중 ${weight}kg은 ${breed}의 적정 체중 ${weightRange}kg보다 낮습니다.`,
      impactText: '저체중은 면역력 저하로 기대 수명에 영향을 줄 수 있습니다.'
    };
  } else if (weight > maxWeight * 1.1) {
    return {
      status: 'overweight',
      statusText: '과체중',
      infoText: `현재 체중 ${weight}kg은 ${breed}의 적정 체중 ${weightRange}kg보다 높습니다.`,
      impactText: '과체중은 기대 수명을 1-2년 단축시킬 수 있습니다.'
    };
  }

  return {
    status: 'normal',
    statusText: '정상 체중',
    infoText: `현재 체중 ${weight}kg은 ${breed}의 적정 체중 범위 ${weightRange}kg 내에 있습니다.`,
    impactText: '정상 체중 유지는 건강한 수명을 위해 중요합니다.'
  };
}