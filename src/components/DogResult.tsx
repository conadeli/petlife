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
import { calculateWeightStatus } from '../utils/weightCalculator';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const breedLifespanInfo: { [key: string]: { lifespan: number; adjustment: number } } = {
  "치와와": { lifespan: 17, adjustment: 2 },
  "포메라니안": { lifespan: 15, adjustment: 1 },
  "말티즈": { lifespan: 14, adjustment: 1 },
  "푸들 (토이)": { lifespan: 16, adjustment: 2 },
  "푸들 (미니어처)": { lifespan: 14, adjustment: 1 },
  "푸들 (스탠다드)": { lifespan: 12, adjustment: 0 },
  "시츄": { lifespan: 14, adjustment: 1 },
  "비숑 프리제": { lifespan: 14, adjustment: 1 },
  "요크셔 테리어": { lifespan: 16, adjustment: 2 },
  "프렌치 불도그": { lifespan: 11, adjustment: -1 },
  "불독": { lifespan: 9, adjustment: -2 },
  "보더 콜리": { lifespan: 14, adjustment: 1 },
  "래브라도 리트리버": { lifespan: 12, adjustment: 0 },
  "골든 리트리버": { lifespan: 12, adjustment: 0 },
  "시베리안 허스키": { lifespan: 12, adjustment: 0 },
  "도베르만 핀셔": { lifespan: 11, adjustment: -1 },
  "셰틀랜드 쉽독": { lifespan: 13, adjustment: 1 },
  "닥스훈트": { lifespan: 14, adjustment: 1 },
  "잭 러셀 테리어": { lifespan: 14, adjustment: 1 },
  "코커 스패니얼": { lifespan: 12, adjustment: 0 },
  "로트와일러": { lifespan: 9, adjustment: -2 },
  "그레이트 데인": { lifespan: 8, adjustment: -2 },
  "보스턴 테리어": { lifespan: 12, adjustment: 0 },
  "버니즈 마운틴 독": { lifespan: 8, adjustment: -2 },
  "오스트레일리언 셰퍼드": { lifespan: 12, adjustment: 0 },
  "비글": { lifespan: 12, adjustment: 0 },
  "파피용": { lifespan: 14, adjustment: 1 },
  "시바 이누": { lifespan: 13, adjustment: 1 },
  "아키타 이누": { lifespan: 12, adjustment: 0 },
  "보르조이": { lifespan: 11, adjustment: -1 },
  "차우차우": { lifespan: 11, adjustment: -1 },
  "알래스칸 말라뮤트": { lifespan: 11, adjustment: -1 },
  "사모예드": { lifespan: 12, adjustment: 0 },
  "잉글리시 스프링거 스패니얼": { lifespan: 12, adjustment: 0 },
  "웨스트 하이랜드 화이트 테리어": { lifespan: 13, adjustment: 1 },
  "그레이하운드": { lifespan: 12, adjustment: 0 },
  "샤페이": { lifespan: 11, adjustment: -1 },
  "오스트레일리언 캐틀 독": { lifespan: 12, adjustment: 0 },
  "진돗개": { lifespan: 12, adjustment: 0 },
  "삽살개": { lifespan: 12, adjustment: 0 },
  "풍산개": { lifespan: 12, adjustment: 0 },
  "토종 믹스견": { lifespan: 12, adjustment: 0 },
  "카이 이누": { lifespan: 12, adjustment: 0 },
  "킨카이 이누": { lifespan: 12, adjustment: 0 },
  "시코쿠 이누": { lifespan: 12, adjustment: 0 },
  "도사견": { lifespan: 9, adjustment: -2 },
  "페키니즈": { lifespan: 11, adjustment: -1 },
  "차이니즈 크레스티드": { lifespan: 14, adjustment: 1 },
  "믹스견 (소형)": { lifespan: 13, adjustment: 1 },
  "믹스견 (중형)": { lifespan: 12, adjustment: 0 },
  "믹스견 (대형)": { lifespan: 11, adjustment: -1 },
  "레온베르거": { lifespan: 8, adjustment: -2 },
  "아자와크": { lifespan: 12, adjustment: 0 },
  "티베탄 마스티프": { lifespan: 8, adjustment: -2 },
  "포데인코": { lifespan: 13, adjustment: 1 },
  "노르웨이 엘크하운드": { lifespan: 12, adjustment: 0 },
};

interface DogResultProps {
  data: DogFormData;
}

export const DogResult: React.FC<DogResultProps> = ({ data }) => {
  const calculateLifeExpectancy = () => {
    const breedInfo = breedLifespanInfo[data.breed];
    let baseAge = 12 + (breedInfo?.adjustment || 0);
    const averageLifespan = breedInfo?.lifespan || 12;

    const factors = calculateFactors();
    const totalAdjustment = Object.values(factors).reduce((sum, value) => sum + value, 0);

    const weightStatus = calculateWeightStatus(data.breed, data.weight, data.age);
    const weightAdjustment =
      weightStatus.status === 'underweight' ? -0.5 :
      weightStatus.status === 'overweight' ? -1.5 : 0;

    let healthAdjustment = 0;
    if (data.health === 'minor') healthAdjustment = -0.5;
    else if (data.health === 'chronic') healthAdjustment = -1.5;

    let geneticAdjustment = 0;
    if (data.genetic === 'yes') geneticAdjustment = -1.0;

    let skinAdjustment = 0;
const skinStatus = data.skinDisease?.toLowerCase().trim();
if (skinStatus === 'mild') skinAdjustment = -0.3;
else if (skinStatus === 'severe') skinAdjustment = -0.8;

    return Math.round(
      (baseAge + totalAdjustment + weightAdjustment + healthAdjustment + geneticAdjustment + skinAdjustment) * 10
    ) / 10;
  };

  const calculateFactors = () => {
    const factors: { [key: string]: number } = {
      운동: 0,
      영양: 0,
      건강관리: 0,
      스트레스: 0,
      생활환경: 0
    };

    factors.운동 = data.exercise > 300 ? 1 :
                   data.exercise > 150 ? 0.5 :
                   data.exercise < 60 ? -0.5 : 0;

    factors.영양 = data.diet === 'dog-food' ? 0.5 :
                   data.diet === 'mixed' ? 0 : -0.5;
    factors.영양 += data.supplements === 'yes' ? 0.3 : 0;

    factors.건강관리 = data.vaccination === 'regular' ? 0.5 : -0.5;
    factors.건강관리 += data.checkup === 'regular' ? 0.5 : -0.3;
    factors.건강관리 += data.dental === 'regular' ? 0.3 :
                         data.dental === 'sometimes' ? 0 : -0.3;

    factors.스트레스 = data.stress === 'low' ? 0.5 :
                      data.stress === 'medium' ? 0 : -0.5;

    factors.생활환경 = data.hygiene === 'regular' ? 0.3 : -0.3;
    factors.생활환경 += data.training === 'often' ? 0.4 :
                         data.training === 'sometimes' ? 0.2 : -0.2;

    return factors;
  };

  const factors = calculateFactors();
  const lifeExpectancy = React.useMemo(() => calculateLifeExpectancy(), [data]);

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
        angleLines: { display: true },
        suggestedMin: -1,
        suggestedMax: 1
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 광고 */}
      <div className="flex justify-center mb-6">
        <Advertisement type="banner" className="hidden md:block" />
        <Advertisement type="square" className="md:hidden" />
      </div>

      {/* 수명 결과 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">예상 수명 분석 결과</h2>
        <div className="text-4xl font-bold text-blue-600 mb-4">
          {lifeExpectancy} 년
        </div>
        <p className="text-gray-600">
          입력하신 정보를 바탕으로 계산된 예상 수명입니다.
        </p>
      </div>

      {/* 레이더 차트 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">건강 요소 분석</h3>
        <div className="h-80">
          <Radar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* 요소별 영향 */}
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

      {/* 건강 조언 */}
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
