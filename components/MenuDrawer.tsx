import React from 'react';
import { Role } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleTheme,
  currentRole,
  onRoleChange
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-[#1E1E1E] shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-white/2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">settings</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">系統設定</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-6 mb-3 text-[10px] font-bold text-primary dark:text-primary-dark uppercase tracking-widest">角色權限模擬</div>
          <div className="px-4 mb-8 space-y-2">
            <button
              onClick={() => onRoleChange('gm')}
              className={`w-full flex items-center p-4 rounded-2xl border transition-all ${currentRole === 'gm'
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                  : 'border-gray-100 dark:border-gray-800 opacity-60'
                }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${currentRole === 'gm' ? 'border-primary' : 'border-gray-400'}`}>
                {currentRole === 'gm' && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-text-primary dark:text-white">總經理 / 人資</div>
                <div className="text-[10px] text-text-secondary dark:text-gray-400 font-medium">具備全公司數據讀取權限</div>
              </div>
            </button>

            <button
              onClick={() => onRoleChange('manager')}
              className={`w-full flex items-center p-4 rounded-2xl border transition-all ${currentRole === 'manager'
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                  : 'border-gray-100 dark:border-gray-800 opacity-60'
                }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${currentRole === 'manager' ? 'border-primary' : 'border-gray-400'}`}>
                {currentRole === 'manager' && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-text-primary dark:text-white">部門主管</div>
                <div className="text-[10px] text-text-secondary dark:text-gray-400 font-medium">僅能查看所屬部門數據</div>
              </div>
            </button>
          </div>

          <div className="px-6 border-t border-gray-100 dark:border-gray-800 my-6"></div>

          <div className="px-6 mb-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">外觀風格</div>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 group-hover:rotate-12 transition-transform">
                {isDarkMode ? 'dark_mode' : 'light_mode'}
              </span>
              <span className="text-gray-900 dark:text-white font-bold">
                {isDarkMode ? '深色模式' : '淺色模式'}
              </span>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </button>

          <div className="px-6 border-t border-gray-100 dark:border-gray-800 my-6"></div>

          <div className="px-6 mb-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">關於系統</div>

          <div className="px-6 py-2">
            <h3 className="text-gray-900 dark:text-white font-extrabold text-base">正航考勤戰情中心</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-medium">專業人力資源管理解決方案</p>
            <div className="mt-4 inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-[10px] font-bold text-gray-500 dark:text-gray-400">
              版本 v2.5.1
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-white/2 text-[10px] text-center text-gray-400 font-medium tracking-tight">
          © 2024 CHI Technology Co., Ltd.
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;