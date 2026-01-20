import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getTodos, createTodo } from './api/todos';
import { useState } from 'react';
import { TodoItem } from './components/TodoItem'; 

const queryClient = new QueryClient();

function TodoApp() {
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');
  
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos', search], 
    queryFn: () => getTodos(search),
  });

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTitle('');
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center"> Technical Test Dashboard</h1>
        
        {/* CONTROLS: Add & Search */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
          
          {/* Add Input */}
          <div className="flex gap-2">
            <input 
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Add a new task..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && newTitle && mutation.mutate(newTitle)}
            />
            <button 
              onClick={() => newTitle && mutation.mutate(newTitle)}
              disabled={mutation.isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              Add
            </button>
          </div>

          {/* Search Input */}
          <input 
            className="w-full p-2 border-b border-gray-200 focus:border-blue-500 outline-none text-sm"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOADING / ERROR STATES */}
        {isLoading && <p className="text-center text-gray-500">Loading tasks...</p>}
        {error && <p className="text-center text-red-500">Error: Could not fetch data.</p>}

        {/* LIST */}
        <div className="space-y-4">
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {!isLoading && todos?.length === 0 && (
            <p className="text-center text-gray-400 mt-10">No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}