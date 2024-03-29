import { useGetTasksQuery } from '@/features/tasksApi';
import { useState } from 'react';
import Loader from './Loader';
import EachTask from './EachTask';

export default function Tasks() {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const [status, setStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');

  const handleStatus = status => {
    setStatus(status);
  };

  let content;
  let filteredTasks = tasks;

  if (isLoading) content = <Loader />;

  if (!isLoading && isError) content = <div className='text-red-600'>{error?.message}</div>;

  if (!isLoading && !isError && tasks?.length === 0) content = <div>No Task Found</div>;

  // Filtering logic
  filteredTasks = tasks?.filter(task => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && task.completed) ||
      (status === 'incomplete' && !task.completed);
    const matchesSearchText = task.task.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category ? task.category === category : true;
    return matchesStatus && matchesSearchText && matchesCategory;
  });

  if (!isLoading && !isError && filteredTasks?.length > 0) {
    content = filteredTasks.map(task => <EachTask key={task.id} eachTask={task} />);
  }

  // total & completed tasks
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter(task => task.completed).length;

  return (
    <div>
      <h2 className="font-bold text-2xl text-center text-gray-700 pt-8 pb-4">Upcoming Tasks</h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-x-5">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md px-4 py-2 my-2 sm:my-4 cursor-pointer">
          <option value="">Categories</option>
          <option value="design">Design</option>
          <option value="language">Language</option>
          <option value="library">Library</option>
          <option value="framework">Framework</option>
          <option value="state">State Management</option>
        </select>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="w-5/6 sm:w-auto border rounded-md px-4 py-2 my-2 sm:my-4"
        />
      </div>
      <div className="flex justify-center gap-x-2 sm:gap-x-5 my-4">
        <button
          onClick={() => handleStatus('all')}
          className={`border border-blue-700 rounded-md px-2 py-0.5 ${status === 'all' && 'bg-blue-700 hover:bg-blue-600 text-white'}`}>
            All
        </button>
        <button
          onClick={() => handleStatus('completed')}
          className={`border border-blue-700 rounded-md px-2 py-0.5 ${status === 'completed' && 'bg-blue-700 hover:bg-blue-600 text-white'}`}>
            Completed
        </button>
        <button
          onClick={() => handleStatus('incomplete')}
          className={`border border-blue-700 rounded-md px-2 py-0.5 ${status === 'incomplete' && 'bg-blue-700 hover:bg-blue-600 text-white'}`}>
          Incomplete
        </button>
      </div>
      {/* all tasks */}
      <div>{content}</div>
      {/* task counter */}
      {
        totalTasks && (
          completedTasks !== 0 && (
            <h4 className="w-5/6 sm:w-1/2 text-center border border-gray-400 hover:bg-gray-100 px-4 py-2 mx-auto my-10 rounded-md font-semibold text-lg">
              {completedTasks} out of {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} {completedTasks === 1 ? 'is' : 'are'} completed
            </h4>
          )
        )
      }
    </div>
  )
}