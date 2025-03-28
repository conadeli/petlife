import React, { useState, useEffect } from 'react';
import { DogFormData, WeightStatus } from '../types/dog';
import { dogWeightData, breeds } from '../data/dogWeightData';
import { calculateWeightStatus } from '../utils/weightCalculator';

interface DogFormProps {
  onSubmit: (data: DogFormData) => void;
}

export const DogForm: React.FC<DogFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DogFormData>({
    breed: '',
    age: 0,
    gender: '',
    neutered: '',
    weight: 0,
    exercise: 0,
    diet: '',
    vaccination: '',
    health: '',
    dental: '',
    skinDisease: '',
    genetic: '',
    checkup: '',
    supplements: '',
    hygiene: '',
    stress: '',
    training: ''
  });

  const [weightStatus, setWeightStatus] = useState<WeightStatus | null>(null);
  const [showBirthExperience, setShowBirthExperience] = useState(false);

  useEffect(() => {
    if (formData.breed && formData.weight > 0) {
      const status = calculateWeightStatus(formData.breed, formData.weight, formData.age);
      setWeightStatus(status);
    }
  }, [formData.breed, formData.weight, formData.age]);

  useEffect(() => {
    setShowBirthExperience(formData.gender === 'female' && formData.neutered === 'no');
  }, [formData.gender, formData.neutered]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
          품종
        </label>
        <select
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">품종을 선택하세요</option>
          {breeds.map(breed => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          나이 (년)
        </label>
        <input
          type="number"
          id="age"
          name="age"
          min="0"
          max="25"
          step="0.5"
          value={formData.age}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          성별
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="male">수컷</option>
          <option value="female">암컷</option>
        </select>
      </div>

      <div>
        <label htmlFor="neutered" className="block text-sm font-medium text-gray-700">
          중성화 여부
        </label>
        <select
          id="neutered"
          name="neutered"
          value={formData.neutered}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="yes">예</option>
          <option value="no">아니오</option>
        </select>
      </div>

      {showBirthExperience && (
        <div>
          <label htmlFor="birthExperience" className="block text-sm font-medium text-gray-700">
            출산 경험
          </label>
          <select
            id="birthExperience"
            name="birthExperience"
            value={formData.birthExperience}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="none">없음</option>
            <option value="once">1회</option>
            <option value="multiple">2회 이상</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          체중 (kg)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          min="0.5"
          max="100"
          step="0.5"
          value={formData.weight}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {weightStatus && (
        <div className={`p-4 rounded-md ${
          weightStatus.status === 'normal' ? 'bg-green-50 text-green-700' :
          weightStatus.status === 'overweight' ? 'bg-red-50 text-red-700' :
          'bg-yellow-50 text-yellow-700'
        }`}>
          <h4 className="font-medium">{weightStatus.statusText}</h4>
          <p className="text-sm mt-1">{weightStatus.infoText}</p>
          <p className="text-sm mt-2 font-medium">{weightStatus.impactText}</p>
        </div>
      )}

      <div>
        <label htmlFor="exercise" className="block text-sm font-medium text-gray-700">
          운동량 (주당 평균 분)
        </label>
        <input
          type="number"
          id="exercise"
          name="exercise"
          min="0"
          max="1000"
          value={formData.exercise}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="diet" className="block text-sm font-medium text-gray-700">
          식습관
        </label>
        <select
          id="diet"
          name="diet"
          value={formData.diet}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="dog-food">사료 위주</option>
          <option value="human-food">사람 음식 위주</option>
          <option value="mixed">혼합</option>
        </select>
      </div>

      <div>
        <label htmlFor="vaccination" className="block text-sm font-medium text-gray-700">
          예방접종 여부
        </label>
        <select
          id="vaccination"
          name="vaccination"
          value={formData.vaccination}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="regular">정기적</option>
          <option value="never">안함</option>
        </select>
      </div>

      <div>
        <label htmlFor="health" className="block text-sm font-medium text-gray-700">
          건강 상태
        </label>
        <select
          id="health"
          name="health"
          value={formData.health}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="healthy">건강함</option>
          <option value="minor">약간 질병</option>
          <option value="chronic">만성질환</option>
        </select>
      </div>

      <div>
        <label htmlFor="dental" className="block text-sm font-medium text-gray-700">
          치아 관리 여부
        </label>
        <select
          id="dental"
          name="dental"
          value={formData.dental}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="regular">정기적</option>
          <option value="sometimes">가끔</option>
          <option value="never">안함</option>
        </select>
      </div>

      <div>
        <label htmlFor="skinDisease" className="block text-sm font-medium text-gray-700">
          피부 질환 유무
        </label>
        <select
          id="skinDisease"
          name="skinDisease"
          value={formData.skinDisease}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="none">없음</option>
          <option value="mild">경미함</option>
          <option value="severe">심각함</option>
        </select>
      </div>

      <div>
        <label htmlFor="genetic" className="block text-sm font-medium text-gray-700">
          유전 질환 가족력
        </label>
        <select
          id="genetic"
          name="genetic"
          value={formData.genetic}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="yes">있음</option>
          <option value="no">없음</option>
          <option value="unknown">모름</option>
        </select>
      </div>

      <div>
        <label htmlFor="checkup" className="block text-sm font-medium text-gray-700">
          정기 검진 여부
        </label>
        <select
          id="checkup"
          name="checkup"
          value={formData.checkup}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="regular">연 1회 이상</option>
          <option value="rarely">거의 없음</option>
        </select>
      </div>

      <div>
        <label htmlFor="supplements" className="block text-sm font-medium text-gray-700">
          영양제 섭취 여부
        </label>
        <select
          id="supplements"
          name="supplements"
          value={formData.supplements}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="yes">예</option>
          <option value="no">아니오</option>
        </select>
      </div>

      <div>
        <label htmlFor="hygiene" className="block text-sm font-medium text-gray-700">
          위생 관리 수준
        </label>
        <select
          id="hygiene"
          name="hygiene"
          value={formData.hygiene}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="regular">정기 목욕/미용</option>
          <option value="rarely">거의 안함</option>
        </select>
      </div>

      <div>
        <label htmlFor="stress" className="block text-sm font-medium text-gray-700">
          스트레스 환경 여부
        </label>
        <select
          id="stress"
          name="stress"
          value={formData.stress}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="high">높음</option>
          <option value="medium">보통</option>
          <option value="low">낮음</option>
        </select>
      </div>

      <div>
        <label htmlFor="training" className="block text-sm font-medium text-gray-700">
          훈련 및 인지 자극 활동 여부
        </label>
        <select
          id="training"
          name="training"
          value={formData.training}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">선택하세요</option>
          <option value="often">자주</option>
          <option value="sometimes">가끔</option>
          <option value="never">없음</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        수명 계산하기
      </button>
    </form>
  );
};