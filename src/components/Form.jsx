import { useAddTaskMutation } from '@/features/tasksApi'
import { useState } from 'react'

export default function Form() {
  const [addTask, { data: tasks, isLoading, isError }] = useAddTaskMutation();

  console.log('task', tasks);

  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  // { task: '', category: '', date: '', priority: '' }

  const handleSubmit = e => {
    e.preventDefault();
    // setFormData({ task: '', category: '', date: '', priority: '' })
    if(task && category && date) {
      addTask({ task, category, date })
    } else {
      alert('Please Select All the Fields')
    }
  }

  console.log(task);

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
        <select
          className='border rounded-md px-4 py-2 my-4 block mx-auto cursor-pointer'
          name='priority'
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          <option value="design">Design</option>
          <option value="language">Language</option>
          <option value="library">Library</option>
        </select>
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