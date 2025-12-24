import React, { useMemo, useState } from 'react';
import { Role } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface WarRoomAvailabilityProps {
  role: Role;
  deptId: string;
  deptName: string;
  selectedDate: string;
  timeMode: 'month' | 'quarter' | 'year';
  selectedYear: string;
  selectedQuarter: string;
}

interface UtilizationDetail {
  id: string;
  name: string;
  dept: string;
  theoretical: number;
  maintenance: number; // Planned
  breakdown: number;   // Unplanned
  utilization: number;
  status: 'Optimal' | 'High Maintenance' | 'Unreliable';
}

const WarRoomAvailability: React.FC<WarRoomAvailabilityProps> = ({ deptId, deptName, selectedDate, timeMode }) => {
  const [analysisType, setAnalysisType] = useState<'seniority' | 'job' | 'dept'>('dept');

  const seed = useMemo(() => selectedDate + deptId + timeMode, [selectedDate, deptId, timeMode]);
  
  // Requirement 5: Calculate theoretical days based on timeMode
  const theoreticalDays = useMemo(() => {
    if (timeMode === 'year') return 264; // Approx
    if (timeMode === 'quarter') return 66; // Approx
    return 22; // Month
  }, [timeMode]);

  // Generating Data based on Manufacturing Logic
  const utilData = useMemo(() => {
    const isAll = deptId === 'all';
    const rng = (s: string) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    const hash = Math.abs(rng(seed));
    
    const depts = ['研發一部', '客服中心', '業務一課', '管理部', '行銷部'];
    const names = ['王大明', '李小美', '張建國', '陳志遠', '林志豪', '趙敏', '周芷若', '張無忌'];
    
    const details: UtilizationDetail[] = Array.from({ length: 8 }, (_, i) => {
      // Scale maintenance and breakdown by time period
      const scale = timeMode === 'year' ? 12 : (timeMode === 'quarter' ? 3 : 1);
      const m = ((hash + i) % 4) * scale; 
      const b = ((hash * i) % 3 === 0 ? (hash % 3) : 0) * scale; 
      
      const actual = theoreticalDays - (m + b);
      const util = Math.max(0, (actual / theoreticalDays) * 100);
      
      let status: 'Optimal' | 'High Maintenance' | 'Unreliable' = 'Optimal';
      if (b / theoreticalDays > 0.05 || util < 90) status = 'Unreliable';
      else if (m / theoreticalDays > 0.15) status = 'High Maintenance';

      return {
        id: `EMP-${100 + i}`,
        name: names[i],
        dept: depts[i % depts.length],
        theoretical: theoreticalDays,
        maintenance: m,
        breakdown: b,
        utilization: parseFloat(util.toFixed(1)),
        status
      };
    });

    const filteredDetails = isAll ? details : details.filter(d => d.dept === deptName.split(' ')[0]);
    const avgUtil = filteredDetails.reduce((a, b) => a + b.utilization, 0) / (filteredDetails.length || 1);
    const avgBreakdown = (filteredDetails.reduce((a, b) => a + b.breakdown, 0) / (filteredDetails.length * theoreticalDays || 1)) * 100;

    return {
      details: filteredDetails,
      avgUtil: parseFloat(avgUtil.toFixed(1)),
      avgBreakdown: parseFloat(avgBreakdown.toFixed(1)),
      metrics: {
        totalPlanned: filteredDetails.reduce((a, b) => a + b.maintenance, 0),
        totalUnplanned: filteredDetails.reduce((a, b) => a + b.breakdown, 0),
      }
    };
  }, [seed, deptId, deptName, theoreticalDays, timeMode]);

  const trendData = useMemo(() => {
    const periods = timeMode === 'year' ? ['Q1', 'Q2', 'Q3', 'Q4'] : (timeMode === 'quarter' ? ['M1', 'M2', 'M3'] : ['W1', 'W2', 'W3', 'W4']);
    return periods.map((p, i) => ({
      name: p,
      current: utilData.avgUtil - 5 + Math.sin(i) * 3,
      benchmark: 92,
    }));
  }, [utilData.avgUtil, timeMode]);

  const rotation = (utilData.avgUtil / 100) * 180 - 90;

  const getAnalysisItems = () => {
    switch (analysisType) {
      case 'dept':
        return [
          { label: '業務一課', value: 98.2, color: 'bg-brand-green' },
          { label: '研發二部', value: 95.5, color: 'bg-brand-green' },
          { label: '客服中心', value: 84.1, color: 'bg-status-danger' },
          { label: '生產管理', value: 89.8, color: 'bg-status-warning' },
        ];
      case 'job':
        return [
          { label: '經理級', value: 98.5, color: 'bg-brand-green' },
          { label: '資深人員', value: 94.2, color: 'bg-brand-green' },
          { label: '一般專員', value: 85.0, color: 'bg-status-warning' },
          { label: '實習生', value: 72.5, color: 'bg-status-danger' },
        ];
      default: // seniority
        return [
          { label: '1年以下', value: 78.5, color: 'bg-status-danger' },
          { label: '1-3年', value: 88.2, color: 'bg-status-warning' },
          { label: '3-5年', value: 94.0, color: 'bg-brand-green' },
          { label: '5年以上', value: 97.5, color: 'bg-brand-green' },
        ];
    }
  };

  return (
    <div className="px-4 py-4 space-y-6 pb-32 animate-in fade-in slide-in-from-bottom-2">
      
      {/* 1. Manufacturing Core Dashboard */}
      <div className="bg-surface-card dark:bg-surface-card-dark rounded-3xl p-5 border border-border-light shadow-sm overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-text-primary dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">precision_manufacturing</span>
            人力稼動診斷報告
          </h3>
          <span className="text-[10px] font-bold text-text-secondary bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">基準：90%</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="bg-background-page dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center border border-transparent hover:border-primary/20 transition-all">
              <p className="text-[10px] font-bold text-text-secondary mb-1">平均稼動率</p>
              <p className={`text-2xl font-black ${utilData.avgUtil < 90 ? 'text-status-danger' : 'text-primary'}`}>
                {utilData.avgUtil}%
              </p>
              <div className={`mt-2 px-2 py-0.5 rounded text-[9px] font-bold ${utilData.avgUtil < 90 ? 'bg-status-danger/10 text-status-danger' : 'bg-primary/10 text-primary'}`}>
                {utilData.avgUtil < 90 ? '低於可靠水平' : '運作穩定'}
              </div>
           </div>
           <div className="bg-background-page dark:bg-white/5 rounded-2xl p-4 flex flex-col items-center border border-transparent hover:border-status-danger/20 transition-all">
              <p className="text-[10px] font-bold text-text-secondary mb-1">突發故障率</p>
              <p className={`text-2xl font-black ${utilData.avgBreakdown > 5 ? 'text-status-danger' : 'text-brand-green'}`}>
                {utilData.avgBreakdown}%
              </p>
              <div className={`mt-2 px-2 py-0.5 rounded text-[9px] font-bold ${utilData.avgBreakdown > 5 ? 'bg-status-danger/10 text-status-danger' : 'bg-brand-green/10 text-brand-green'}`}>
                {utilData.avgBreakdown > 5 ? '故障頻次過高' : '穩定度高'}
              </div>
           </div>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-1">異常狀態追蹤 (By Employee)</p>
          {utilData.details.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-background-page dark:bg-white/5 rounded-xl border border-transparent hover:border-primary/10 transition-all">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-text-primary dark:text-white">{item.name}</span>
                    <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${
                      item.status === 'Optimal' ? 'bg-brand-green/10 text-brand-green' : 
                      item.status === 'High Maintenance' ? 'bg-status-warning/10 text-status-warning' : 
                      'bg-status-danger/10 text-status-danger'
                    }`}>
                      {item.status === 'Optimal' ? '良好' : item.status === 'High Maintenance' ? '高維護' : '不穩定'}
                    </span>
                  </div>
                  <span className="text-[11px] font-black text-primary">{item.utilization}%</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] text-text-secondary">build</span>
                    <span className="text-[9px] text-text-secondary">計畫: {item.maintenance.toFixed(1)}d</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] text-status-danger">bolt</span>
                    <span className="text-[9px] text-text-secondary">故障: {item.breakdown.toFixed(1)}d</span>
                  </div>
                </div>
              </div>
              <div className="w-1.5 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0">
                <div 
                  className={`w-full rounded-full ${item.utilization > 95 ? 'bg-brand-green' : item.utilization > 90 ? 'bg-primary' : 'bg-status-danger'}`} 
                  style={{ height: `${item.utilization}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Visual Gauge Section */}
      <div className="w-full bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 shadow-lg text-white">
        <div className="relative z-10 text-center">
          <h2 className="text-sm font-bold mb-4 opacity-90">{deptName} - {timeMode === 'month' ? '月' : timeMode === 'quarter' ? '季' : '年'}實質可用產能</h2>
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-24 overflow-hidden">
               <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[18px] border-white/20"></div>
               <div 
                 className="absolute top-0 left-0 w-48 h-48 rounded-full border-[18px] border-transparent transition-all duration-1000 ease-out" 
                 style={{
                   borderTopColor: '#FFFFFF',
                   borderRightColor: utilData.avgUtil >= 50 ? '#FFFFFF' : 'transparent',
                   borderBottomColor: utilData.avgUtil >= 100 ? '#FFFFFF' : 'transparent',
                   transform: `rotate(${rotation}deg)`,
                   mask: 'radial-gradient(transparent 55%, black 56%)'
                 }}
               ></div>
               <div className="absolute inset-0 flex items-end justify-center pb-1">
                 <span className="text-4xl font-black">{utilData.avgUtil}<span className="text-xl ml-0.5">%</span></span>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-4">
             <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center">
               <span className="material-symbols-outlined text-lg mb-1">engineering</span>
               <p className="text-[9px] opacity-70">計畫性總損耗</p>
               <p className="font-bold text-sm">{utilData.metrics.totalPlanned.toFixed(1)} 天</p>
             </div>
             <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center">
               <span className="material-symbols-outlined text-lg mb-1">heart_broken</span>
               <p className="text-[9px] opacity-70">突發性總損耗</p>
               <p className="font-bold text-sm">{utilData.metrics.totalUnplanned.toFixed(1)} 天</p>
             </div>
          </div>
        </div>
      </div>

      {/* 3. Trend Chart */}
      <div className="bg-surface-card dark:bg-surface-card-dark rounded-3xl p-5 border border-border-light shadow-sm">
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">ssid_chart</span>
              稼動穩定性趨勢 ({timeMode === 'year' ? '年度' : '週期'})
            </h3>
            <span className="text-[10px] bg-gray-100 dark:bg-white/5 px-2 py-1 rounded text-gray-500">單位: %</span>
         </div>
         <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[60, 100]} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', fontSize: '12px'}} />
                  <Area type="monotone" dataKey="current" name="稼動率" stroke="#0288D1" fill="#0288D1" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="benchmark" name="平均基準" stroke="#9CA3AF" fill="transparent" strokeDasharray="4 4" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 4. Analysis Switcher (Requirement 6: Rename and Add Dept) */}
      <div className="bg-surface-card dark:bg-surface-card-dark rounded-3xl p-5 border border-border-light shadow-sm">
         <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-green text-lg">analytics</span>
              稼動結構分析
            </h3>
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
               <button 
                 onClick={() => setAnalysisType('dept')}
                 className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${analysisType === 'dept' ? 'bg-white dark:bg-primary shadow text-primary dark:text-white' : 'text-text-secondary'}`}
               >
                 部門
               </button>
               <button 
                 onClick={() => setAnalysisType('seniority')}
                 className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${analysisType === 'seniority' ? 'bg-white dark:bg-primary shadow text-primary dark:text-white' : 'text-text-secondary border-l border-gray-200'}`}
               >
                 年資
               </button>
               <button 
                 onClick={() => setAnalysisType('job')}
                 className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${analysisType === 'job' ? 'bg-white dark:bg-primary shadow text-primary dark:text-white' : 'text-text-secondary border-l border-gray-200'}`}
               >
                 職務
               </button>
            </div>
         </div>
         <div className="space-y-5">
            {getAnalysisItems().map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{width: `${item.value}%`}}></div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default WarRoomAvailability;