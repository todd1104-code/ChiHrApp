import React from 'react';

const StatsGrid: React.FC = () => {
  return (
    <div className="px-4 mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-text-primary text-lg font-bold">團隊成員概況</h3>
        <button className="text-primary text-xs font-bold uppercase tracking-wider hover:text-text-primary transition-colors">查看詳情</button>
      </div>
      <div className="bg-surface-light rounded-xl p-4 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
          <span className="material-symbols-outlined text-text-secondary text-3xl mb-1">group</span>
          <span className="text-xs text-text-secondary">總人數</span>
          <span className="text-2xl font-bold text-text-primary">150</span>
        </div>

        <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 border border-blue-100">
          <span className="material-symbols-outlined text-primary text-3xl mb-1">person_check</span>
          <span className="text-xs text-primary">在職中</span>
          <span className="text-2xl font-bold text-primary">138</span>
        </div>

        <div className="flex flex-col items-center p-3 rounded-lg bg-red-50 border border-red-100">
          <span className="material-symbols-outlined text-accent-red text-3xl mb-1">person_off</span>
          <span className="text-xs text-accent-red">缺勤/請假</span>
          <span className="text-2xl font-bold text-accent-red">12</span>
        </div>

      </div>
    </div>
  );
};

export default StatsGrid;