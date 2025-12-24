
import React, { useMemo, useState } from 'react';
import { Role } from '../types';

interface WarRoomAnalysisProps {
  role: Role;
  deptId: string;
  deptName: string;
  selectedDate: string; // Used to seed the forecast start date
}

interface ForecastCell {
  date: string;
  dayLabel: string;
  value: number; // percentage
  headcount: number;
  confirmedLeave: { name: string; type: string }[];
  predictedAbsence: number; // count
}

interface ForecastRow {
  id: string;
  name: string;
  data: ForecastCell[];
}

const WarRoomAnalysis: React.FC<WarRoomAnalysisProps> = ({ role, deptId, deptName, selectedDate }) => {
  const [forecastDimension, setForecastDimension] = useState<'dept' | 'job'>('dept');
  const [selectedCell, setSelectedCell] = useState<{ rowName: string; cell: ForecastCell } | null>(null);

  // Generate Mock Data for Next 7 Days
  const forecastData: ForecastRow[] = useMemo(() => {
    const days = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
    const today = new Date(selectedDate);
    
    // Helper to generate a row of data
    const generateRowData = (baseValue: number, volatility: number): ForecastCell[] => {
      return days.map((day, index) => {
        const dateObj = new Date(today);
        dateObj.setDate(today.getDate() + index + 1); // Future dates
        const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
        
        // Random fluctuation
        const randomDrop = Math.floor(Math.random() * volatility);
        // Simulate "Friday" dip or random dips
        const value = Math.max(60, Math.min(100, baseValue - randomDrop - (index === 4 ? 5 : 0)));
        
        const headcount = 20;
        const absentCount = Math.round(headcount * (1 - value / 100));
        const predicted = Math.floor(absentCount * 0.3); // 30% of absence is predicted/unplanned
        const confirmedCount = absentCount - predicted;

        const names = ['陳小明', '林美玲', '張偉', '黃怡君', '李志強', '王淑芬'];
        const types = ['特休', '事假', '補休', '公出'];
        const confirmedLeave = Array.from({ length: confirmedCount }, (_, i) => ({
          name: names[i % names.length],
          type: types[i % types.length]
        }));

        return {
          date: dateStr,
          dayLabel: day,
          value,
          headcount,
          confirmedLeave,
          predictedAbsence: predicted
        };
      });
    };

    const deptRows: ForecastRow[] = [
      { id: 'rd1', name: '研發一部', data: generateRowData(95, 10) },
      { id: 'rd2', name: '研發二部', data: generateRowData(92, 12) },
      { id: 'sales', name: '業務一課', data: generateRowData(88, 20) }, // Higher volatility
      { id: 'cs', name: '客服中心', data: generateRowData(85, 15) },
      { id: 'admin', name: '管理部', data: generateRowData(98, 5) },
    ];

    const jobRows: ForecastRow[] = [
      { id: 'mgr', name: '經理級', data: generateRowData(98, 5) },
      { id: 'sen', name: '資深人員', data: generateRowData(90, 15) }, // Seniors might be busy/leave
      { id: 'jun', name: '初階人員', data: generateRowData(95, 8) },
      { id: 'int', name: '實習生', data: generateRowData(80, 20) },
    ];

    let source = forecastDimension === 'dept' ? deptRows : jobRows;

    // Filter Logic based on Role/DeptId
    if (role === 'manager' && forecastDimension === 'dept') {
      // If manager views depts, maybe only show their own or related? 
      // Spec says: Manager view defaults to 'Job Level' usually, but if they toggle to dept, show their dept.
      if (deptId !== 'all') {
         source = source.filter(r => r.name.includes(deptName) || r.id === deptId || (deptId.startsWith('rd') && r.id.startsWith('rd')));
         if (source.length === 0) source = [deptRows[0]]; // Fallback mock
      }
    }

    return source;
  }, [selectedDate, forecastDimension, role, deptId, deptName]);

  const getStatusColor = (val: number) => {
    if (val >= 92) return 'bg-brand-green';
    if (val >= 80) return 'bg-status-warning';
    return 'bg-status-danger';
  };

  const getTextColor = (val: number) => {
    return 'text-white';
  };

  // Find the highest risk for the banner
  const highRiskItem = useMemo(() => {
    let lowestVal = 100;
    let riskInfo = null;
    forecastData.forEach(row => {
      row.data.forEach(cell => {
        if (cell.value < lowestVal) {
          lowestVal = cell.value;
          riskInfo = { name: row.name, date: cell.date, val: cell.value };
        }
      });
    });
    return riskInfo;
  }, [forecastData]);

  return (
    <div className="px-4 py-4 space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-2">
      
      {/* 1. Risk Insight Banner */}
      {highRiskItem && highRiskItem.val < 85 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
          <div className="bg-status-danger text-white p-2 rounded-full shrink-0 animate-pulse">
            <span className="material-symbols-outlined text-xl">warning</span>
          </div>
          <div>
            <h3 className="text-status-danger font-bold text-sm mb-1">嚴重人力缺口預警</h3>
            <p className="text-xs text-text-primary dark:text-gray-300 leading-relaxed">
              預測顯示 <span className="font-bold">{highRiskItem.date} ({highRiskItem.name})</span> 戰力恐低於 <span className="font-black text-status-danger">{highRiskItem.val}%</span>。
              建議立即協調支援人力。
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] font-bold text-text-secondary bg-white dark:bg-black/20 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/30">
                AI 信心度: 92%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Forecast Matrix */}
      <section className="bg-surface-card dark:bg-[#1E1E1E] rounded-3xl p-5 shadow-card border border-border-light dark:border-white/10">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-text-primary dark:text-white text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">cloud_sync</span>
                未來戰力氣象台
              </h3>
              <p className="text-[10px] text-text-secondary dark:text-gray-400 font-bold mt-1">
                預測區間: {forecastData[0]?.data[0]?.date} - {forecastData[0]?.data[6]?.date} (未來7天)
              </p>
            </div>
            
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10">
              <button 
                onClick={() => setForecastDimension('dept')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${forecastDimension === 'dept' ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400'}`}
              >
                部門
              </button>
              <button 
                onClick={() => setForecastDimension('job')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${forecastDimension === 'job' ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400'}`}
              >
                職務
              </button>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar -mx-5 px-5">
          <table className="w-full border-separate border-spacing-y-2 border-spacing-x-1 min-w-[400px]">
            <thead>
              <tr className="text-text-secondary dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="pb-2 text-left w-24 sticky left-0 bg-surface-card dark:bg-[#1E1E1E] z-10">對象</th>
                {forecastData[0]?.data.map((cell, idx) => (
                  <th key={idx} className="pb-2 min-w-[44px]">
                    <div className="flex flex-col items-center">
                       <span>{cell.dayLabel}</span>
                       <span className="text-[9px] opacity-70">{cell.date}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forecastData.map((row) => (
                <tr key={row.id} className="group">
                  <td className="text-text-primary dark:text-white font-bold text-xs text-left align-middle py-1 sticky left-0 bg-surface-card dark:bg-[#1E1E1E] z-10 border-r border-transparent group-hover:border-gray-100 dark:group-hover:border-white/5 transition-colors">
                    {row.name}
                  </td>
                  {row.data.map((cell, idx) => (
                    <td key={idx} className="py-0">
                      <button 
                        onClick={() => setSelectedCell({ rowName: row.name, cell })}
                        className={`w-full h-10 rounded-lg shadow-sm flex items-center justify-center transition-transform active:scale-95 ${getStatusColor(cell.value)}`}
                      >
                        <span className={`${getTextColor(cell.value)} font-black text-xs`}>
                          {cell.value}
                        </span>
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-end gap-3 text-[10px] font-bold text-text-secondary dark:text-gray-400">
           <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-brand-green"></div> 充足 (≧92%)
           </div>
           <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-status-warning"></div> 注意 (80-91%)
           </div>
           <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-status-danger"></div> 危險 (&lt;80%)
           </div>
        </div>
      </section>

      {/* 3. Detail Modal */}
      {selectedCell && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCell(null)}></div>
          <div className="relative w-full max-w-sm bg-white dark:bg-[#1E1E1E] rounded-[24px] shadow-2xl p-6 flex flex-col animate-in zoom-in-95">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-lg font-bold text-text-primary dark:text-white">
                     {selectedCell.rowName}
                   </h3>
                   <p className="text-xs font-bold text-text-secondary dark:text-gray-400">
                     {selectedCell.cell.date} {selectedCell.cell.dayLabel} 戰力預測詳情
                   </p>
                </div>
                <div className={`px-3 py-1 rounded-lg text-lg font-black text-white ${getStatusColor(selectedCell.cell.value)}`}>
                   {selectedCell.cell.value}%
                </div>
             </div>

             <div className="space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2">
                   <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl text-center">
                      <p className="text-[10px] text-text-secondary font-bold">應到人數</p>
                      <p className="text-base font-black text-text-primary dark:text-white">{selectedCell.cell.headcount}</p>
                   </div>
                   <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl text-center">
                      <p className="text-[10px] text-status-danger font-bold">確定缺勤</p>
                      <p className="text-base font-black text-status-danger">{selectedCell.cell.confirmedLeave.length}</p>
                   </div>
                   <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-xl text-center">
                      <p className="text-[10px] text-status-warning font-bold">AI 預測缺</p>
                      <p className="text-base font-black text-status-warning">{selectedCell.cell.predictedAbsence}</p>
                   </div>
                </div>

                {/* Confirmed List */}
                <div>
                   <h4 className="text-xs font-bold text-text-primary dark:text-white mb-2 flex items-center gap-1">
                     <span className="material-symbols-outlined text-sm">event_busy</span>
                     已核准請假 ({selectedCell.cell.confirmedLeave.length})
                   </h4>
                   {selectedCell.cell.confirmedLeave.length > 0 ? (
                     <div className="space-y-2">
                        {selectedCell.cell.confirmedLeave.map((l, i) => (
                           <div key={i} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-xs">
                              <span className="font-bold text-text-primary dark:text-gray-300">{l.name}</span>
                              <span className="px-2 py-0.5 bg-gray-200 dark:bg-white/10 rounded text-[10px] font-medium text-text-secondary dark:text-gray-400">{l.type}</span>
                           </div>
                        ))}
                     </div>
                   ) : (
                     <p className="text-xs text-gray-400 italic">無核准請假紀錄</p>
                   )}
                </div>

                {/* Predicted Insight */}
                {selectedCell.cell.predictedAbsence > 0 && (
                   <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl border border-orange-100 dark:border-orange-900/30">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="material-symbols-outlined text-status-warning text-sm">auto_awesome</span>
                         <h4 className="text-xs font-bold text-status-warning">AI 風險洞察</h4>
                      </div>
                      <p className="text-[10px] text-text-secondary dark:text-gray-400 leading-relaxed">
                         根據歷史數據，該部門在{selectedCell.cell.dayLabel}的臨時病假/事假機率較高（約 {selectedCell.cell.predictedAbsence} 人）。建議預留備援人力。
                      </p>
                   </div>
                )}
             </div>

             <button 
               onClick={() => setSelectedCell(null)}
               className="mt-6 w-full py-3 bg-gray-100 dark:bg-white/10 rounded-xl text-sm font-bold text-text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
             >
               關閉
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarRoomAnalysis;
