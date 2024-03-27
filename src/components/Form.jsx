import React from 'react'

export default function Form() {
  return (
    <form>
      {/* Task */}
      <div>
        <input
          type="text"
          placeholder="Add Your Task"
          className="w-2/3 px-4 py-2 border rounded-md block mx-auto"
        />
      </div>
      {/* Date */}
      <div>
        <input
          type="date"
          className="border rounded-md px-4 py-2 my-4 block mx-auto"
        />
      </div>
      {/* Priorities */}
      <div>
        <select
          className='border rounded-md px-4 py-2 block mx-auto cursor-pointer'
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
