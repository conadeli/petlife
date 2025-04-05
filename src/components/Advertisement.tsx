import React from 'react';

interface AdvertisementProps {
  type: 'banner' | 'square';
  className?: string;
  slot?: string;
  variant?: 'google' | 'coupang' | 'custom'; // ⭐️ 광고 유형 선택
}

export const Advertisement: React.FC<AdvertisementProps> = ({
  type,
  className = '',
  slot,
  variant = 'custom', // 기본값은 custom 광고
}) => {
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

  // 커스텀 광고
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

  // ✅ 쿠팡 파트너스 광고 배너
  const renderCoupangAd = () => {
    const imageUrl =
      type === 'banner'
        ? '/ads/coupang-banner-728x90.png'
        : '/ads/coupang-square-300x250.png';

    const coupangLink = 'https://link.coupang.com/a/cmW20x';

    return (
      <a
        href={coupangLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          block border rounded-lg overflow-hidden shadow
          ${type === 'banner' ? 'w-[728px] h-[90px]' : 'w-[300px] h-[250px]'}
        `}
      >
        <img
          src={imageUrl}
          alt="쿠팡 광고 배너"
          className="w-full h-full object-cover"
        />
      </a>
    );
  };

  // 렌더링 조건 분기
  const renderAd = () => {
    if (variant === 'google' && slot) return renderGoogleAd();
    if (variant === 'coupang') return renderCoupangAd();
    return renderCustomAd();
  };

  return (
    <div className={`ad-container ${className}`}>
      {renderAd()}
    </div>
  );
};
