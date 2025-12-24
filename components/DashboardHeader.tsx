import React from 'react';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-background-page/90 dark:bg-background-page-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-primary dark:text-text-primary-dark"
          aria-label="Settings"
        >
          <span className="material-symbols-outlined text-[26px]">settings</span>
        </button>
        <div>
          <h1 className="text-text-primary dark:text-text-primary-dark text-lg font-bold leading-tight tracking-tight text-left">團隊健康儀表板</h1>
          <p className="text-text-secondary dark:text-text-secondary-dark text-[10px] font-medium text-left">正航考勤中心 v2.5.0</p>
        </div>
      </div>
      <button className="flex items-center justify-center w-10 h-10 rounded-full border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-primary hover:text-primary transition-colors relative">
        <span className="material-symbols-outlined text-[20px]">notifications</span>
        <span className="absolute top-3 right-3 w-2 h-2 bg-accent-red rounded-full"></span>
      </button>
    </header>
  );
};

export default DashboardHeader;