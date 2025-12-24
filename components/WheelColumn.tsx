import React, { useEffect, useRef } from 'react';

export interface WheelColumnProps {
    options: { value: string | number; label: string }[];
    value: string | number;
    onChange: (val: any) => void;
}

const WheelColumn: React.FC<WheelColumnProps> = ({ options, value, onChange }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const itemHeight = 44;

    useEffect(() => {
        const index = options.findIndex(o => o.value === value);
        if (scrollRef.current && index !== -1) {
            scrollRef.current.scrollTop = index * itemHeight;
        }
    }, [value, options]);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const index = Math.round(scrollRef.current.scrollTop / itemHeight);
        if (options[index] && options[index].value !== value) {
            onChange(options[index].value);
        }
    };

    return (
        <div className="relative h-[220px] flex-1 overflow-hidden">
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="h-full overflow-y-auto no-scrollbar snap-y snap-mandatory py-[88px]"
                style={{ scrollBehavior: 'smooth' }}
            >
                {options.map((opt, i) => (
                    <div
                        key={i}
                        className={`h-[44px] flex items-center justify-center snap-center transition-all duration-200 ${opt.value === value ? 'text-primary font-bold text-lg' : 'text-gray-400 text-sm opacity-40 scale-90'}`}
                    >
                        {opt.label}
                    </div>
                ))}
                <div className="h-[88px] shrink-0"></div>
            </div>
        </div>
    );
};

export default WheelColumn;
