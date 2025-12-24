import React, { useState } from 'react';

interface WeatherStationViewProps {
  onBack: () => void;
  onMenuClick: () => void;
}

const WeatherStationView: React.FC<WeatherStationViewProps> = ({ onBack, onMenuClick }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workhours' | 'leave' | 'turnover'>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Weather Hero Card - Updated to Primary Blue Gradient */}
            <div className="w-full relative overflow-hidden rounded bg-gradient-to-br from-primary to-primary-dark p-6 shadow-card dark:shadow-none text-white transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-col items-center text-center relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white mb-4 backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-[14px]">visibility_off</span>
                  數據已匿名化處理
                </span>
                <div className="mb-4 relative">
                  <span className="material-symbols-outlined text-7xl text-white drop-shadow-md icon-filled animate-pulse">rainy</span>
                  <span className="material-symbols-outlined text-4xl text-white/50 absolute -bottom-1 -right-2">thunderstorm</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-1">🌧️ 陰雨雷暴</h2>
                <p className="text-white/80 text-sm font-medium">過勞風險極高 • 加班時數異常</p>
                <div className="w-full mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-white/90">
                    <span>團隊壓力指數</span>
                    <span className="text-white">85% (危險)</span>
                  </div>
                  <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-status-success via-status-warning to-accent-red w-[85%] rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <section className="animate-in fade-in slide-in-from-bottom-6 delay-100">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">生命徵象</h3>
                <span className="text-xs text-text-secondary dark:text-text-secondary-dark">本週更新</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 rounded bg-background-card dark:bg-background-card-dark p-4 border border-border-light dark:border-border-dark shadow-card dark:shadow-none">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-status-warning/10 text-status-warning dark:text-status-warning-dark">
                      <span className="material-symbols-outlined text-lg">timer</span>
                    </span>
                    <span className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">平均加班</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">12.5</span>
                    <span className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">小時</span>
                  </div>
                  <span className="text-xs font-medium text-status-warning dark:text-status-warning-dark flex items-center mt-1">
                    <span className="material-symbols-outlined text-xs mr-0.5">trending_up</span>
                    +15% 較上週
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded bg-background-card dark:bg-background-card-dark p-4 border border-border-light dark:border-border-dark shadow-card dark:shadow-none">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary dark:text-primary-dark">
                      <span className="material-symbols-outlined text-lg">event_busy</span>
                    </span>
                    <span className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">特休積壓</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">High</span>
                  </div>
                  <span className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark mt-1">
                    3人超過 10 天未休
                  </span>
                </div>
              </div>
            </section>

            {/* AI Insight */}
            <section className="animate-in fade-in slide-in-from-bottom-8 delay-200">
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="material-symbols-outlined text-primary dark:text-primary-dark text-xl">auto_awesome</span>
                <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">AI 預警建議</h3>
              </div>
              <div className="rounded bg-gradient-to-b from-surface-selected to-background-card dark:from-background-card-dark dark:to-background-card-dark p-5 border border-primary/20 shadow-card dark:shadow-none">
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 pt-1">
                    <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red animate-pulse">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-text-primary dark:text-text-primary-dark font-bold text-base leading-tight">高風險離職預警</h4>
                    <p className="text-text-secondary dark:text-text-secondary-dark text-sm leading-relaxed">
                       偵測到連續 3 週高強度加班。若不介入，未來一個月內人員流失風險將提升至 <span className="text-accent-red font-bold">65%</span>。
                    </p>
                  </div>
                </div>
                <div className="h-px bg-border-light dark:bg-border-dark my-4 w-full"></div>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-between w-full bg-background-page dark:bg-white/5 hover:bg-surface-selected dark:hover:bg-white/10 active:scale-[0.99] p-3 rounded transition-all group border border-transparent hover:border-primary/20">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary dark:text-primary-dark group-hover:scale-110 transition-transform">celebration</span>
                      <span className="text-sm font-medium text-text-primary dark:text-text-primary-dark">安排 Team Building</span>
                    </div>
                    <span className="material-symbols-outlined text-text-secondary dark:text-text-secondary-dark text-sm">arrow_forward_ios</span>
                  </button>
                </div>
              </div>
            </section>
          </>
        );
      
      case 'workhours':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
            <div className="rounded bg-background-card dark:bg-background-card-dark p-5 shadow-card dark:shadow-none border border-border-light dark:border-border-dark">
              <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark mb-4">工時分佈 (週)</h3>
              <div className="flex items-end gap-3 h-40">
                 {[40, 65, 55, 80, 70, 30, 20].map((h, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full bg-background-page dark:bg-white/5 rounded-t relative h-full flex items-end overflow-hidden">
                        <div 
                          className={`w-full transition-all duration-500 rounded-t ${h > 60 ? 'bg-accent-red' : 'bg-primary dark:bg-primary-dark'}`} 
                          style={{height: `${h}%`}}
                        ></div>
                      </div>
                      <span className="text-[10px] text-text-secondary dark:text-text-secondary-dark font-bold">
                        {['一','二','三','四','五','六','日'][i]}
                      </span>
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="rounded bg-background-card dark:bg-background-card-dark p-5 shadow-card dark:shadow-none border border-border-light dark:border-border-dark">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">超時人員名單</h3>
                <span className="px-2 py-1 bg-accent-red/10 text-accent-red text-xs font-bold rounded">Top 3</span>
              </div>
              <div className="space-y-4">
                 {[
                   {name: '陳國華', role: '資深工程師', hours: 68, trend: 'up'},
                   {name: '林雅婷', role: 'UI 設計師', hours: 62, trend: 'up'},
                   {name: '張偉', role: '產品經理', hours: 58, trend: 'down'}
                 ].map((p, i) => (
                   <div key={i} className="flex items-center justify-between pb-3 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-background-page dark:bg-white/10 flex items-center justify-center font-bold text-text-secondary dark:text-text-primary-dark">
                         {p.name[0]}
                       </div>
                       <div>
                         <p className="font-bold text-text-primary dark:text-text-primary-dark">{p.name}</p>
                         <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{p.role}</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <p className={`font-bold ${p.hours > 60 ? 'text-accent-red' : 'text-status-warning'}`}>{p.hours}h</p>
                       <span className="text-[10px] text-text-secondary dark:text-text-secondary-dark flex items-center justify-end">
                          <span className="material-symbols-outlined text-[10px] mr-0.5">{p.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                          趨勢
                       </span>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        );

      case 'leave':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-status-info/10 dark:bg-status-info-dark/10 p-4 rounded border border-status-info/20">
                  <span className="material-symbols-outlined text-status-info dark:text-status-info-dark text-3xl mb-2">sick</span>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark mb-1">病假頻率</p>
                  <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">+12%</p>
               </div>
               <div className="bg-primary/10 dark:bg-primary-dark/10 p-4 rounded border border-primary/20">
                  <span className="material-symbols-outlined text-primary dark:text-primary-dark text-3xl mb-2">luggage</span>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark mb-1">特休使用率</p>
                  <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">45%</p>
               </div>
            </div>
            
            <div className="rounded bg-background-card dark:bg-background-card-dark p-5 shadow-card dark:shadow-none border border-border-light dark:border-border-dark">
               <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark mb-4">近期休假概況</h3>
               <div className="space-y-3">
                 <div className="flex items-center gap-3 p-3 bg-background-page dark:bg-white/5 rounded">
                    <div className="w-1 h-10 rounded-full bg-status-info dark:bg-status-info-dark"></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-text-primary dark:text-text-primary-dark">病假 (流感)</p>
                      <p className="text-xs text-text-secondary dark:text-text-secondary-dark">3 人 · 影響專案 A</p>
                    </div>
                    <span className="text-xs font-bold bg-status-info/10 text-status-info dark:text-status-info-dark px-2 py-1 rounded">高頻</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-background-page dark:bg-white/5 rounded">
                    <div className="w-1 h-10 rounded-full bg-primary dark:bg-primary-dark"></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-text-primary dark:text-text-primary-dark">事假 (家庭)</p>
                      <p className="text-xs text-text-secondary dark:text-text-secondary-dark">1 人 · 已核准</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        );

      case 'turnover':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
             <div className="rounded bg-gradient-to-br from-accent-red/5 to-transparent p-6 border border-accent-red/20 relative overflow-hidden">
                <span className="material-symbols-outlined absolute -right-4 -top-4 text-9xl text-accent-red/5">warning</span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-1">離職風險高</h3>
                  <p className="text-text-secondary dark:text-text-secondary-dark text-sm mb-4">預測未來 30 天內可能有 2 位關鍵成員離職。</p>
                  <div className="flex gap-2">
                     <span className="px-3 py-1 bg-accent-red text-white text-xs font-bold rounded-full shadow-sm">緊急介入</span>
                     <span className="px-3 py-1 bg-background-card dark:bg-white/10 text-text-primary dark:text-text-primary-dark text-xs font-bold rounded-full border border-border-light dark:border-border-dark">訪談安排</span>
                  </div>
                </div>
             </div>

             <div className="rounded bg-background-card dark:bg-background-card-dark p-5 shadow-card dark:shadow-none border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark mb-4">人員留存漏斗</h3>
                <div className="space-y-4">
                  <div>
                     <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary dark:text-text-secondary-dark">新進試用期</span>
                        <span className="text-text-primary dark:text-text-primary-dark font-bold">85% 留存</span>
                     </div>
                     <div className="w-full bg-background-page dark:bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary dark:bg-primary-dark h-full rounded-full" style={{width: '85%'}}></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary dark:text-text-secondary-dark">滿一年員工</span>
                        <span className="text-text-primary dark:text-text-primary-dark font-bold">92% 留存</span>
                     </div>
                     <div className="w-full bg-background-page dark:bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary dark:bg-primary-dark h-full rounded-full" style={{width: '92%'}}></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary dark:text-text-secondary-dark">關鍵職位</span>
                        <span className="text-accent-red font-bold">70% 留存 (低)</span>
                     </div>
                     <div className="w-full bg-background-page dark:bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-accent-red h-full rounded-full" style={{width: '70%'}}></div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-background-page dark:bg-background-page-dark min-h-screen flex flex-col font-display text-text-primary dark:text-text-primary-dark transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-page/90 dark:bg-background-page-dark/90 backdrop-blur-md p-4 pb-2 transition-colors border-b border-border-light dark:border-border-dark">
        <div className="flex items-center gap-2">
           <button 
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-text-primary dark:text-text-primary-dark">arrow_back</span>
          </button>
          <button 
            onClick={onMenuClick}
            className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-text-primary dark:text-text-primary-dark">menu</span>
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <h1 className="text-text-primary dark:text-text-primary-dark text-lg font-bold leading-tight">戰情中心</h1>
          <span className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">設計一部 - 產品組 A</span>
        </div>
        
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-text-primary dark:text-text-primary-dark">more_vert</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-1 px-4 pt-4 pb-32 gap-6 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Custom Bottom Navigation for Weather Station */}
      <div className="fixed bottom-0 left-0 right-0 bg-background-card/95 dark:bg-background-card-dark/95 backdrop-blur-lg border-t border-border-light dark:border-border-dark pb-safe z-50 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16 px-2">
           {[
             { id: 'overview', icon: 'thunderstorm', label: '總體概況' },
             { id: 'workhours', icon: 'timer', label: '工時分析' },
             { id: 'leave', icon: 'event_busy', label: '請假趨勢' },
             { id: 'turnover', icon: 'group_remove', label: '人員流動' }
           ].map((item) => {
             const isActive = activeTab === item.id;
             return (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id as any)}
                 className="flex flex-col items-center justify-center w-full h-full group active:scale-95 transition-transform"
               >
                 <div className={`mb-1 transition-all duration-300 ${isActive ? 'translate-y-0' : 'translate-y-1'}`}>
                   <span 
                     className={`material-symbols-outlined text-[24px] transition-colors duration-300 ${
                       isActive 
                         ? 'text-primary dark:text-primary-dark icon-filled' 
                         : 'text-text-secondary dark:text-text-secondary-dark group-hover:text-text-primary dark:group-hover:text-text-primary-dark'
                     }`}
                     style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                   >
                     {item.icon}
                   </span>
                 </div>
                 <span 
                   className={`text-[10px] font-medium transition-all duration-300 ${
                     isActive 
                       ? 'text-primary dark:text-primary-dark opacity-100' 
                       : 'text-text-secondary dark:text-text-secondary-dark opacity-0 h-0 overflow-hidden'
                   }`}
                 >
                   {item.label}
                 </span>
               </button>
             );
           })}
        </div>
      </div>
    </div>
  );
};

export default WeatherStationView;