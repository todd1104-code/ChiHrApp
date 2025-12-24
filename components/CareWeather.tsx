import React, { useMemo, useState } from 'react';
import { Role } from '../types';

interface CareWeatherProps {
  role: Role;
  deptId: string;
  deptName: string;
}

interface BurnoutRisk {
  id: string;
  name: string;
  dept: string;
  type: 'Overwork' | 'Rest Violation';
  value: string;
  level: 'Yellow' | 'Red';
  avatarId: number;
}

interface AbnormalAttendance {
  id: string;
  name: string;
  dept: string;
  type: 'Sudden Leave Spike' | 'Lateness Spike';
  currentCount: number;
  prevAvg: number;
  growth: string;
  avatarId: number;
}

interface StressHeatmapItem {
  name: string;
  headcount: number;
  stressScore: 'Normal' | 'High' | 'Critical';
  otDeviation: string;
  leaveDeviation: string;
}

interface RetentionRisk {
  id: string;
  name: string;
  dept: string;
  riskScore: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  keyFactors: string[];
  recommendation: string;
  avatarId: number;
}

const CareWeather: React.FC<CareWeatherProps> = ({ role, deptId, deptName }) => {
  const [activeTab, setActiveTab] = useState<'burnout' | 'abnormal' | 'heatmap' | 'retention'>('retention');
  const isHighRisk = deptId === 'rd1' || deptId === 'all';

  // Overwork & Rest Violation Risks
  const burnoutRisks: BurnoutRisk[] = useMemo(() => {
    const allRisks: BurnoutRisk[] = [
      { id: '001', name: '王大明', dept: '研發一部', type: 'Overwork', value: '48.5 hours OT', level: 'Red', avatarId: 11 },
      { id: '005', name: '李小美', dept: '業務一課', type: 'Overwork', value: '38.0 hours OT', level: 'Yellow', avatarId: 12 },
      { id: '022', name: '張建國', dept: '生產管理部', type: 'Rest Violation', value: '9.0 hours rest', level: 'Red', avatarId: 13 },
      { id: '045', name: '陳志遠', dept: '研發一部', type: 'Rest Violation', value: '10.5 hours rest', level: 'Red', avatarId: 14 },
    ];

    if (deptId === 'all') return allRisks;
    const deptMap: Record<string, string> = {
      'rd1': '研發一部', 'rd2': '研發二部', 'sales1': '業務一課', 'sales2': '業務二課', 
      'cs': '客服中心', 'admin': '管理部', 'hr': '人力資源部', 'mkt': '行銷企劃部', 'prod': '生產管理部'
    };
    return allRisks.filter(r => r.dept === deptMap[deptId]);
  }, [deptId]);

  // Abnormal Attendance Detection
  const abnormalAttendance: AbnormalAttendance[] = useMemo(() => {
    const allSignals: AbnormalAttendance[] = [
      { id: '088', name: '林志豪', dept: '客服中心', type: 'Sudden Leave Spike', currentCount: 4, prevAvg: 0.5, growth: '+700%', avatarId: 21 },
      { id: '102', name: '張雅雯', dept: '行銷企劃部', type: 'Lateness Spike', currentCount: 5, prevAvg: 1.2, growth: '+316%', avatarId: 22 },
      { id: '056', name: '許志安', dept: '研發二部', type: 'Sudden Leave Spike', currentCount: 3, prevAvg: 1.0, growth: '+200%', avatarId: 23 },
    ];

    if (deptId === 'all') return allSignals;
    const deptMap: Record<string, string> = {
      'rd1': '研發一部', 'rd2': '研發二部', 'sales1': '業務一課', 'sales2': '業務二課', 
      'cs': '客服中心', 'admin': '管理部', 'hr': '人力資源部', 'mkt': '行銷企劃部', 'prod': '生產管理部'
    };
    return allSignals.filter(s => s.dept === deptMap[deptId]);
  }, [deptId]);

  // Retention Risk Modeling (New Logic)
  const retentionRisks: RetentionRisk[] = useMemo(() => {
    const allRisks: RetentionRisk[] = [
      { 
        id: 'R01', name: '陳冠廷', dept: '研發一部', riskScore: 88, riskLevel: 'High', avatarId: 31,
        keyFactors: ['頻繁請短假 (週五 0.5天 x3)', '加班時數驟降 (-90% MoM)', '安靜離職跡象'],
        recommendation: '高度疑似面試中，建議立即安排一對一留任訪談 (Stay Interview)。'
      },
      { 
        id: 'R02', name: '黃佳怡', dept: '業務一課', riskScore: 75, riskLevel: 'High', avatarId: 32,
        keyFactors: ['特休消耗速度異常 (近兩週 -5天)', '無長假計畫申請', '布拉德福德因子飆升'],
        recommendation: '需確認是否為職業倦怠或準備離職清假，建議關懷工作負荷。'
      },
      { 
        id: 'R03', name: '林建忠', dept: '客服中心', riskScore: 55, riskLevel: 'Medium', avatarId: 33,
        keyFactors: ['遲到頻率增加 (本月 4次)', '午休打卡異常超時', '出勤紀律鬆散'],
        recommendation: '工作敬業度下降，建議檢視是否對現有職務感到乏味。'
      }
    ];

    if (deptId === 'all') return allRisks;
    const deptMap: Record<string, string> = {
      'rd1': '研發一部', 'rd2': '研發二部', 'sales1': '業務一課', 'sales2': '業務二課', 
      'cs': '客服中心', 'admin': '管理部', 'hr': '人力資源部', 'mkt': '行銷企劃部', 'prod': '生產管理部'
    };
    return allRisks.filter(r => r.dept === deptMap[deptId]);
  }, [deptId]);

  // Stress Heatmap Data
  const heatmapData: StressHeatmapItem[] = useMemo(() => {
    return [
      { name: '研發一部', headcount: 32, stressScore: 'Critical', otDeviation: '+125%', leaveDeviation: '+20%' },
      { name: '客服中心', headcount: 45, stressScore: 'High', otDeviation: '+15%', leaveDeviation: '+180%' },
      { name: '業務一課', headcount: 15, stressScore: 'High', otDeviation: '+65%', leaveDeviation: '+10%' },
      { name: '行銷企劃', headcount: 12, stressScore: 'Normal', otDeviation: '-10%', leaveDeviation: '+5%' },
      { name: '管理部', headcount: 10, stressScore: 'Normal', otDeviation: '-40%', leaveDeviation: '-15%' },
    ];
  }, []);

  const heatmapAnomalies = useMemo(() => heatmapData.filter(d => d.stressScore !== 'Normal').length, [heatmapData]);

  return (
    <div className="flex flex-col gap-4 px-4 py-4 animate-in fade-in zoom-in-95 pb-32">
      
      {/* 1. Sub Tabs Control with Badges */}
      <div className="bg-surface-card dark:bg-surface-card-dark p-1 rounded-xl border border-border-light dark:border-border-dark flex shadow-sm mb-2 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('retention')}
          className={`relative flex-1 min-w-[80px] py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'retention' ? 'bg-status-danger text-white shadow-lg shadow-red-500/30' : 'text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5'}`}
        >
          需關注
          {retentionRisks.length > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${activeTab === 'retention' ? 'bg-white text-status-danger' : 'bg-status-danger text-white'}`}>
              {retentionRisks.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('burnout')}
          className={`relative flex-1 min-w-[80px] py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'burnout' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5'}`}
        >
          過勞風險
          {burnoutRisks.length > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${activeTab === 'burnout' ? 'bg-white text-primary' : 'bg-status-danger text-white'}`}>
              {burnoutRisks.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('abnormal')}
          className={`relative flex-1 min-w-[80px] py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'abnormal' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5'}`}
        >
          異常考勤
          {abnormalAttendance.length > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${activeTab === 'abnormal' ? 'bg-white text-primary' : 'bg-status-danger text-white'}`}>
              {abnormalAttendance.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('heatmap')}
          className={`relative flex-1 min-w-[80px] py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'heatmap' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-secondary hover:bg-gray-100 dark:hover:bg-white/5'}`}
        >
          壓力熱圖
          {heatmapAnomalies > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold ${activeTab === 'heatmap' ? 'bg-white text-primary' : 'bg-status-danger text-white'}`}>
              {heatmapAnomalies}
            </span>
          )}
        </button>
      </div>

      {/* 2. Top Banner */}
      <div className={`w-full rounded-2xl p-5 shadow-sm border ${
        (activeTab === 'retention' || isHighRisk)
          ? 'bg-white dark:bg-[#1E1E1E] border-status-danger' 
          : 'bg-white dark:bg-[#1E1E1E] border-brand-green'
      }`}>
        <div className="flex justify-between items-center">
           <div>
             <h2 className={`text-xl font-extrabold mb-1 ${
               activeTab === 'retention' ? 'text-status-danger' :
               isHighRisk ? 'text-status-danger' : 'text-brand-green'
             }`}>
               {activeTab === 'retention' ? '離職風險預測' :
                activeTab === 'burnout' ? '生理健康偵測' : 
                activeTab === 'abnormal' ? '行為突變偵測' : '跨部門壓力比對'}
             </h2>
             <p className="text-text-secondary dark:text-gray-400 text-[11px] font-bold">
               {activeTab === 'retention' ? '基於休假模式與工時變化之預測模型' :
                isHighRisk ? '系統偵測到高偏離數值' : '目前數值維持在安全區間'}
             </p>
           </div>
           <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
             activeTab === 'retention' ? 'bg-status-danger/10 text-status-danger' :
             isHighRisk ? 'bg-status-danger/10 text-status-danger' : 'bg-brand-green/10 text-brand-green'
           }`}>
             <span className="material-symbols-outlined text-3xl">
               {activeTab === 'retention' ? 'person_alert' :
                activeTab === 'burnout' ? 'monitor_heart' : 
                activeTab === 'abnormal' ? 'analytics' : 'grid_view'}
             </span>
           </div>
        </div>
      </div>

      {/* 3. Tab Content */}
      {activeTab === 'retention' && (
        <div className="space-y-4">
          <div className="bg-surface-card dark:bg-surface-card-dark rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark">
             <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-text-primary dark:text-white flex items-center gap-2 text-base">
                <span className="material-symbols-outlined text-status-danger">crisis_alert</span>
                高風險人員名單
              </h3>
              <span className="text-[10px] font-bold text-text-secondary bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">模型信心度: 88%</span>
            </div>
            
            {retentionRisks.length > 0 ? (
              <div className="flex flex-col gap-4">
                {retentionRisks.map((item) => (
                  <div key={item.id} className="relative overflow-hidden bg-background-page dark:bg-white/5 rounded-xl border border-transparent shadow-sm hover:shadow-md transition-all">
                    {/* High Risk Strip */}
                    {item.riskLevel === 'High' && (
                       <div className="absolute top-0 left-0 bottom-0 w-1 bg-status-danger"></div>
                    )}
                    
                    <div className="p-4 pl-5">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="relative shrink-0">
                           <div className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center shadow-inner" style={{ backgroundImage: `url("https://i.pravatar.cc/150?img=${item.avatarId}")` }}></div>
                           <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1E1E1E] text-xs font-extrabold text-white shadow-sm ${
                             item.riskScore >= 80 ? 'bg-status-danger' : 'bg-status-warning'
                           }`}>
                             {item.riskScore}
                           </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                             <p className="font-bold text-base text-text-primary dark:text-white">{item.name}</p>
                             <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                               item.riskLevel === 'High' ? 'bg-red-50 text-status-danger border-red-100' : 'bg-orange-50 text-status-warning border-orange-100'
                             }`}>
                               {item.riskLevel === 'High' ? '極高風險' : '中度風險'}
                             </span>
                          </div>
                          <p className="text-xs font-bold text-text-secondary uppercase mt-0.5">{item.dept}</p>
                        </div>
                      </div>

                      <div className="mb-3 space-y-1.5 bg-white dark:bg-black/20 p-2 rounded-lg">
                        {item.keyFactors.map((factor, idx) => (
                           <div key={idx} className="flex items-start gap-1.5 text-xs">
                              <span className="material-symbols-outlined text-[14px] text-status-danger mt-0.5">error</span>
                              <span className="text-text-primary dark:text-gray-300">{factor}</span>
                           </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 pt-2 border-t border-gray-100 dark:border-white/10">
                         <span className="material-symbols-outlined text-primary text-sm mt-0.5">tips_and_updates</span>
                         <p className="text-xs font-bold text-primary dark:text-blue-400 leading-relaxed">
                            建議：{item.recommendation}
                         </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-20">verified_user</span>
                <p className="text-xs font-medium">團隊穩定，無顯著離職風險</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'burnout' && (
        <div className="space-y-4">
          <div className="bg-surface-card dark:bg-surface-card-dark rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-text-primary dark:text-white flex items-center gap-2 text-base">
                <span className="material-symbols-outlined text-status-danger">clinical_notes</span>
                過勞風險偵測報告
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-status-danger"></div>
                  <span className="text-[10px] font-bold text-gray-500">嚴重危險</span>
                </div>
              </div>
            </div>
            {burnoutRisks.length > 0 ? (
              <div className="flex flex-col gap-4">
                {burnoutRisks.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-background-page dark:bg-white/5 p-4 rounded-xl border border-transparent shadow-sm">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center ring-2 ring-offset-2 dark:ring-offset-[#1E1E1E]" style={{ backgroundImage: `url("https://i.pravatar.cc/150?img=${item.avatarId}")`, borderColor: item.level === 'Red' ? '#EF4444' : '#FB8C00' }}></div>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1E1E1E] ${item.level === 'Red' ? 'bg-status-danger' : 'bg-status-warning'}`}>
                        <span className="material-symbols-outlined text-[10px] text-white">warning</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-sm text-text-primary dark:text-white">{item.name}</p>
                          <p className="text-[10px] font-bold text-text-secondary uppercase">{item.dept}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-extrabold ${item.level === 'Red' ? 'text-status-danger' : 'text-status-warning'}`}>{item.value}</p>
                          <p className="text-[10px] font-bold text-text-secondary">{item.type === 'Overwork' ? '月累計加班' : '班次間隔'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-20">verified</span>
                <p className="text-xs font-medium">生理健康指標正常</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'abnormal' && (
        <div className="space-y-4">
          <div className="bg-surface-card dark:bg-surface-card-dark rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-text-primary dark:text-white flex items-center gap-2 text-base">
                <span className="material-symbols-outlined text-primary">psychology_alt</span>
                異常考勤偵測報告
              </h3>
            </div>
            {abnormalAttendance.length > 0 ? (
              <div className="flex flex-col gap-4">
                {abnormalAttendance.map((item) => (
                  <div key={item.id} className="bg-background-page dark:bg-white/5 p-4 rounded-xl border border-transparent shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center border border-primary/20" style={{ backgroundImage: `url("https://i.pravatar.cc/150?img=${item.avatarId}")` }}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-text-primary dark:text-white">{item.name}</p>
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {item.type === 'Sudden Leave Spike' ? '突發請假激增' : '遲到頻率激增'}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-text-secondary uppercase mt-0.5">{item.dept}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-extrabold text-status-danger">{item.growth}</p>
                         <p className="text-[10px] font-bold text-text-secondary">增長率</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-white dark:bg-white/5 rounded-lg">
                       <div className="text-center">
                          <p className="text-[9px] text-text-secondary font-bold">當月次數</p>
                          <p className="text-sm font-extrabold text-text-primary dark:text-white">{item.currentCount}</p>
                       </div>
                       <div className="text-center border-l border-gray-100 dark:border-gray-800">
                          <p className="text-[9px] text-text-secondary font-bold">前三月平均</p>
                          <p className="text-sm font-extrabold text-text-primary dark:text-white">{item.prevAvg}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-20">sentiment_satisfied</span>
                <p className="text-xs font-medium">查無行為異常數據</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'heatmap' && (
        <div className="space-y-4">
          <div className="bg-surface-card dark:bg-surface-card-dark rounded-2xl p-5 shadow-card border border-border-light dark:border-border-dark">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-text-primary dark:text-white flex items-center gap-2 text-base">
                <span className="material-symbols-outlined text-primary">distance</span>
                部門壓力相對熱圖
              </h3>
            </div>
            <div className="flex flex-col gap-3">
               {heatmapData.map((dept, idx) => (
                 <div key={idx} className="bg-background-page dark:bg-white/5 p-4 rounded-xl border border-transparent flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-text-primary dark:text-white">{dept.name}</p>
                          <span className="text-[10px] text-text-secondary font-bold">({dept.headcount}人)</span>
                       </div>
                       <div className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                         dept.stressScore === 'Critical' ? 'bg-status-danger text-white' : 
                         dept.stressScore === 'High' ? 'bg-status-warning text-white' : 
                         'bg-brand-green text-white'
                       }`}>
                         {dept.stressScore === 'Critical' ? '嚴重偏離' : dept.stressScore === 'High' ? '顯著偏離' : '指標正常'}
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                             <span className="text-text-secondary">加班強度</span>
                             <span className={dept.otDeviation.startsWith('+') ? 'text-status-danger' : 'text-brand-green'}>{dept.otDeviation}</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                             <div className={`h-full rounded-full ${dept.stressScore === 'Critical' ? 'bg-status-danger' : 'bg-primary'}`} style={{ width: `${Math.min(100, parseInt(dept.otDeviation.replace(/[^0-9]/g, '')))}%` }}></div>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                             <span className="text-text-secondary">請假頻率</span>
                             <span className={dept.leaveDeviation.startsWith('+') ? 'text-status-danger' : 'text-brand-green'}>{dept.leaveDeviation}</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                             <div className={`h-full rounded-full ${dept.stressScore === 'Critical' ? 'bg-status-danger' : 'bg-status-info'}`} style={{ width: `${Math.min(100, parseInt(dept.leaveDeviation.replace(/[^0-9]/g, '')))}%` }}></div>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. AI Insight */}
      <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-4 border border-primary/10">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
             <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-text-primary dark:text-white mb-1">AI 關懷策略建議</h4>
            <p className="text-[10px] text-text-secondary dark:text-gray-400 leading-relaxed">
              根據大數據模型預測，當前「{deptName}」的異常信號主要來自於工作節奏激變。建議主管對高偏離成員啟動「預防性面談」，排除個人生活或專案壓力過載之疑慮。
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CareWeather;