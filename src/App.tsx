import React, { useState } from 'react';
import { DogForm } from './components/DogForm';
import { DogResult } from './components/DogResult';
import { DogFormData } from './types/dog';
import { Dog, Heart, Calendar, Brain, Activity, Apple } from 'lucide-react';
import { Advertisement } from './components/Advertisement';
import { Modal } from './components/Modal';

function App() {
  const [result, setResult] = useState<DogFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingResult, setPendingResult] = useState<DogFormData | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleFormSubmit = (data: DogFormData) => {
    setPendingResult(data);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (pendingResult) {
      setResult(pendingResult);
      setShowResult(true);
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Modal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Dog className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">강아지 수명 계산기</h1>
          </div>
          <p className="mt-2 text-center text-gray-600">
            강아지의 정보를 입력하고 맞춤형 기대 수명을 알아보세요!
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="bg-white shadow sm:rounded-lg p-6">
                <DogForm onSubmit={handleFormSubmit} />
              </div>
            </div>
            {showResult && result && (
              <div className="flex-1">
                <div className="bg-white shadow sm:rounded-lg p-6">
                  <DogResult data={result} />
                </div>
              </div>
            )}
          </div>

          {/* 수명 계산기와 건강 정보 사이의 광고 영역 */}
          <div className="my-8 flex justify-center">
            <Advertisement type="banner" variant="coupang" className="hidden md:block" />
            <Advertisement type="square" variant="coupang" className="md:hidden" />
          </div>
        </div>
      </main>

      <section className="bg-white mt-8">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8">
            <article className="prose prose-blue max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                반려견 건강과 장수를 위한 종합 가이드
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Heart className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-xl font-semibold">반려견 수명에 영향을 미치는 주요 요인</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>유전적 요인과 품종별 특성</li>
                    <li>식습관과 영양 관리</li>
                    <li>운동량과 신체 활동</li>
                    <li>정기적인 건강검진</li>
                    <li>스트레스 관리와 정서적 안정</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-green-500 mr-2" />
                    <h3 className="text-xl font-semibold">연령대별 건강관리 포인트</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>퍼피 (1세 미만): 예방접종, 사회화 훈련</li>
                    <li>성견 (1-7세): 정기검진, 치아관리</li>
                    <li>노령견 (7세 이상): 관절관리, 영양보충</li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Brain className="h-6 w-6 text-purple-500 mr-2" />
                  <h3 className="text-2xl font-bold">반려견 건강관리의 핵심 요소</h3>
                </div>
                
                <h4 className="text-xl font-semibold mb-4">1. 균형 잡힌 영양 관리</h4>
                <p className="mb-6">
                  반려견의 건강한 수명을 위해서는 연령, 크기, 활동량에 맞는 적절한 영양 공급이 필수적입니다.
                  고품질 단백질, 필수 지방산, 비타민, 미네랄이 균형있게 포함된 식단을 제공해야 합니다.
                </p>

                <h4 className="text-xl font-semibold mb-4">2. 적절한 운동과 활동</h4>
                <p className="mb-6">
                  규칙적인 운동은 비만 예방, 근력 강화, 심혈관 건강 증진에 도움을 줍니다.
                  품종과 나이에 맞는 운동량을 설정하고, 매일 일정 시간 산책하는 것이 좋습니다.
                </p>

                <h4 className="text-xl font-semibold mb-4">3. 정기적인 건강검진</h4>
                <p className="mb-6">
                  연 1회 이상의 정기검진을 통해 잠재적 건강 문제를 조기에 발견하고 예방할 수 있습니다.
                  특히 중성화 수술, 예방접종, 구충제 투여는 수의사와 상담 후 적절히 시행해야 합니다.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg mb-12">
                <div className="flex items-center mb-4">
                  <Activity className="h-6 w-6 text-yellow-600 mr-2" />
                  <h3 className="text-xl font-semibold">품종별 주의해야 할 건강 문제</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">소형견</h4>
                    <ul className="list-disc pl-5">
                      <li>치아 문제</li>
                      <li>슬개골 탈구</li>
                      <li>기관지 질환</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">대형견</h4>
                    <ul className="list-disc pl-5">
                      <li>고관절 이형성증</li>
                      <li>관절염</li>
                      <li>심장 질환</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Apple className="h-6 w-6 text-red-500 mr-2" />
                  <h3 className="text-2xl font-bold">반려견 수명 연장을 위한 생활 수칙</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">일상적인 관리</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>정기적인 브러싱과 그루밍</li>
                      <li>치아 관리와 스케일링</li>
                      <li>적절한 실내 온도 유지</li>
                      <li>스트레스 없는 환경 조성</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">건강 모니터링</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>정기적인 체중 측정</li>
                      <li>식욕과 배변 상태 관찰</li>
                      <li>피부와 털 상태 체크</li>
                      <li>행동 변화 주시</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">결론</h3>
                <p>
                  반려견의 수명은 유전적 요인뿐만 아니라 일상적인 관리와 케어에 따라 크게 달라질 수 있습니다.
                  위의 가이드라인을 참고하여 반려견의 건강을 관리하면 더 오랫동안 건강하고 행복한 생활을 함께 할 수 있습니다.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
