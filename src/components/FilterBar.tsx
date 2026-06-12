import { Search, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { Filter } from '@/types';

type FilterBarProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  search: string;
  setSearch: (s: string) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  search,
  setSearch,
  onClearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="Search tasks…"
          className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                'px-4 py-1.5 rounded-full text-xs font-semibold transition',
                filter === f.value
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-white text-slate-500 hover:bg-indigo-50 border border-slate-200'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-600 transition font-medium"
          >
            <Trash2 size={14} />
            Clear {completedCount} completed
          </button>
        )}
      </div>
    </div>
  );
}
