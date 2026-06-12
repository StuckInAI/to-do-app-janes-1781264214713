import { ListTodo, CheckCircle2, Circle } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  totalCount: number;
};

export default function StatsBar({ activeCount, completedCount, totalCount }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <ListTodo size={16} className="text-indigo-400" />
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Total</span>
        </div>
        <span className="text-3xl font-bold text-slate-700">{totalCount}</span>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Circle size={16} className="text-amber-400" />
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Active</span>
        </div>
        <span className="text-3xl font-bold text-amber-500">{activeCount}</span>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Done</span>
        </div>
        <span className="text-3xl font-bold text-emerald-500">{completedCount}</span>
      </div>
    </div>
  );
}
