import React from 'react';

interface Option {
  id: string;
  label: string;
}

interface SubNavigationProps {
  options: Option[];
  activeId: string;
  onChange: (id: string) => void;
  colorTheme?: 'green' | 'blue' | 'orange';
}

const SubNavigation: React.FC<SubNavigationProps> = ({ options, activeId, onChange, colorTheme = 'green' }) => {
  let activeBg = 'bg-brand-green text-white shadow-glow';
  if (colorTheme === 'blue') activeBg = 'bg-primary text-white shadow-lg shadow-primary/30';
  if (colorTheme === 'orange') activeBg = 'bg-[#FF9800] text-white shadow-lg shadow-orange-500/30';

  const inactiveBg = 'bg-transparent text-text-secondary dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5';

  return (
    <div className="bg-surface-card dark:bg-surface-card-dark p-1 rounded-xl border border-border-light dark:border-border-dark flex relative">
      {options.map((opt) => {
        const isActive = activeId === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 relative z-10 ${
              isActive ? activeBg : inactiveBg
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default SubNavigation;