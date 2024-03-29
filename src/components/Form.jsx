import { useAddTaskMutation } from '@/features/tasksApi'
import { useState } from 'react'

export default function Form() {
  const [addTask, { data: tasks, isLoading, isError }] = useAddTaskMutation();

  console.log('task', tasks);

  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // setFormData({ task: '', category: '', date: '', priority: '' })

    // Convert both dates to the comparable format
    const currentDate = new Date().toISOString().split('T')[0];

    if (task && category && date) {
      if (date >= currentDate) {
        addTask({ task, category, date });
        // Clear input fields after adding the task
        setTask('');
        setCategory('');
        setDate('');
      } else {
        alert('Please select a future date for the task.');
      }
    } else {
      alert('Please select all the fields.');
    }
  }

  // console.log(task);

  return (
    <form onSubmit={handleSubmit}>
      {/* Task */}
      <div>
        <input
          type="text"
          placeholder="Add Your Task"
          className="w-5/6 sm:w-2/3 px-4 py-2 border rounded-md block mx-auto"
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
          <option value="framework">Framework</option>
          <option value="ftate">State Management</option>
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