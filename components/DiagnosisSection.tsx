import React from 'react';
import { DiagnosisItem } from '../types';

interface DiagnosisSectionProps {
  items: DiagnosisItem[];
}

const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ items }) => {
  return (
    <div className="px-4 mb-8">
      <h3 className="text-text-primary text-lg font-bold mb-3 px-1">產能流失診斷</h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`flex-1 min-w-[260px] bg-surface-light rounded-xl p-5 border relative group overflow-hidden ${
              item.type === 'emergency' ? 'border-accent-red/20' : 'border-accent-blue/20'
            }`}
          >
            {/* Background Icon Watermark */}
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <span className={`material-symbols-outlined text-6xl ${item.colorClass}`}>
                {item.type === 'emergency' ? 'emergency_home' : 'calendar_month'}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className={`${item.iconBgClass} p-1.5 rounded-lg flex items-center justify-center`}>
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              </div>
              <span className={`${item.colorClass} font-bold text-sm tracking-wide`}>{item.title}</span>
            </div>

            <div className="mt-2">
              <p className="text-3xl font-bold text-text-primary mb-1">
                {item.count} <span className="text-sm font-normal text-text-secondary">{item.countUnit}</span>
              </p>
              <p className="text-text-secondary text-xs">{item.reason}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="text-[10px] text-text-secondary">產能衝擊: {item.impactLevel}</span>
              <span className={`text-xs font-bold ${item.colorClass}`}>{item.impactValue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisSection;