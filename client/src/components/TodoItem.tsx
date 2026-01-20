import { useState } from 'react';
import { updateTodo, type Todo } from '../api/todos'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  todo: Todo;
}

const STATUS_COLORS = {
  CREATED: 'bg-gray-100 text-gray-800',
  ON_GOING: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  PROBLEM: 'bg-red-100 text-red-800',
};

export function TodoItem({ todo }: Props) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [problemDesc, setProblemDesc] = useState(todo.problem_desc || '');

  const mutation = useMutation({
    mutationFn: (data: Partial<Todo>) => updateTodo(todo.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setIsEditing(false);
    },
  });

  const handleStatusChange = (newStatus: Todo['status']) => {
    if (newStatus === 'PROBLEM') {
      setIsEditing(true);
      mutation.mutate({ status: 'PROBLEM' }); 
    } else {
      mutation.mutate({ status: newStatus });
    }
  };

  const saveProblem = () => {
    mutation.mutate({ status: 'PROBLEM', problem_desc: problemDesc });
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white transition-all hover:shadow-md">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{todo.title}</h3>
          
          {/* AI Recommendation Box */}
          {todo.ai_recommendation && (
            <div className="mt-3 p-3 bg-indigo-50 border border-indigo-100 rounded-md text-sm text-indigo-900">
              <div className="flex items-center gap-2 mb-1 text-indigo-700 font-bold">
                <span>✨ AI Solution</span>
              </div>
              {todo.ai_recommendation}
            </div>
          )}
        </div>

        <select
          value={todo.status}
          onChange={(e) => handleStatusChange(e.target.value as Todo['status'])}
          className={`text-xs font-bold uppercase px-3 py-1 rounded-full border-0 cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 ${STATUS_COLORS[todo.status]}`}
        >
          <option value="CREATED">Created</option>
          <option value="ON_GOING">On Going</option>
          <option value="COMPLETED">Completed</option>
          <option value="PROBLEM">Problem</option>
        </select>
      </div>

      {/* Problem Description Input */}
      {(todo.status === 'PROBLEM' || isEditing) && (
        <div className="mt-4 bg-red-50 p-3 rounded border border-red-100">
          <label className="block text-xs font-bold text-red-700 uppercase mb-2">Describe the Issue</label>
          <textarea
            className="w-full p-2 border border-red-200 rounded text-sm focus:outline-none focus:border-red-500 bg-white"
            rows={2}
            value={problemDesc}
            onChange={(e) => setProblemDesc(e.target.value)}
            placeholder="E.g., Connection refused on port 5432..."
          />
          <div className="flex justify-end mt-2">
            <button 
              onClick={saveProblem}
              disabled={mutation.isPending}
              className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 disabled:opacity-50"
            >
              {mutation.isPending ? 'Saving...' : 'Update & Ask AI'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}