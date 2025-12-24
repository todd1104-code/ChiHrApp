import React from 'react';

const ManagementHandover: React.FC = () => {
  return (
    <div className="px-4 py-4 animate-in fade-in slide-in-from-right-2">
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
           <span className="material-symbols-outlined text-status-warning dark:text-status-warning-dark">diversity_3</span>
        </div>
        <div>
           <h3 className="font-bold text-text-primary dark:text-text-primary-dark">職務代理與交接中心</h3>
           <p className="text-xs text-text-secondary dark:text-text-secondary-dark">確保業務不中斷的強制交接機制</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Active Handover Card */}
        <div className="bg-surface-card dark:bg-surface-card-dark rounded-2xl p-5 shadow-card dark:shadow-none border-l-4 border-status-warning dark:border-status-warning-dark">
          <div className="flex justify-between items-start mb-3">
             <div className="flex items-center gap-2">
               <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-status-warning dark:text-status-warning-dark text-[10px] font-bold rounded">請假中</span>
               <span className="text-text-secondary dark:text-text-secondary-dark text-xs">直到 5/24 (週五)</span>
             </div>
             <span className="material-symbols-outlined text-gray-300">more_horiz</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAg8hKBVKZl4TcY-aWYvkD8Hbmp7tZBP4uJTXmLpIDUecd-M7xL9Jn4dKOdS9wSHsSvNVOz7SxbKaX6WI5OvU1-bx348vqCiwnsh2dRuZAVJLqQq0aR8gGyvlem6d09CoOKWJPceQr1paLb99GdGw-k9E1G1P22GkPQBYmAZJOGUWoZiQPMs2Jr2AYi9Lk9h8NAa8KzoURGXz7o-drnUyQ7daYTk3zgDm5ep4TVch_peAaRZhdJrTpYjYGQCt8IBqHd63wToNpXjM4")'}}></div>
               <div>
                 <p className="font-bold text-text-primary dark:text-text-primary-dark">陳大衛</p>
                 <p className="text-xs text-text-secondary dark:text-text-secondary-dark">申請人</p>
               </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">arrow_forward</span>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlgP_ifhL22zRFc8M7ZXWa4iYgBGXWRJDZ3FSD5PTIddL8HDbO3pI_0FzlMxFfI7nsKwmEkt8M_0O4WWrj8V8Y5QRX0g5CzUPbWeY6d0fcOSE6LUh9wDslRz_fhlZsMeSEDXqDl-rnoIw1KUsb7x7sGCbxegrkUhGAJMHqLda_gI4Q1tqNoaWZ5J26mGWzFnK01rmyDDM3kQxu4qmWjvNKzOeO0fJyl-LVrXKX490778FEz214S1O0BHJ6kVFJYw_nttN7TpjSYW4")'}}></div>
               <div>
                 <p className="font-bold text-text-primary dark:text-text-primary-dark">王小明</p>
                 <p className="text-xs text-text-secondary dark:text-text-secondary-dark">代理人</p>
               </div>
            </div>
          </div>

          <div className="bg-background-page dark:bg-white/5 rounded-xl p-3 mb-3">
             <p className="text-xs font-bold text-text-secondary dark:text-text-secondary-dark mb-2">待辦交接事項</p>
             <ul className="space-y-2">
               <li className="flex items-start gap-2 text-xs text-text-primary dark:text-text-primary-dark">
                 <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                 客戶 A 報價單審核 (已完成)
               </li>
               <li className="flex items-start gap-2 text-xs text-text-primary dark:text-text-primary-dark">
                 <span className="material-symbols-outlined text-gray-400 text-sm">radio_button_unchecked</span>
                 週三例會主持代理 (未確認)
               </li>
             </ul>
          </div>
          
          <button className="w-full py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/30">
            提醒代理人確認
          </button>
        </div>

        {/* Empty State / Add New */}
        <button className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
           <span className="material-symbols-outlined mb-1">add_circle</span>
           <span className="text-sm font-bold">新增代理申請</span>
        </button>
      </div>
    </div>
  );
};

export default ManagementHandover;