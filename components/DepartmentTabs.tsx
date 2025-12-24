
import React from 'react';
import { Department } from '../types';

interface DepartmentTabsProps {
  departments: Department[];
  // Fix: Added selectedId to track the currently active department
  selectedId: string;
  onSelect: (id: string) => void;
}

const DepartmentTabs: React.FC<DepartmentTabsProps> = ({ departments, selectedId, onSelect }) => {
  return (
    <div className="px-4 py-3 overflow-x-auto no-scrollbar flex gap-2">
      {departments.map((dept) => (
        <button
          key={dept.id}
          onClick={() => onSelect(dept.id)}
          // Fix: Check if the current department ID matches the selectedId prop as 'active' property does not exist on Department type
          className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm transition-all border ${
            dept.id === selectedId
              ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20'
              : 'bg-surface-light dark:bg-white/5 border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-white/10'
          }`}
        >
          {dept.name}
        </button>
      ))}
    </div>
  );
};

export default DepartmentTabs;
