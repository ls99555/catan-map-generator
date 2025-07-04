interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
}

export function AdBanner({ position }: AdBannerProps) {
  // This is a placeholder for ad integration
  // In a real app, you would integrate with Google AdSense, Media.net, etc.
  
  const adStyles = {
    top: 'h-20 bg-gradient-to-r from-blue-100 to-green-100',
    bottom: 'h-24 bg-gradient-to-r from-green-100 to-blue-100',
    sidebar: 'h-64 bg-gradient-to-b from-blue-100 to-green-100'
  };

  return (
    <div className={`${adStyles[position]} flex items-center justify-center border border-gray-200 rounded-lg mx-4 my-2`}>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Advertisement</p>
        <p className="text-xs text-gray-500">
          {position === 'top' ? '728x90 Leaderboard' : position === 'bottom' ? '728x90 Banner' : '300x250 Rectangle'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Ad space available for monetization
        </p>
      </div>
    </div>
  );
}
