
import React, { useState, useMemo } from 'react';
import { Role } from '../types';

interface ManagementPresenceProps {
  role: Role;
  deptId: string;
  deptName: string;
  selectedDate: string;
  scheduleRange?: 'today' | 'tomorrow' | 'specific';
}

interface Employee {
  id: number;
  name: string;
  title: string;
  dept: string;
  status: 'office' | 'field' | 'wfh' | 'leave';
  avatarId: number;
  checkInTime?: string;
  fieldInfo?: {
    location: string;
    purpose: string;
  };
  leaveDetail?: {
    type: string;
  };
}

const ManagementPresence: React.FC<ManagementPresenceProps> = ({ role, deptId, deptName, selectedDate }) => {
  const [filter, setFilter] = useState<'all' | 'office' | 'field' | 'wfh' | 'leave'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Generate All Employees Data (Simulate Database)
  // We generate 150 employees total, distributed across departments.
  const allEmployees = useMemo(() => {
    const names = ['陳志強', '林雅君', '王大衛', '張雅雯', '李子豪', '許曉明', '黃建國', '周佩珊', '趙敏', '張無忌', '周芷若', '林志豪', '許志安', '王小明', '李小美', '林建忠', '許雅惠', '陳冠廷', '張美玲', '王俊傑'];
    const titles = ['資深工程師', '產品經理', '業務專員', 'UI 設計師', '行政專員', '客服主任'];
    const depts = ['研發一部', '研發二部', '業務一課', '客服中心', '管理部'];
    
    // Seed for randomness based on date
    const dateSeed = selectedDate.split('').reduce((a, b) => a + b.charCodeAt(0), 0);

    return Array.from({ length: 150 }, (_, i) => {
      // Determine Status (Distributed somewhat evenly but weighted)
      // We want roughly: 9 leave, 42 wfh, rest office globally.
      // Used dateSeed to randomize per day
      const p = (i * 13 + dateSeed) % 150;
      let status: Employee['status'] = 'office';
      
      if (p < 9) status = 'leave';
      else if (p < 51) status = 'wfh';
      else status = 'office';

      const name = names[i % names.length] + (i > 20 ? ` ${i}` : '');
      const dept = depts[i % depts.length];
      
      const emp: Employee = {
        id: i,
        name,
        title: titles[i % titles.length],
        dept,
        status,
        avatarId: (i * 7 + dateSeed) % 70,
      };

      if (status === 'office') {
        const hour = 8;
        const min = Math.floor(Math.random() * 59);
        emp.checkInTime = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      } else if (status === 'leave') {
        const types = ['特休', '病假', '事假'];
        emp.leaveDetail = {
          type: types[i % types.length],
        };
      }
      return emp;
    });
  }, [selectedDate]);

  // 2. Filter by Selected Department
  const activeEmployees = useMemo(() => {
    if (deptId === 'all') return allEmployees;
    
    const deptMap: Record<string, string> = { 
       'rd1': '研發一部', 
       'rd2': '研發二部', 
       'sales1': '業務一課', 
       'cs': '客服中心', 
       'admin': '管理部' 
    };
    const targetDept = deptMap[deptId];
    if (!targetDept) return allEmployees; // Fallback

    return allEmployees.filter(e => e.dept === targetDept);
  }, [allEmployees, deptId]);

  // 3. Calculate Stats based on activeEmployees
  const currentStats = useMemo(() => {
    const total = activeEmployees.length;
    const counts = {
      office: activeEmployees.filter(e => e.status === 'office').length,
      wfh: activeEmployees.filter(e => e.status === 'wfh').length,
      leave: activeEmployees.filter(e => e.status === 'leave').length,
    };
    const presentCount = counts.office + counts.wfh; 
    return { total, counts, presentCount };
  }, [activeEmployees]);

  // 4. Filter Logic for Search/Tabs
  const filteredEmployees = useMemo(() => {
    return activeEmployees.filter(e => {
      const matchStatus = filter === 'all' || e.status === filter;
      const matchSearch = searchTerm === '' || 
                          e.name.includes(searchTerm) || 
                          e.dept.includes(searchTerm);
      return matchStatus && matchSearch;
    });
  }, [activeEmployees, filter, searchTerm]);

  // Donut chart calculation
  const circumference = 163;
  const percentage = currentStats.total > 0 ? currentStats.presentCount / currentStats.total : 0;
  const strokeDashoffset = circumference - (circumference * percentage);

  return (
    <div className="flex flex-col gap-6 px-4 py-4 pb-24 animate-in fade-in slide-in-from-bottom-2">
      
      {/* 1. Overview Card - Matching Screenshot */}
      <section className="rounded-[32px] bg-white dark:bg-[#1E1E1E] p-6 shadow-sm border border-gray-100 dark:border-white/5">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">
              {deptId === 'all' ? '全公司' : deptName} 當日概況
            </h3>
            <div className="flex items-baseline gap-1">
               <span className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">
                 {currentStats.presentCount}
               </span>
               <span className="text-xl font-bold text-gray-400">
                 / {currentStats.total}
               </span>
            </div>
          </div>

          {/* Donut Chart Icon - Fixed Sizing & ViewBox */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
               <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-blue-50 dark:text-blue-900/20" />
               <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="6" fill="transparent" 
                 strokeDasharray={circumference} 
                 strokeDashoffset={strokeDashoffset} 
                 className="text-[#2563EB]" 
                 strokeLinecap="round" 
               />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2563EB] text-2xl">person</span>
             </div>
          </div>
        </div>
        
        {/* Progress Bars */}
        <div className="space-y-4">
          {/* Office */}
          <div className="grid grid-cols-[80px_1fr_30px] items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
              辦公室
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${currentStats.total > 0 ? (currentStats.counts.office / currentStats.total) * 100 : 0}%` }}></div>
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-white text-right">{currentStats.counts.office}</span>
          </div>
          
          {/* WFH */}
          <div className="grid grid-cols-[80px_1fr_30px] items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-[#93C5FD]"></span>
              居家
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#93C5FD] rounded-full" style={{ width: `${currentStats.total > 0 ? (currentStats.counts.wfh / currentStats.total) * 100 : 0}%` }}></div>
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-white text-right">{currentStats.counts.wfh}</span>
          </div>

          {/* Leave */}
          <div className="grid grid-cols-[80px_1fr_30px] items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
              休假
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#EF4444] rounded-full" style={{ width: `${currentStats.total > 0 ? (currentStats.counts.leave / currentStats.total) * 100 : 0}%` }}></div>
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-white text-right">{currentStats.counts.leave}</span>
          </div>
        </div>
      </section>

      {/* 2. Search & Filter */}
      <div className="space-y-3">
         <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
            <input 
               type="text" 
               placeholder="搜尋姓名..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-white/10 text-sm focus:ring-0 focus:border-[#2563EB] shadow-sm"
            />
         </div>

         <div className="-mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max">
               {[
                  { id: 'all', label: '全部' },
                  { id: 'office', label: `辦公室 (${currentStats.counts.office})` },
                  { id: 'wfh', label: `居家 (${currentStats.counts.wfh})` },
                  { id: 'leave', label: `休假 (${currentStats.counts.leave})` },
               ].map(tab => (
                  <button
                     key={tab.id}
                     onClick={() => setFilter(tab.id as any)}
                     className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        filter === tab.id 
                           ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md' 
                           : 'bg-white dark:bg-[#1E1E1E] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10'
                     }`}
                  >
                     {tab.label}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* 3. Employee List */}
      <div className="space-y-3">
         {filteredEmployees.length > 0 ? (
            // Limit render to 30 items for performance demo, but search works on all
            filteredEmployees.slice(0, 30).map(emp => (
               <div key={emp.id} className="flex items-center gap-4 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                  <div className="relative">
                     <div 
                        className={`w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center ${emp.status === 'leave' ? 'grayscale opacity-70' : ''}`}
                        style={{backgroundImage: `url("https://i.pravatar.cc/150?img=${emp.avatarId}")`}}
                     ></div>
                     <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-[#1E1E1E] flex items-center justify-center ${
                        emp.status === 'office' ? 'bg-[#2563EB]' :
                        emp.status === 'wfh' ? 'bg-[#93C5FD]' :
                        'bg-[#EF4444]'
                     }`}>
                        <span className="material-symbols-outlined text-[10px] text-white font-bold">
                           {emp.status === 'office' ? 'apartment' : emp.status === 'wfh' ? 'home' : 'flight'}
                        </span>
                     </div>
                  </div>

                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-0.5">
                        <p className={`text-sm font-bold truncate ${emp.status === 'leave' ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>{emp.name}</p>
                        {emp.status === 'office' && <span className="text-[10px] text-gray-400 font-medium">{emp.checkInTime} 打卡</span>}
                        {emp.status === 'leave' && <span className="text-[10px] text-[#EF4444] font-bold">{emp.leaveDetail?.type}</span>}
                     </div>
                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {emp.dept} · {emp.title}
                     </p>
                  </div>

                  <button className="w-9 h-9 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#2563EB] hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-[20px]">chat</span>
                  </button>
               </div>
            ))
         ) : (
            <div className="py-12 text-center text-gray-400">
               <p className="text-xs">沒有找到相符的人員</p>
            </div>
         )}
         {filteredEmployees.length > 30 && (
            <p className="text-center text-[10px] text-gray-400 mt-2">僅顯示前 30 筆結果，請使用搜尋功能查找特定人員</p>
         )}
      </div>
    </div>
  );
};

export default ManagementPresence;
