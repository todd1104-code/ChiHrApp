import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { WeeklyData } from '../types';

interface WeeklyTrendChartProps {
  data: WeeklyData[];
}

const CustomBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    // We want a full background bar and a foreground value bar
    // Recharts handles this often with two bars, but we can do a simple custom shape if needed.
    // However, simplest is just stacking two bars in the data or using a composed chart.
    // Let's stick to the visual provided: A gray bar background, and a colored bar inside.
    
    // In this specific implementation, we will use two bars in the chart component:
    // One for "max capacity" (gray) and one for "actual" (colored) with a negative margin or same stackId if we want them on top.
    // Actually, simply putting them in the same XAxis tick but different Bar components with 'barGap={-width}' works well for overlay.
    return <rect x={x} y={y} width={width} height={height} rx={4} ry={4} fill={fill} />;
};

const WeeklyTrendChart: React.FC<WeeklyTrendChartProps> = ({ data }) => {
  return (
    <div className="px-4 mb-24">
      <h3 className="text-text-primary text-lg font-bold mb-4 px-1">本週產能趨勢</h3>
      <div className="h-48 w-full bg-surface-light border border-gray-200 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={-32} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
             <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
             />
             <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#6B7280' }} 
                dy={10}
             />
             
             {/* Background Bar (Total Capacity) */}
             <Bar 
                dataKey="full" 
                fill="#E5E7EB" 
                barSize={32} 
                radius={[4, 4, 4, 4]}
                isAnimationActive={false}
             />
             
             {/* Foreground Bar (Actual) */}
             <Bar 
                dataKey="value" 
                barSize={32} 
                radius={[4, 4, 4, 4]}
             >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.day === '五' ? '#0A7CFF' : (entry.day === '三' ? '#EF4444' : '#0A7CFF')}
                    opacity={entry.day === '三' ? 1 : 0.8} // Using opacity to simulate the lighter blue in the design, except for Friday/Wed
                    className={entry.isToday ? 'animate-pulse' : ''}
                  />
                ))}
             </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyTrendChart;