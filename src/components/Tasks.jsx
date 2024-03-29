import { useGetTasksQuery } from '@/features/tasksApi';
import { useState } from 'react'
import Loader from './Loader';
import EachTask from './EachTask';

export default function Tasks() {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  console.log('task', tasks);

  const [status, setStatus] = useState('all');
  // const [tasks, setTasks] = useState([]);

  const handleStatus = status => {
    setStatus(status);
  }

  let content;
  let filteredTasks = tasks;

  if(isLoading) content = <Loader />

  if(!isLoading && isError) content = <div className='text-red-600'>{error?.message}</div>
  
  if(!isLoading && !isError && tasks?.length === 0) content = <div>No Task Found</div>

  if (status === 'completed') {
    filteredTasks = tasks?.filter(task => task.completed);
  } else if (status === 'incomplete') {
    filteredTasks = tasks?.filter(task => !task.completed);
  }

  if(!isLoading && !isError && filteredTasks?.length > 0) {
    content = filteredTasks.map(
      task => <EachTask key={task.id} eachTask={task} />
    )
  }

  return (
    <div>
      {/* Task List */}
      <h2 className="font-bold text-2xl text-center text-gray-700 pt-8 pb-4">Upcoming Tasks</h2>
      {/* Search & Category */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-x-5">
        {/* category */}
        <select className="border rounded-md px-4 py-2 my-2 sm:my-4 cursor-pointer">
          <option value="">Categories</option>
          <option value="design">Design</option>
          <option value="language">Language</option>
          <option value="library">Library</option>
        </select>
        {/* search */}
        <input
          type="text"
          placeholder="Search"
          className="w-5/6 sm:w-auto border rounded-md px-4 py-2 my-2 sm:my-4"
        />
      </div>
      {/* List */}
      <div className="flex justify-center gap-x-2 sm:gap-x-5 my-4">
        <button
          onClick={() => handleStatus('all')}
          className={`border border-blue-700 rounded-md px-2 py-0.5 ${status === 'all' && 'bg-blue-700 hover:bg-blue-600 text-white'}`}>
            All
        </button>
        <button
          onClick={() => handleStatus('completed')}
          className={`border border-blue-700 rounded-md px-2 py-0.5 ${status === 'completed' && 'bg-blue-700 hover:bg-blue-600 text-white'}`}
          >
            Completed
        </button>
        <button
          onClick={() => handleStatus('incomplete')}
          className={`border border-blue-700 rounded-md px-2 py-0.5 ${status === 'incomplete' && 'bg-blue-700 hover:bg-blue-600 text-white'}`}
        >
          Incomplete
        </button>
      </div>
      {/* Updated Tasks */}
      <div>
        {content}
      </div>
    </div>
  )
}