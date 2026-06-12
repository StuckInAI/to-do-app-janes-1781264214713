import { useState } from 'react';
import { Check, Trash2, Pencil, X, Save } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityStyles: Record<string, string> = {
  low: 'border-l-4 border-emerald-400',
  medium: 'border-l-4 border-amber-400',
  high: 'border-l-4 border-rose-400',
};

const priorityBadge: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-600',
  medium: 'bg-amber-100 text-amber-600',
  high: 'bg-rose-100 text-rose-600',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    onEdit(todo.id, editText);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(
        'bg-white rounded-2xl shadow-sm flex items-center gap-3 px-4 py-3 transition group',
        priorityStyles[todo.priority],
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 hover:border-indigo-400'
        )}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check size={13} className="text-white" strokeWidth={3} />}
      </button>

      {/* Text / Edit input */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-slate-50 border border-indigo-300 rounded-lg px-2 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        ) : (
          <span
            className={clsx(
              'block text-sm font-medium text-slate-700 truncate',
              todo.completed && 'line-through text-slate-400'
            )}
          >
            {todo.text}
          </span>
        )}
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={clsx(
              'text-xs px-2 py-0.5 rounded-full font-semibold capitalize',
              priorityBadge[todo.priority]
            )}
          >
            {todo.priority}
          </span>
          <span className="text-xs text-slate-400">
            {new Date(todo.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-indigo-500 hover:bg-indigo-50 transition"
              aria-label="Save"
            >
              <Save size={15} />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition"
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-500 transition"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
