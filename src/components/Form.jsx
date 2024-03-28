import { useAddTaskMutation } from '@/features/tasksApi'
import { useState } from 'react'

export default function Form() {
  const [addTask, { data: tasks, isLoading, isError }] = useAddTaskMutation();

  console.log('task', tasks);

  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('high');


  // { task: '', category: '', date: '', priority: '' }

  const handleSubmit = e => {
    e.preventDefault();
    // setFormData({ task: '', category: '', date: '', priority: '' })
    addTask({ task, category, date, priority })
  }

  console.log({ task, category, date, priority });

  return (
    <form onSubmit={handleSubmit}>
      {/* Task */}
      <div>
        <input
          type="text"
          placeholder="Add Your Task"
          className="w-2/3 px-4 py-2 border rounded-md block mx-auto"
          name='task'
          value={task}
          onChange={e => setTask(e.target.value)}
        />
      </div>
      {/* Category */}
      <div>
        <input
          type="text"
          placeholder="Add the Category"
          className="w-2/3 px-4 py-2 border rounded-md block mx-auto"
          name='category'
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </div>
      {/* Date */}
      <div>
        <input
          type="date"
          className="border rounded-md px-4 py-2 my-4 block mx-auto"
          name='date'
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      {/* Priorities */}
      <div>
        <select
          className='border rounded-md px-4 py-2 block mx-auto cursor-pointer'
          name='priority'
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      {/* Submit */}
      <div>
        <input
          type="submit"
          value='Add Task'
          className='bg-green-700 hover:bg-green-600 text-white rounded-md px-4 py-2 my-4 block mx-auto cursor-pointer'
        />
      </div>
    </form>
  )
}