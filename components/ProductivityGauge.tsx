import React from 'react';

const ProductivityGauge: React.FC = () => {
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="relative w-full max-w-sm aspect-square bg-surface-card dark:bg-surface-card-dark rounded-3xl p-6 shadow-card dark:shadow-none border border-border-light dark:border-border-dark flex flex-col items-center justify-center">
        
        <h2 className="text-text-secondary dark:text-text-secondary-dark text-sm font-bold mb-4">即時產能利用率</h2>
        
        <div className="relative w-56 h-56 mb-4">
          {/* Gauge Background */}
          <div className="absolute inset-0 rounded-full border-[16px] border-gray-100 dark:border-white/5"></div>
          
          {/* Gauge Value (Green) */}
          <div 
            className="absolute inset-0 rounded-full conic-gradient-gauge transition-all duration-1000"
            style={{
              '--gauge-color': '#4CAF50',
              '--gauge-percent': '92%',
              'mask': 'radial-gradient(transparent 60%, black 61%)',
              'WebkitMask': 'radial-gradient(transparent 60%, black 61%)',
              'transform': 'rotate(0deg)'
            } as React.CSSProperties}
          ></div>
          
          {/* Gray Segment */}
           <div 
            className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"
            style={{
              'mask': 'radial-gradient(transparent 60%, black 61%)',
              'WebkitMask': 'radial-gradient(transparent 60%, black 61%)',
              'clipPath': 'polygon(50% 50%, 0% 0%, 20% 0%)', 
              'transform': 'rotate(-25deg)',
              'opacity': 0.3
            } as React.CSSProperties}
          ></div>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-display font-extrabold text-text-primary dark:text-text-primary-dark tracking-tighter leading-none">
              92<span className="text-3xl text-brand-green">%</span>
            </div>
            <div className="mt-2 bg-brand-green/10 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-brand-green text-sm font-bold">trending_up</span>
              <span className="text-sm font-bold text-brand-green">+1.5%</span>
            </div>
          </div>
        </div>
        
        <p className="text-text-secondary dark:text-text-secondary-dark text-xs text-center leading-relaxed max-w-[80%]">
          目前產能維持高檔，僅 <span className="text-text-primary dark:text-text-primary-dark font-bold">12 位</span> 成員處於請假或停工狀態。
        </p>

        <div className="flex justify-between w-full mt-6 px-4">
           <div className="text-center">
             <div className="text-xs text-text-secondary dark:text-text-secondary-dark mb-1">總人數</div>
             <div className="text-xl font-bold text-text-primary dark:text-text-primary-dark">150</div>
           </div>
           <div className="text-center">
             <div className="text-xs text-brand-green mb-1">運轉中</div>
             <div className="text-xl font-bold text-brand-green">138</div>
           </div>
           <div className="text-center">
             <div className="text-xs text-status-danger mb-1">停工/異常</div>
             <div className="text-xl font-bold text-status-danger">12</div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProductivityGauge;