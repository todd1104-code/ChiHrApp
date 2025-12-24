import React from 'react';

const RealTimeView: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-4 py-4 pb-24">
      {/* Overview Card */}
      <section className="rounded-[12px] bg-background-card dark:bg-background-card-dark p-5 shadow-card dark:shadow-card-dark border border-border-light dark:border-border-dark">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-text-secondary dark:text-text-secondary-dark text-sm font-medium mb-1">今日出勤概況</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-extrabold text-text-primary dark:text-text-primary-dark tracking-tight">
                12<span className="text-xl text-text-secondary dark:text-text-secondary-dark font-bold ml-1">/ 15</span>
              </h2>
              <span className="text-sm font-bold text-status-success dark:text-status-success-dark bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md border border-green-100 dark:border-green-800">
                +2%
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-surface-selected dark:border-surface-selected-dark border-t-primary dark:border-t-primary-dark border-r-primary dark:border-r-primary-dark flex items-center justify-center bg-surface-selected/30 dark:bg-surface-selected-dark/30">
            <span className="material-symbols-outlined text-primary dark:text-primary-dark text-xl">group</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Office Bar */}
          <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary dark:text-text-secondary-dark">
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-dark shadow-sm"></span>
              辦公室
            </div>
            <div className="h-2.5 w-full bg-background-page dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary dark:bg-primary-dark rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-sm font-bold text-text-primary dark:text-text-primary-dark text-right">8</span>
          </div>
          
          {/* WFH Bar */}
          <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary dark:text-text-secondary-dark">
              <span className="w-2 h-2 rounded-full border-2 border-primary dark:border-primary-dark box-border"></span>
              居家
            </div>
            <div className="h-2.5 w-full bg-background-page dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-300 dark:bg-blue-600 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <span className="text-sm font-bold text-text-primary dark:text-text-primary-dark text-right">4</span>
          </div>

          {/* Vacation Bar */}
          <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary dark:text-text-secondary-dark">
              <span className="w-2 h-2 rounded-full bg-accent-red"></span>
              休假
            </div>
            <div className="h-2.5 w-full bg-background-page dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent-red rounded-full opacity-80" style={{ width: '20%' }}></div>
            </div>
            <span className="text-sm font-bold text-text-primary dark:text-text-primary-dark text-right">3</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="-mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-3 min-w-max pb-2">
          <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-primary dark:bg-primary-dark pl-4 pr-4 transition-transform active:scale-95 shadow-md shadow-blue-500/20">
            <span className="text-white text-sm font-bold">全部成員</span>
          </button>
          <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-background-card dark:bg-background-card-dark border border-border-light dark:border-border-dark hover:bg-background-page dark:hover:bg-white/5 pl-4 pr-4 transition-all active:scale-95 text-text-secondary dark:text-text-secondary-dark shadow-sm">
            <span className="text-sm font-medium">辦公室 (8)</span>
          </button>
          <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-background-card dark:bg-background-card-dark border border-border-light dark:border-border-dark hover:bg-background-page dark:hover:bg-white/5 pl-4 pr-4 transition-all active:scale-95 text-text-secondary dark:text-text-secondary-dark shadow-sm">
            <span className="text-sm font-medium">居家 (4)</span>
          </button>
          <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-background-card dark:bg-background-card-dark border border-border-light dark:border-border-dark hover:bg-background-page dark:hover:bg-white/5 pl-4 pr-4 transition-all active:scale-95 text-text-secondary dark:text-text-secondary-dark shadow-sm">
            <span className="text-sm font-medium">休假 (3)</span>
          </button>
        </div>
      </div>

      {/* Working List */}
      <div>
        <h3 className="text-text-secondary dark:text-text-secondary-dark/70 text-xs font-bold uppercase tracking-widest px-1 pb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-status-success dark:bg-status-success-dark animate-pulse ring-4 ring-green-100 dark:ring-green-900/20"></span>
          工作中 (12)
        </h3>
        <div className="flex flex-col gap-3">
          {/* Person 1 */}
          <div className="group flex items-center gap-4 bg-background-card dark:bg-background-card-dark p-3 rounded-[12px] border border-transparent shadow-card dark:shadow-none hover:shadow-md transition-all">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 bg-gray-200 ring-2 ring-white dark:ring-gray-700"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlgP_ifhL22zRFc8M7ZXWa4iYgBGXWRJDZ3FSD5PTIddL8HDbO3pI_0FzlMxFfI7nsKwmEkt8M_0O4WWrj8V8Y5QRX0g5CzUPbWeY6d0fcOSE6LUh9wDslRz_fhlZsMeSEDXqDl-rnoIw1KUsb7x7sGCbxegrkUhGAJMHqLda_gI4Q1tqNoaWZ5J26mGWzFnK01rmyDDM3kQxu4qmWjvNKzOeO0fJyl-LVrXKX490778FEz214S1O0BHJ6kVFJYw_nttN7TpjSYW4")'}}
              ></div>
              <div className="absolute -bottom-1 -right-1 bg-background-card dark:bg-background-card-dark rounded-full p-0.5 shadow-sm">
                <span className="material-symbols-outlined text-primary dark:text-primary-dark text-[14px] bg-surface-selected dark:bg-surface-selected-dark rounded-full p-0.5">apartment</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-text-primary dark:text-text-primary-dark text-base font-bold truncate">王小明</p>
              <p className="text-primary dark:text-primary-dark text-xs font-semibold truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-dark"></span>
                在辦公室 · 研發部
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-background-page dark:bg-white/5 flex items-center justify-center text-text-secondary dark:text-text-secondary-dark hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </button>
            </div>
          </div>

          {/* Person 2 */}
          <div className="group flex items-center gap-4 bg-background-card dark:bg-background-card-dark p-3 rounded-[12px] border border-transparent shadow-card dark:shadow-none hover:shadow-md transition-all">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 bg-gray-200 ring-2 ring-white dark:ring-gray-700"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvvhmvQ9njWw57qqZ8r-2f1JDacJ9ua_9r5JSTJ8rF5PqCtnQKNskIaqh-TW5co-RuJEtKnipZkU3lYs9DHVOAbONYcXgIuoI3Wfn7Fi3ZTX5KwapZ7iYHL6p1xDtabQJcycbzAXiAn675PppmJBHqc5jvaD7Ia2ZEzcNQW6H6sqwE1cOV0Vcq6FUK7PrT28Iv7JMag_BnBAhUULSslQBX7jrW4-EORfqKirtrAo6FTPV0PSypRlRby4fBliixo3aA3VU6VL7sz-o")'}}
              ></div>
              <div className="absolute -bottom-1 -right-1 bg-background-card dark:bg-background-card-dark rounded-full p-0.5 shadow-sm">
                <span className="material-symbols-outlined text-status-info dark:text-status-info-dark text-[14px] bg-blue-100 dark:bg-blue-900 rounded-full p-0.5">home_work</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-text-primary dark:text-text-primary-dark text-base font-bold truncate">張偉</p>
              <p className="text-text-secondary dark:text-text-secondary-dark text-xs font-medium truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-info dark:bg-status-info-dark"></span>
                居家辦公 · 09:00 上線
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-background-page dark:bg-white/5 flex items-center justify-center text-text-secondary dark:text-text-secondary-dark hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vacation List */}
      <div>
        <h3 className="text-text-secondary dark:text-text-secondary-dark/60 text-xs font-bold uppercase tracking-widest px-1 pb-3 flex items-center gap-2 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          缺勤 / 休假 (3)
        </h3>
        <div className="flex flex-col gap-3">
          <div className="group flex items-center gap-4 bg-background-page dark:bg-white/5 p-3 rounded-[12px] border border-transparent hover:bg-background-card dark:hover:bg-white/10 hover:shadow-sm transition-all">
            <div className="relative grayscale opacity-80">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 bg-gray-200"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAg8hKBVKZl4TcY-aWYvkD8Hbmp7tZBP4uJTXmLpIDUecd-M7xL9Jn4dKOdS9wSHsSvNVOz7SxbKaX6WI5OvU1-bx348vqCiwnsh2dRuZAVJLqQq0aR8gGyvlem6d09CoOKWJPceQr1paLb99GdGw-k9E1G1P22GkPQBYmAZJOGUWoZiQPMs2Jr2AYi9Lk9h8NAa8KzoURGXz7o-drnUyQ7daYTk3zgDm5ep4TVch_peAaRZhdJrTpYjYGQCt8IBqHd63wToNpXjM4")'}}
              ></div>
              <div className="absolute -bottom-1 -right-1 bg-background-card dark:bg-background-card-dark rounded-full p-0.5 shadow-sm">
                <span className="material-symbols-outlined text-accent-red text-[14px] bg-red-100 dark:bg-red-900 rounded-full p-0.5">flight</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-text-primary dark:text-text-primary-dark/70 text-base font-bold truncate">陳大衛</p>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 dark:bg-red-900/30 text-accent-red border border-red-100 dark:border-red-900">特休</span>
                <p className="text-text-secondary dark:text-text-secondary-dark/70 text-xs truncate">預計明日 09:00 返回</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeView;