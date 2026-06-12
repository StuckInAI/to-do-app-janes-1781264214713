import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'high', label: 'High', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4">
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task…"
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-sm transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-200 text-white rounded-xl px-4 py-2.5 flex items-center gap-1.5 text-sm font-semibold transition shadow-sm"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-medium">Priority:</span>
        {priorities.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold border transition',
              p.color,
              priority === p.value ? 'ring-2 ring-offset-1 ring-indigo-400 scale-105' : 'opacity-60 hover:opacity-100'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
