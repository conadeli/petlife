import React from 'react';

interface AdvertisementProps {
  type: 'banner' | 'square';
  className?: string;
  slot?: string;
  variant?: 'google' | 'coupang' | 'custom';
}

export const Advertisement: React.FC<AdvertisementProps> = ({
  type,
  className = '',
  slot,
  variant = 'custom',
}) => {
  // ✅ Google AdSense 광고
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

  // ✅ Custom 기본 광고
  const renderCustomAd = () => {
    return (
      <div
        className={`
          flex items-center justify-center
          ${type === 'banner' ? 'h-[90px] w-[728px]' : 'h-[250px] w-[300px]'}
          bg-gradient-to-r from-blue-50 to-blue-100
          border border-blue-200 rounded-lg
          p-4
        `}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            맞춤형 광고 영역
          </h3>
          <p className="text-sm text-blue-600">
            {type === 'banner' ? '728x90 배너 광고' : '300x250 사각형 광고'}
          </p>
        </div>
      </div>
    );
  };

  // ✅ 흔들림 애니메이션이 적용된 쿠팡 광고
  const renderCoupangAd = () => {
    const imageUrl =
      type === 'banner'
        ? '/coupang-banner-728x90.png'
        : '/coupang-square-300x250.png';

    const coupangLink = 'https://link.coupang.com/a/cmW20x';

    return (
      <a
        href={coupangLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          block border rounded-lg overflow-hidden shadow
          ${type === 'banner' ? 'w-[728px] h-[90px]' : 'w-[300px] h-[250px]'}
          animate-wiggle
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

  // ✅ 렌더링 분기
  const renderAd = () => {
    if (variant === 'google' && slot) return renderGoogleAd();
    if (variant === 'coupang') return renderCoupangAd();
    return renderCustomAd();
  };

  return <div className={`ad-container ${className}`}>{renderAd()}</div>;
};
