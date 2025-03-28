import React from 'react';
import { DogFormData } from '../types/dog';
import { Advertisement } from './Advertisement';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface DogResultProps {
  data: DogFormData;
}

export const DogResult: React.FC<DogResultProps> = ({ data }) => {
  const calculateLifeExpectancy = () => {
    let baseAge = 12; // 기본 수명

    // 품종별 기본 수명 조정
    const breedAgeAdjustments: { [key: string]: number } = {
      "치와와": 2,
      "포메라니안": 1,
      "말티즈": 1,
      // 다른 품종들의 수명 조정값 추가
    };

    baseAge += breedAgeAdjustments[data.breed] || 0;

    // 각 요소별 수명 영향 계산
    const factors = calculateFactors();
    const totalAdjustment = Object.values(factors).reduce((sum, value) => sum + value, 0);

    return Math.round((baseAge + totalAdjustment) * 10) / 10;
  };

  const calculateFactors = () => {
    const factors: { [key: string]: number } = {
      운동: 0,
      영양: 0,
      건강관리: 0,
      스트레스: 0,
      생활환경: 0
    };

    // 운동 점수
    factors.운동 = data.exercise > 300 ? 1 : 
                   data.exercise > 150 ? 0.5 : 
                   data.exercise < 60 ? -0.5 : 0;

    // 영양 점수
    factors.영양 = data.diet === 'dog-food' ? 0.5 :
                   data.diet === 'mixed' ? 0 : -0.5;
    factors.영양 += data.supplements === 'yes' ? 0.3 : 0;

    // 건강관리 점수
    factors.건강관리 = data.vaccination === 'regular' ? 0.5 : -0.5;
    factors.건강관리 += data.checkup === 'regular' ? 0.5 : -0.3;
    factors.건강관리 += data.dental === 'regular' ? 0.3 : 
                       data.dental === 'sometimes' ? 0 : -0.3;

    // 스트레스 점수
    factors.스트레스 = data.stress === 'low' ? 0.5 :
                      data.stress === 'medium' ? 0 : -0.5;

    // 생활환경 점수
    factors.생활환경 = data.hygiene === 'regular' ? 0.3 : -0.3;
    factors.생활환경 += data.training === 'often' ? 0.4 :
                       data.training === 'sometimes' ? 0.2 : -0.2;

    return factors;
  };

  const factors = calculateFactors();
  const lifeExpectancy = calculateLifeExpectancy();

  const chartData = {
    labels: Object.keys(factors),
    datasets: [
      {
        label: '건강 요소 점수',
        data: Object.values(factors),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: -1,
        suggestedMax: 1
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 결과 페이지 상단 광고 */}
      <div className="flex justify-center mb-6">
        <Advertisement type="banner" className="hidden md:block" />
        <Advertisement type="square" className="md:hidden" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          예상 수명 분석 결과
        </h2>
        <div className="text-4xl font-bold text-blue-600 mb-4">
          {lifeExpectancy} 년
        </div>
        <p className="text-gray-600">
          입력하신 정보를 바탕으로 계산된 예상 수명입니다.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          건강 요소 분석
        </h3>
        <div className="h-80">
          <Radar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          수명에 영향을 주는 주요 요인
        </h3>
        <ul className="space-y-2">
          {Object.entries(factors).map(([factor, value]) => (
            <li key={factor} className="flex items-center justify-between">
              <span className="text-gray-700">{factor}</span>
              <span className={`font-medium ${
                value > 0 ? 'text-green-600' :
                value < 0 ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {value > 0 ? '긍정적' :
                 value < 0 ? '부정적' :
                 '중립적'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          건강 관리 조언
        </h3>
        <p className="text-blue-800">
          정기적인 운동과 균형 잡힌 식사, 스트레스 관리가 수명 연장에 중요한 역할을 합니다.
          특히 예방접종과 정기검진을 통한 건강관리가 필수적입니다.
        </p>
      </div>
    </div>
  );
};