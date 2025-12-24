import React from 'react';

interface AnalysisViewProps {
  onBack: () => void;
  onNavigateToWeather: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ onBack, onNavigateToWeather }) => {
  return (
    <div className="bg-background-page dark:bg-background-page-dark min-h-screen flex flex-col font-display text-text-primary dark:text-text-primary-dark pb-24">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-page/90 dark:bg-background-page-dark/90 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">團隊深度交叉分析</h1>
        <button className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">more_vert</span>
        </button>
      </header>
      
      {/* Banner to Weather Station */}
      <div className="px-4 py-2">
        <button 
          onClick={onNavigateToWeather}
          className="w-full bg-gradient-to-r from-weather-bg-dark to-[#2a3627] text-white p-4 rounded-2xl shadow-lg border border-weather-primary/30 flex items-center justify-between group overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-weather-primary/20 rounded-full blur-xl"></div>
          <div className="flex items-center gap-3 relative z-10">
             <div className="w-10 h-10 rounded-full bg-weather-primary/20 flex items-center justify-center text-weather-primary">
               <span className="material-symbols-outlined animate-pulse">thunderstorm</span>
             </div>
             <div className="text-left">
               <p className="text-xs font-medium text-weather-text-sec">NEW! 戰情中心</p>
               <h3 className="font-bold text-lg">團隊氣象站</h3>
             </div>
          </div>
          <span className="material-symbols-outlined text-weather-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>

      {/* Filters (Chips) */}
      <div className="w-full overflow-x-auto no-scrollbar py-2">
        <div className="flex gap-3 px-4 min-w-max">
          <button className="group flex h-9 items-center justify-center gap-x-2 rounded-full bg-surface-card dark:bg-surface-card-dark border border-border-light dark:border-border-dark pl-4 pr-3 hover:border-primary transition-colors">
            <span className="text-sm font-medium leading-normal text-text-secondary dark:text-text-secondary-dark">部門: 研發部</span>
            <span className="material-symbols-outlined text-lg text-text-secondary dark:text-text-secondary-dark group-hover:text-primary">keyboard_arrow_down</span>
          </button>
          <button className="group flex h-9 items-center justify-center gap-x-2 rounded-full bg-surface-card dark:bg-surface-card-dark border border-border-light dark:border-border-dark pl-4 pr-3 hover:border-primary transition-colors">
            <span className="text-sm font-medium leading-normal text-text-secondary dark:text-text-secondary-dark">時間: 本季</span>
            <span className="material-symbols-outlined text-lg text-text-secondary dark:text-text-secondary-dark group-hover:text-primary">keyboard_arrow_down</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 px-4 py-4">
        {/* Card 1 */}
        <div className="flex flex-col justify-between rounded-xl bg-surface-card dark:bg-surface-card-dark p-5 shadow-card dark:shadow-none border border-border-light dark:border-border-dark">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">新進人員<br />留存率</p>
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-status-warning dark:text-status-warning-dark text-lg">trending_down</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark">85%</p>
            <p className="text-status-warning dark:text-status-warning-dark text-sm font-medium mt-1">-5% 較上季</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col justify-between rounded-xl bg-surface-card dark:bg-surface-card-dark p-5 shadow-card dark:shadow-none border border-border-light dark:border-border-dark">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">資深員工<br />稼動率</p>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary dark:text-primary-dark text-lg">trending_up</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark">110%</p>
            <p className="text-primary dark:text-primary-dark text-sm font-medium mt-1">+12% 過勞風險</p>
          </div>
        </div>
      </div>
      
      {/* Detailed Insights List (Placeholder for brevity, can keep full list from previous) */}
       <div className="flex-1 rounded-t-3xl bg-surface-card dark:bg-surface-card-dark mt-2 border-t border-border-light dark:border-border-dark">
        <div className="px-6 py-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-primary dark:text-text-primary-dark">
            異常關注清單
            <span className="flex items-center justify-center bg-status-warning dark:bg-status-warning-dark text-white text-[10px] h-5 min-w-5 px-1.5 rounded-full">3</span>
          </h3>
          {/* List items would go here */}
          <div className="text-center py-4 text-text-secondary dark:text-text-secondary-dark">
            點擊上方 "團隊氣象站" 查看更多詳情
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalysisView;