import React, { useRef } from 'react';
import { Department, Role } from '../types';

interface DepartmentSelectorProps {
  departments: Department[];
  selectedId: string;
  onSelect: (id: string) => void;
  // Stats Mode Props
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  selectedQuarter?: string;
  onQuarterChange?: (q: string) => void;
  timeMode: 'month' | 'year' | 'quarter';
  onTimeModeChange: (mode: 'month' | 'year' | 'quarter') => void;
  // Schedule Mode Props
  selectorMode?: 'stats' | 'schedule';
  scheduleRange?: 'today' | 'tomorrow' | 'specific';
  onScheduleRangeChange?: (range: 'today' | 'tomorrow' | 'specific') => void;
  specificDate?: string;
  onSpecificDateChange?: (date: string) => void;
  role: Role;
}

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ 
  departments, 
  selectedId, 
  onSelect, 
  selectedDate,
  onDateChange,
  selectedYear,
  onYearChange,
  selectedQuarter,
  onQuarterChange,
  timeMode,
  onTimeModeChange,
  selectorMode = 'stats',
  scheduleRange = 'today',
  onScheduleRangeChange,
  specificDate,
  onSpecificDateChange,
  role 
}) => {
  const selectedDept = departments.find(d => d.id === selectedId) || departments[0];
  const monthInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handlePickerClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      try {
        if ('showPicker' in ref.current) {
          (ref.current as any).showPicker();
        } else {
          ref.current.focus();
          ref.current.click();
        }
      } catch (e) {
        ref.current.focus();
        ref.current.click();
      }
    }
  };

  return (
    <div className="px-4 py-2 flex gap-2 h-[68px]">
      {/* Department Selector */}
      <div className="relative flex-1">
        <div className={`
          flex items-center justify-between w-full px-3 py-3 rounded-xl border transition-all h-full
          ${role === 'manager' 
            ? 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-80' 
            : 'bg-surface-card dark:bg-surface-card-dark border-brand-green/30 dark:border-primary/30 shadow-sm cursor-pointer hover:border-brand-green dark:hover:border-primary'
          }
        `}>
          <div className="flex items-center gap-2 overflow-hidden">
             <div className={`p-1.5 rounded-lg shrink-0 ${role === 'gm' ? 'bg-brand-green/10 text-brand-green dark:bg-primary/20 dark:text-primary' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
               <span className="material-symbols-outlined text-lg">
                 {selectedId === 'all' ? 'domain' : 'diversity_3'}
               </span>
             </div>
             <div className="flex flex-col truncate">
                <span className="text-[10px] font-bold text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
                  {role === 'gm' ? '總經理視角' : '部門主管'}
                </span>
                <span className="text-sm font-bold text-text-primary dark:text-text-primary-dark truncate">
                  {selectedId === 'all' ? '全公司總覽' : selectedDept?.name}
                </span>
             </div>
          </div>
          
          {role === 'gm' && (
            <span className="material-symbols-outlined text-text-secondary dark:text-text-secondary-dark">expand_more</span>
          )}
        </div>

        {role === 'gm' && (
          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            value={selectedId}
            onChange={(e) => onSelect(e.target.value)}
          >
            <option value="all">全公司總覽 (All)</option>
            <optgroup label="部門列表">
              {departments.filter(d => d.id !== 'all').map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </optgroup>
          </select>
        )}
      </div>

      {/* Right Side Date Selector */}
      <div className={`relative ${selectorMode === 'stats' ? 'w-[180px]' : 'w-1/2 min-w-[160px]'}`}>
        
        {selectorMode === 'stats' ? (
          <div className="flex flex-col h-full bg-surface-card dark:bg-surface-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden z-0">
            <div className="flex border-b border-border-light dark:border-border-dark">
              <button 
                onClick={(e) => { e.stopPropagation(); onTimeModeChange('month'); }}
                className={`flex-1 py-1 text-[9px] font-bold transition-colors ${timeMode === 'month' ? 'bg-primary/10 text-primary' : 'text-text-secondary'}`}
              >
                月
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onTimeModeChange('quarter'); }}
                className={`flex-1 py-1 text-[9px] font-bold transition-colors ${timeMode === 'quarter' ? 'bg-primary/10 text-primary' : 'text-text-secondary border-l border-border-light dark:border-border-dark'}`}
              >
                季
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onTimeModeChange('year'); }}
                className={`flex-1 py-1 text-[9px] font-bold transition-colors ${timeMode === 'year' ? 'bg-primary/10 text-primary' : 'text-text-secondary border-l border-border-light dark:border-border-dark'}`}
              >
                年
              </button>
            </div>
            
            <div 
              className="relative flex-1 flex items-center justify-center gap-1 px-1 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={() => {
                if (timeMode === 'month') handlePickerClick(monthInputRef);
              }}
            >
               <span className="material-symbols-outlined text-text-secondary text-sm">
                 {timeMode === 'month' ? 'calendar_month' : 'event_note'}
               </span>
               <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark">
                 {timeMode === 'month' ? selectedDate : (timeMode === 'quarter' ? `${selectedYear} ${selectedQuarter}` : `${selectedYear} 年`)}
               </span>

               {timeMode === 'month' && (
                 <input 
                   ref={monthInputRef}
                   type="month" 
                   value={selectedDate}
                   onChange={(e) => onDateChange(e.target.value)}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                 />
               )}
               {timeMode === 'quarter' && (
                 <div className="absolute inset-0 flex">
                   <select 
                     value={selectedYear}
                     onChange={(e) => onYearChange(e.target.value)}
                     className="w-1/2 h-full opacity-0 cursor-pointer z-30"
                   >
                     {[2025, 2024, 2023].map(y => <option key={y} value={y}>{y} 年</option>)}
                   </select>
                   <select 
                     value={selectedQuarter}
                     onChange={(e) => onQuarterChange?.(e.target.value)}
                     className="w-1/2 h-full opacity-0 cursor-pointer z-30"
                   >
                     {['Q1', 'Q2', 'Q3', 'Q4'].map(q => <option key={q} value={q}>{q}</option>)}
                   </select>
                 </div>
               )}
               {timeMode === 'year' && (
                 <select 
                   value={selectedYear}
                   onChange={(e) => onYearChange(e.target.value)}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                 >
                   {[2025, 2024, 2023].map(y => <option key={y} value={y}>{y} 年</option>)}
                 </select>
               )}
            </div>
          </div>
        ) : (
          /* --- SCHEDULE MODE (Management) --- */
          <div className="flex flex-col h-full bg-surface-card dark:bg-surface-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden p-1 gap-1">
             <div className="flex w-full gap-1 h-6 shrink-0">
               <button
                 onClick={(e) => { e.stopPropagation(); onScheduleRangeChange?.('today'); }}
                 className={`flex-1 rounded py-0.5 text-[9px] font-bold transition-all ${scheduleRange === 'today' ? 'bg-primary text-white' : 'text-text-secondary'}`}
               >
                 今日
               </button>
               <button
                 onClick={(e) => { e.stopPropagation(); onScheduleRangeChange?.('tomorrow'); }}
                 className={`flex-1 rounded py-0.5 text-[9px] font-bold transition-all ${scheduleRange === 'tomorrow' ? 'bg-primary text-white' : 'text-text-secondary'}`}
               >
                 明日
               </button>
               <button
                 onClick={(e) => { e.stopPropagation(); onScheduleRangeChange?.('specific'); }}
                 className={`flex-1 rounded py-0.5 text-[9px] font-bold transition-all ${scheduleRange === 'specific' ? 'bg-primary text-white' : 'text-text-secondary'}`}
               >
                 指定
               </button>
             </div>
             
             <div 
               className="relative flex-1 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
               onClick={() => handlePickerClick(dateInputRef)}
             >
               <span className="text-[10px] font-bold text-text-primary dark:text-text-primary-dark">
                 {scheduleRange === 'specific' ? specificDate : (scheduleRange === 'today' ? '2024-10-24' : '2024-10-25')}
               </span>
               <input 
                 ref={dateInputRef}
                 type="date"
                 value={specificDate}
                 onChange={(e) => onSpecificDateChange?.(e.target.value)}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
               />
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DepartmentSelector;