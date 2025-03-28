import React from 'react';

interface AdvertisementProps {
  type: 'banner' | 'square';
  className?: string;
  slot?: string;
}

export const Advertisement: React.FC<AdvertisementProps> = ({ type, className = '', slot }) => {
  // Google AdSense 광고를 위한 컴포넌트
  const renderGoogleAd = () => {
    if (!slot) return null;
    
    return (
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: type === 'banner' ? '728px' : '300px',
          height: type === 'banner' ? '90px' : '250px',
        }}
        data-ad-client="ca-pub-YOUR_CLIENT_ID"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  };

  // 커스텀 광고를 위한 컴포넌트
  const renderCustomAd = () => {
    return (
      <div className={`
        flex items-center justify-center
        ${type === 'banner' ? 'h-[90px] w-[728px]' : 'h-[250px] w-[300px]'}
        bg-gradient-to-r from-blue-50 to-blue-100
        border border-blue-200 rounded-lg
        p-4
      `}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">맞춤형 광고 영역</h3>
          <p className="text-sm text-blue-600">
            {type === 'banner' ? '728x90 배너 광고' : '300x250 사각형 광고'}
          </p>
        </div>
      </div>
    );
  };

  // 쿠팡 파트너스 광고를 위한 컴포넌트
  const renderCoupangAd = () => {
    return (
      <div className={`
        flex items-center justify-center
        ${type === 'banner' ? 'h-[90px] w-[728px]' : 'h-[250px] w-[300px]'}
        bg-gradient-to-r from-orange-50 to-orange-100
        border border-orange-200 rounded-lg
        p-4
      `}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">쿠팡 파트너스</h3>
          <p className="text-sm text-orange-600">
            {type === 'banner' ? '728x90 배너 광고' : '300x250 사각형 광고'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`ad-container ${className}`}>
      {slot ? renderGoogleAd() : renderCustomAd()}
    </div>
  );
};