import React, { useMemo, useState } from 'react';
import { Role } from '../types';
import { XAxis, YAxis, ResponsiveContainer, Bar, BarChart, Cell, LabelList } from 'recharts';

interface WarRoomAttendanceProps {
  role: Role;
  deptId: string;
  deptName: string;
  selectedDate: string;
  timeMode?: 'day' | 'month' | 'quarter' | 'year';
}

interface StatItem {
  label: string;
  value: string;
  status: string;
  unit: string;
}

interface DrillDownItem {
  name: string;
  value: number;
  type: 'dept' | 'person' | 'detail'; // 新增 detail 類型用於假別/加班類型
}

const WarRoomAttendance: React.FC<WarRoomAttendanceProps> = ({ role, deptId, deptName, selectedDate, timeMode }) => {
  const [drillDownModal, setDrillDownModal] = useState<{ 
    isOpen: boolean; 
    title: string; 
    unit: string;
    items: DrillDownItem[] 
  }>({ 
    isOpen: false, 
    title: '', 
    unit: '',
    items: [] 
  });

  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'value'; direction: 'asc' | 'desc' }>({ key: 'value', direction: 'desc' });

  // 判斷是否為「部門/主管」視角 (需要顯示人員清單)
  const isManagerView = role === 'manager' || deptId !== 'all';

  const timeSeed = useMemo(() => {
    return selectedDate.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  }, [selectedDate]);

  const data = useMemo(() => {
    const baseRate = 88 + (timeSeed % 8);
    const deptFactor = deptId === 'cs' ? 0.92 : (deptId === 'rd1' ? 0.97 : 1);
    const attRate = baseRate * deptFactor;
    return {
      attendanceRate: { label: '出勤率', value: Math.min(99.4, attRate).toFixed(1), status: attRate >= 92 ? 'green' : 'warning', unit: '%' },
      absenceRate: { label: '缺勤率', value: (100 - attRate).toFixed(1), status: attRate < 90 ? 'warning' : 'green', unit: '%' },
      lateRate: { label: '遲到率', value: (3.2 + (timeSeed % 4)).toFixed(1), status: 'warning', unit: '%' },
      overtimeAvg: { label: '加班均值', value: Math.round(22 + (timeSeed % 15)).toString(), status: 'danger', unit: 'h' }
    };
  }, [deptId, timeSeed]);

  // 請假數據生成 (根據視角切換 部門/人員)
  const leaveData = useMemo(() => {
    const offset = (timeSeed % 5);
    if (isManagerView) {
      // Manager View: Show People
      const names = ['王大明', '李小美', '張建國', '陳志遠', '許志安', '林雅婷', '黃冠宏'];
      return names.map((name, i) => ({
        name: name,
        val: parseFloat((4.0 + (i * 1.5) + (timeSeed % 3)).toFixed(1))
      })).sort((a, b) => b.val - a.val);
    } else {
      // GM View: Show Departments
      return [
        { name: '全公司', val: 5.1 + offset },
        { name: '研發一部', val: 7.6 + offset },
        { name: '研發二部', val: 3.9 + offset },
        { name: '業務一課', val: 9.9 + offset },
        { name: '客服中心', val: 6.3 + offset },
        { name: '管理部', val: 2.0 + offset },
      ];
    }
  }, [timeSeed, isManagerView]);

  // 加班數據生成 (根據視角切換 部門/人員)
  const otData = useMemo(() => {
    const offset = (timeSeed % 10);
    if (isManagerView) {
      // Manager View: Show People
      const names = ['王大明', '李小美', '張建國', '陳志遠', '許志安', '林雅婷', '黃冠宏'];
      return names.map((name, i) => ({
        name: name,
        val: parseFloat((18.0 + (i * 4) + (timeSeed % 5)).toFixed(1))
      })).sort((a, b) => b.val - a.val);
    } else {
      // GM View: Show Departments
      return [
        { name: '全公司', val: 24.5 + offset },
        { name: '研發一部', val: 32.5 + offset },
        { name: '研發二部', val: 18.2 + offset },
        { name: '業務一課', val: 12.8 + offset },
        { name: '客服中心', val: 28.1 + offset },
        { name: '管理部', val: 5.5 + offset },
      ];
    }
  }, [timeSeed, isManagerView]);

  // 核心邏輯：根據點擊的項目決定下探的內容
  const handleChartClick = (chartData: any, categoryName: string, unit: string) => {
    if (!chartData || !chartData.activeLabel) return;
    
    const clickedLabel = chartData.activeLabel;
    const clickedValue = chartData.activePayload?.[0]?.value || 0;
    
    let items: DrillDownItem[] = [];
    let title = `${clickedLabel} - ${categoryName}詳情`;

    // 判斷邏輯
    if (isManagerView) {
      // 情況 A: 主管模式下，點擊的是「人員」，下探到「假別/加班類型」
      if (categoryName === '請假') {
        items = [
          { name: '特休', value: clickedValue * 0.5, type: 'detail' as const },
          { name: '病假', value: clickedValue * 0.3, type: 'detail' as const },
          { name: '事假', value: clickedValue * 0.2, type: 'detail' as const },
        ].map(i => ({ ...i, value: parseFloat(i.value.toFixed(1)) }));
        title = `${clickedLabel} - 假別明細`;
      } else { // 加班
        items = [
          { name: '平日加班', value: clickedValue * 0.7, type: 'detail' as const },
          { name: '休息日加班', value: clickedValue * 0.2, type: 'detail' as const },
          { name: '國定假日', value: clickedValue * 0.1, type: 'detail' as const },
        ].map(i => ({ ...i, value: parseFloat(i.value.toFixed(1)) }));
        title = `${clickedLabel} - 加班類型明細`;
      }
    } else {
      // 情況 B: GM 模式
      if (clickedLabel === '全公司') {
        // 全公司 -> 部門列表
        const depts = ['研發一部', '研發二部', '業務一課', '客服中心', '管理部'];
        items = depts.map(dept => ({
          name: dept,
          value: parseFloat((clickedValue * (0.8 + Math.random() * 0.4)).toFixed(1)),
          type: 'dept' as const
        })).sort((a, b) => b.value - a.value);
        title = `全公司各部門${categoryName}`;
      } else {
        // 部門 -> 人員列表
        const names = ['王大明', '李小美', '張建國', '陳志遠', '許志安', '林雅婷', '黃冠宏'];
        items = names.map(name => ({
          name,
          value: parseFloat((clickedValue * (0.5 + Math.random() * 1.0)).toFixed(1)),
          type: 'person' as const
        })).sort((a, b) => b.value - a.value);
        title = `${clickedLabel} - 人員清單`;
      }
    }

    setSortConfig({ key: 'value', direction: 'desc' }); // 預設依數值降序
    setDrillDownModal({ isOpen: true, title, unit, items });
  };

  // 用於上方 KPI 卡片的點擊處理 (統一邏輯)
  const handleStatClick = (itemLabel: string, itemValue: string, itemUnit: string) => {
    if (isManagerView) {
       // 主管點擊 KPI 卡片：顯示該部門所有人員列表
       const names = ['王大明', '李小美', '張建國', '陳志遠', '許志安', '林雅婷', '黃冠宏'];
       const val = parseFloat(itemValue);
       const items = names.map(name => ({
          name,
          value: parseFloat((val * (0.8 + Math.random() * 0.4)).toFixed(1)),
          type: 'person' as const
       })).sort((a, b) => b.value - a.value);
       
       setSortConfig({ key: 'value', direction: 'desc' });
       setDrillDownModal({ 
         isOpen: true, 
         title: `${deptName} - ${itemLabel}人員排行`, 
         unit: itemUnit, 
         items 
       });
    } else {
       // GM 點擊 KPI 卡片：顯示部門列表 (維持原邏輯)
       handleChartClick({ 
         activeLabel: '全公司', 
         activePayload: [{ value: parseFloat(itemValue) }] 
       }, itemLabel, itemUnit);
    }
  };

  const handleSort = (key: 'name' | 'value') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    const sortedItems = [...drillDownModal.items].sort((a, b) => {
      const modifier = sortConfig.direction === 'asc' ? 1 : -1;
      if (sortConfig.key === 'value') {
        return (a.value - b.value) * modifier;
      } else {
        return a.name.localeCompare(b.name, 'zh-Hant') * modifier;
      }
    });

    const isDeptList = drillDownModal.items.length > 0 && drillDownModal.items[0].type === 'dept';
    const isDetailList = drillDownModal.items.length > 0 && drillDownModal.items[0].type === 'detail';
    
    let nameHeader = '人員姓名';
    if (isDeptList) nameHeader = '部門名稱';
    if (isDetailList) nameHeader = '項目類型';

    return (
      <div className="fixed inset-0 z-[250] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative w-full max-sm bg-white dark:bg-[#1E1E1E] rounded-[32px] shadow-2xl p-6 flex flex-col max-h-[70vh] animate-in zoom-in-95">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-text-primary dark:text-white">{drillDownModal.title}</h3>
            <button onClick={onClose} className="p-2 text-text-secondary"><span className="material-symbols-outlined">close</span></button>
          </div>
          
          {/* List Header with Sorting */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-white/10 mb-2">
            <button 
              onClick={() => handleSort('name')} 
              className="flex items-center gap-1 text-xs font-bold text-text-secondary dark:text-gray-400 hover:text-primary transition-colors"
            >
              {nameHeader}
              <span className={`material-symbols-outlined text-[14px] transition-transform ${sortConfig.key === 'name' ? 'opacity-100 text-primary' : 'opacity-30'} ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`}>arrow_downward</span>
            </button>
            <button 
              onClick={() => handleSort('value')} 
              className="flex items-center gap-1 text-xs font-bold text-text-secondary dark:text-gray-400 hover:text-primary transition-colors"
            >
              {drillDownModal.unit === '%' ? '百分比' : '時數'}
              <span className={`material-symbols-outlined text-[14px] transition-transform ${sortConfig.key === 'value' ? 'opacity-100 text-primary' : 'opacity-30'} ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`}>arrow_downward</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
             {sortedItems.map((item, idx) => (
               <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      item.type === 'dept' 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                        : item.type === 'detail'
                          ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {item.type === 'dept' ? item.name[0] : (item.type === 'detail' ? '●' : item.name[0])}
                    </div>
                    <span className="font-bold text-sm text-text-primary dark:text-white">{item.name}</span>
                  </div>
                  <span className="font-black text-primary text-base">
                    {item.value}<span className="text-xs ml-0.5 opacity-60 font-medium">{drillDownModal.unit}</span>
                  </span>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-4 space-y-6 animate-in fade-in slide-in-from-bottom-2 pb-32">
      
      {/* 1. Indicators Grid */}
      <div className="grid grid-cols-2 gap-3">
        {(Object.entries(data) as [string, StatItem][]).map(([key, item], idx) => (
          <div key={idx} className="bg-surface-card dark:bg-[#1E1E1E] rounded-2xl p-4 border border-border-light dark:border-white/10 shadow-sm cursor-pointer active:scale-95 transition-transform"
            onClick={() => handleStatClick(item.label, item.value, item.unit)}>
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-bold text-text-secondary uppercase">{item.label}</span>
              <div className={`w-2 h-2 rounded-full ${item.status === 'green' ? 'bg-brand-green' : 'bg-status-warning'}`}></div>
            </div>
            <p className="text-xl font-black text-text-primary dark:text-white">{item.value}<span className="text-xs ml-0.5 opacity-50">{item.unit}</span></p>
          </div>
        ))}
      </div>

      {/* 2. Leave & OT Charts */}
      <div className="space-y-6">
        <div className="bg-surface-card dark:bg-[#1E1E1E] rounded-2xl p-5 border border-border-light dark:border-white/10 shadow-sm">
           <div className="flex items-center gap-2 mb-4">
             <span className="material-symbols-outlined text-primary text-xl">event_busy</span>
             <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest">
               {isManagerView ? `${deptName} - 人員請假排行` : '各部門請假時數分析'}
             </h4>
           </div>
           <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={leaveData} onClick={(e) => handleChartClick(e, '請假', 'h')}>
                  <XAxis type="number" hide /><YAxis dataKey="name" type="category" width={75} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Bar dataKey="val" barSize={10} radius={[0, 4, 4, 0]} className="cursor-pointer hover:opacity-80">
                    <LabelList dataKey="val" position="right" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                    {leaveData.map((e, i) => <Cell key={i} fill={e.name === '全公司' ? '#9CA3AF' : '#2979FF'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-surface-card dark:bg-[#1E1E1E] rounded-2xl p-5 border border-border-light dark:border-white/10 shadow-sm">
           <div className="flex items-center gap-2 mb-4">
             <span className="material-symbols-outlined text-status-danger text-xl">bolt</span>
             <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest">
               {isManagerView ? `${deptName} - 人員加班排行` : '各部門加班時數分析'}
             </h4>
           </div>
           <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={otData} onClick={(e) => handleChartClick(e, '加班', 'h')}>
                  <XAxis type="number" hide /><YAxis dataKey="name" type="category" width={75} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Bar dataKey="val" barSize={10} radius={[0, 4, 4, 0]} className="cursor-pointer hover:opacity-80">
                    <LabelList dataKey="val" position="right" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                    {otData.map((e, i) => <Cell key={i} fill={e.name === '全公司' ? '#9CA3AF' : '#EF4444'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
      <Modal isOpen={drillDownModal.isOpen} onClose={() => setDrillDownModal({ ...drillDownModal, isOpen: false })} />
    </div>
  );
};

export default WarRoomAttendance;