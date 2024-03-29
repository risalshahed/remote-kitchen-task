import React, { useState } from 'react';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '@/features/tasksApi';

export default function EachTask({ eachTask }) {
  const [updateTask, {data: update}] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(eachTask.task);

  const { id, task, category, date, completed } = eachTask;

  // console.log('update', update);

  const handleStatusChange = async () => {
    await updateTask({ id, task: { ...eachTask, completed: !completed } });
  };

  const handleDelete = async () => {
    await deleteTask(id);
  };

  const handleEditSave = async () => {
    if (isEditing) {
      await updateTask({ id, task: editedTask, category, date, completed });
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-y-3 py-3 hover:bg-gray-100">
        <div className="flex flex-col sm:flex-row items-center gap-x-3 sm:gap-x-8 gap-y-2 px-1 sm:px-8">
          <div className='flex gap-x-2 items-center'>
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={completed}
              onChange={handleStatusChange}
            />
            {isEditing ? (
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="border-2 border-gray-300 rounded px-2"
                autoFocus
              />
            ) : (
              <ul>
                <li className={`${completed && 'line-through'} capitalize`}>{task}</li>
              </ul>
            )}
          </div>

          <div className='flex items-center gap-x-8'>
            <div className='capitalize'>{category}</div>
            <div>{date}</div>
          </div>
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-8">
          <button onClick={handleDelete} className="btn bg-red-600 text-white px-2 py-0.25 rounded-md">
            Delete
          </button>

          <button onClick={handleEditSave} className="btn bg-blue-500 text-white px-2 py-0.5 rounded-md">
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}