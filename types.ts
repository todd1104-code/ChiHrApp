export type Role = 'gm' | 'manager';

export interface Department {
  id: string;
  name: string;
}

export interface DiagnosisItem {
  id: string;
  type: 'emergency' | 'vacation';
  icon: string;
  title: string;
  count: number;
  countUnit: string;
  reason: string;
  impactLevel: 'High' | 'Low' | 'Medium';
  impactValue: string;
  colorClass: string;
  iconBgClass: string;
}

export interface WeeklyData {
  day: string;
  value: number;
  full: number;
  isToday?: boolean;
}