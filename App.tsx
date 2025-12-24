import React, { useState, useEffect, useRef, useMemo } from 'react';
import DashboardHeader from './components/DashboardHeader';
import BottomNavigation from './components/BottomNavigation';
import SubNavigation from './components/SubNavigation';
import MenuDrawer from './components/MenuDrawer';
import WarRoomAvailability from './components/WarRoomAvailability';
import WarRoomAttendance from './components/WarRoomAttendance';
import WarRoomAnalysis from './components/WarRoomAnalysis';
import ManagementPresence from './components/ManagementPresence';
import ManagementHandover from './components/ManagementHandover';
import CareWeather from './components/CareWeather';
import WheelColumn from './components/WheelColumn';
import { DEPARTMENTS as departments } from './constants';
import { Department, Role } from './types';



const App: React.FC = () => {
  const [mainTab, setMainTab] = useState<'war_room' | 'management' | 'care'>('war_room');
  const [warRoomSubTab, setWarRoomSubTab] = useState<'attendance' | 'availability' | 'analysis'>('attendance');
  const [managementSubTab, setManagementSubTab] = useState<'presence' | 'handover'>('presence');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>('gm');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentQuarter = Math.ceil(currentMonth / 3);

  // Default to 'day' as per requirement
  const [timeMode, setTimeMode] = useState<'day' | 'month' | 'quarter' | 'year'>('day');
  const [selectedDateValue, setSelectedDateValue] = useState<string>(now.toISOString().slice(0, 10));
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Date Picker Logic State
  const [tempYear, setTempYear] = useState(currentYear);
  const [tempMonth, setTempMonth] = useState(currentMonth);
  const [tempQuarter, setTempQuarter] = useState(currentQuarter);
  const [navDate, setNavDate] = useState(new Date());



  // Logic: Management tab only allows 'day' mode
  useEffect(() => {
    if (mainTab === 'management') {
      setTimeMode('day');
    }
  }, [mainTab]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Role Based Department Logic
  useEffect(() => {
    if (currentRole === 'manager') {
      setSelectedDeptId('rd1'); // Simulate Manager of RD1
    } else {
      setSelectedDeptId('all'); // Reset for GM
    }
  }, [currentRole]);

  const yearOptions = useMemo(() => [
    { value: currentYear - 2, label: `${currentYear - 2}年` },
    { value: currentYear - 1, label: `${currentYear - 1}年` },
    { value: currentYear, label: `${currentYear}年` }
  ], [currentYear]);

  const monthOptions = useMemo(() => {
    const max = (tempYear === currentYear) ? currentMonth : 12;
    return Array.from({ length: max }, (_, i) => ({ value: i + 1, label: `${i + 1}月` }));
  }, [tempYear, currentYear, currentMonth]);

  const quarterOptions = useMemo(() => {
    const max = (tempYear === currentYear) ? currentQuarter : 4;
    return Array.from({ length: max }, (_, i) => ({ value: i + 1, label: `Q${i + 1}` }));
  }, [tempYear, currentYear, currentQuarter]);

  useEffect(() => {
    if (tempYear === currentYear) {
      if (tempMonth > currentMonth) setTempMonth(currentMonth);
      if (tempQuarter > currentQuarter) setTempQuarter(currentQuarter);
    }
  }, [tempYear, currentYear, currentMonth, currentQuarter, tempMonth, tempQuarter]);

  const getTimeDisplayLabel = () => {
    const d = new Date(selectedDateValue);
    if (timeMode === 'day') return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    if (timeMode === 'month') return `${d.getFullYear()}/${d.getMonth() + 1}`;
    if (timeMode === 'quarter') return `${d.getFullYear()}/Q${Math.ceil((d.getMonth() + 1) / 3)}`;
    return `${d.getFullYear()}年`;
  };

  const confirmSelection = () => {
    let newDate = "";
    if (timeMode === 'month') newDate = `${tempYear}-${String(tempMonth).padStart(2, '0')}-01`;
    else if (timeMode === 'quarter') newDate = `${tempYear}-${String((tempQuarter - 1) * 3 + 1).padStart(2, '0')}-01`;
    else if (timeMode === 'year') newDate = `${tempYear}-01-01`;
    // For 'day', selection happens immediately on click in the grid
    if (timeMode !== 'day') {
      setSelectedDateValue(newDate);
      setIsDatePickerOpen(false);
    }
  };

  const renderContent = () => {
    const viewProps = {
      role: currentRole,
      deptId: selectedDeptId,
      deptName: selectedDeptId === 'all' ? '全公司' : (departments.find(d => d.id === selectedDeptId)?.name || ''),
      selectedDate: selectedDateValue,
      timeMode: timeMode
    };

    switch (mainTab) {
      case 'war_room':
        if (warRoomSubTab === 'attendance') return <WarRoomAttendance {...viewProps} />;
        if (warRoomSubTab === 'availability') return <WarRoomAvailability {...viewProps} selectedYear={''} selectedQuarter={''} />;
        return <WarRoomAnalysis {...viewProps} />;
      case 'management':
        return managementSubTab === 'presence'
          ? <ManagementPresence {...viewProps} scheduleRange="today" />
          : <ManagementHandover />;
      case 'care':
        return <CareWeather {...viewProps} />;
      default:
        return null;
    }
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-background-page dark:bg-background-page-dark transition-colors duration-300">
      <DashboardHeader onMenuClick={() => setIsMenuOpen(true)} />

      <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => {
            if (timeMode === 'day') setNavDate(new Date(selectedDateValue));
            setIsDatePickerOpen(true);
          }}
          className="flex-shrink-0 flex items-center gap-2 bg-[#2979FF] text-white px-5 py-2 rounded-full font-bold text-sm shadow-md active:scale-95 transition-transform"
        >
          {getTimeDisplayLabel()}
          <span className="material-symbols-outlined text-lg">calendar_today</span>
        </button>

        <div className="relative flex-shrink-0">
          <button className={`flex items-center gap-1.5 border px-5 py-2 rounded-full font-bold text-sm transition-colors ${currentRole === 'manager'
            ? 'bg-gray-100 dark:bg-white/10 border-transparent text-text-secondary cursor-not-allowed'
            : 'bg-surface-card dark:bg-[#1E1E1E] border-border-light dark:border-white/10 text-text-primary dark:text-white'
            }`}>
            {selectedDeptId === 'all' ? '全公司' : departments.find(d => d.id === selectedDeptId)?.name}
            {currentRole === 'gm' && <span className="material-symbols-outlined text-lg">expand_more</span>}
          </button>

          {currentRole === 'gm' && (
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            >
              <option value="all">全公司</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          )}
        </div>
      </div>

      <div className="px-4 pb-2">
        {mainTab === 'war_room' && (
          <SubNavigation
            options={[
              { id: 'attendance', label: '出勤分析' },
              { id: 'availability', label: '稼動率戰情' },
              { id: 'analysis', label: '戰力預警' }
            ]}
            activeId={warRoomSubTab}
            onChange={(id) => setWarRoomSubTab(id as any)}
            colorTheme={warRoomSubTab === 'attendance' ? 'orange' : (warRoomSubTab === 'availability' ? 'green' : 'blue')}
          />
        )}
      </div>

      <main className="flex-1 flex flex-col overflow-y-auto">
        {renderContent()}
      </main>

      <BottomNavigation currentTab={mainTab} onTabChange={setMainTab} />

      {/* Date Picker Modal */}
      {isDatePickerOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDatePickerOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-white dark:bg-[#1E1E1E] rounded-[32px] shadow-2xl p-6 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">選擇查詢區間</h3>
              {timeMode !== 'day' && <button onClick={() => confirmSelection()} className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm">完成</button>}
              {timeMode === 'day' && <button onClick={() => setIsDatePickerOpen(false)} className="p-2"><span className="material-symbols-outlined">close</span></button>}
            </div>

            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl mb-6">
              {/* Restricted to only 'day' if on management tab */}
              {['day', 'month', 'quarter', 'year'].map((mode) => (
                <button
                  key={mode}
                  disabled={mainTab === 'management' && mode !== 'day'}
                  onClick={() => setTimeMode(mode as any)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${timeMode === mode ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-text-secondary'} ${mainTab === 'management' && mode !== 'day' ? 'opacity-20' : ''}`}
                >
                  {mode === 'day' ? '日' : mode === 'month' ? '月' : mode === 'quarter' ? '季' : '年'}
                </button>
              ))}
            </div>

            {timeMode === 'day' ? (
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() - 1, 1))} className="p-1"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                  <span className="text-sm font-bold">{navDate.getFullYear()}年 {navDate.getMonth() + 1}月</span>
                  <button onClick={() => setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() + 1, 1))} disabled={navDate.getMonth() === now.getMonth() && navDate.getFullYear() === now.getFullYear()} className="p-1 disabled:opacity-30"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['日', '一', '二', '三', '四', '五', '六'].map(d => <span key={d} className="text-[10px] text-gray-400 font-bold mb-2">{d}</span>)}
                  {Array.from({ length: getFirstDayOfMonth(navDate.getFullYear(), navDate.getMonth()) }).map((_, i) => <div key={`empty-${i}`} />)}
                  {Array.from({ length: getDaysInMonth(navDate.getFullYear(), navDate.getMonth()) }, (_, i) => {
                    const dayStr = `${navDate.getFullYear()}-${String(navDate.getMonth() + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                    const isFutureDay = new Date(dayStr) > now;
                    return (
                      <button key={i} disabled={isFutureDay} onClick={() => { setSelectedDateValue(dayStr); setIsDatePickerOpen(false); }}
                        className={`aspect-square flex items-center justify-center text-xs font-bold rounded-full transition-all ${selectedDateValue === dayStr ? 'bg-primary text-white' : isFutureDay ? 'text-gray-200 dark:text-gray-700' : 'hover:bg-gray-100 dark:hover:bg-white/10'}`}
                      >{i + 1}</button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="relative flex h-[220px] bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="absolute top-[88px] left-2 right-2 h-[44px] bg-primary/5 dark:bg-primary/20 rounded-lg pointer-events-none border-y border-primary/20"></div>
                {timeMode === 'month' && (
                  <>
                    <WheelColumn options={yearOptions} value={tempYear} onChange={setTempYear} />
                    <WheelColumn options={monthOptions} value={tempMonth} onChange={setTempMonth} />
                  </>
                )}
                {timeMode === 'quarter' && (
                  <>
                    <WheelColumn options={yearOptions} value={tempYear} onChange={setTempYear} />
                    <WheelColumn options={quarterOptions} value={tempQuarter} onChange={setTempQuarter} />
                  </>
                )}
                {timeMode === 'year' && <WheelColumn options={yearOptions} value={tempYear} onChange={setTempYear} />}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-50 dark:from-black/40 to-transparent pointer-events-none rounded-t-2xl"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 dark:from-black/40 to-transparent pointer-events-none rounded-b-2xl"></div>
              </div>
            )}
          </div>
        </div>
      )}

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
      />
    </div>
  );
};

export default App;