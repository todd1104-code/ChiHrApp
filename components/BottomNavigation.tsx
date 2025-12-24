import React from 'react';

interface BottomNavigationProps {
  currentTab: 'war_room' | 'management' | 'care';
  onTabChange: (tab: 'war_room' | 'management' | 'care') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'war_room', icon: 'analytics', label: '戰情' },
    { id: 'management', icon: 'groups', label: '團隊動態' },
    { id: 'care', icon: 'volunteer_activism', label: '關懷' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-card dark:bg-surface-card-dark border-t border-border-light dark:border-border-dark pb-safe z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className="flex flex-col items-center justify-center w-full h-full group active:scale-95 transition-all"
            >
              <div className={`rounded-full px-5 py-1 mb-0.5 transition-colors duration-300 ${isActive ? 'bg-brand-green/10 dark:bg-primary/20' : 'bg-transparent'}`}>
                <span 
                  className={`material-symbols-outlined text-[26px] transition-colors duration-300 ${
                    isActive ? 'text-brand-green dark:text-primary' : 'text-text-secondary dark:text-text-secondary-dark group-hover:text-text-primary'
                  }`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
              </div>
              <span 
                className={`text-[11px] font-bold transition-colors duration-300 ${
                  isActive ? 'text-brand-green dark:text-primary' : 'text-text-secondary dark:text-text-secondary-dark'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;