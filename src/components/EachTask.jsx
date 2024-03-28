import React, { useState } from 'react';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '@/features/tasksApi';

export default function EachTask({ eachTask }) {
  const [updateTask, {data: update}] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(eachTask.task);

  const { id, task, category, date, completed } = eachTask;

  console.log('update', update);

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
    <div className="flex flex-col sm:flex-row justify-center items-center gap-y-3 py-3 hover:bg-gray-100 border">
      <div className="flex gap-x-2 px-5">
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

      <div className="flex items-center gap-x-2 md:gap-x-5">
        <div>{category}</div>
        <div>{date}</div>

        <button onClick={handleDelete} className="btn bg-red-600 text-white px-2 py-0.25 rounded-md">
          Delete
        </button>

        <button onClick={handleEditSave} className="btn bg-blue-500 text-white px-2 py-0.5 rounded-md">
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}









// import React from 'react'

// export default function EachTask({ eachTask }) {
//   const { task, category, date, completed } = eachTask;

//   console.log(task);
//   console.log(category);
//   console.log(date);
//   console.log(completed);

//   return (
//     <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-y-3 py-3 hover:bg-gray-100 border">
//       <div className="flex gap-x-4">
//         <input
//           type="checkbox"
//           className="cursor-pointer"
//           // checked={completed ? true : false}
//           // onChange={() => handleStatusChange(id)}
//         />
//         {/* Check if 'Editing' mode is ON */}
//         {/* {isEditing ? (
//           <input
//             type="text"
//             value={editedName}
//             // onChange={(e) => setEditedName(e.target.value)}
//             // className="border-2 border-gray-300 rounded px-2"
//             // autoFocus
//           />
//         ) : (
//           <ul>
//             <li className={`${completed && 'line-through'} capitalize`}>{name}</li>
//           </ul>
//         )} */}
//       </div>

//       {/* colors for "priority" */}
//       <div className="flex items-center gap-x-2 sm:gap-x-3">
//         <div
//           // className={`h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${color === 'green' && 'bg-green-500'}`}
//           // onClick={() => handleColorChange(id, 'green')}
//         >{task}</div>

//         <div
//           // className={`h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${color === 'yellow' && 'bg-yellow-500'}`}
//           // onClick={() => handleColorChange(id, 'yellow')}
//         >{category}</div>

//         <div
//           // className={`h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${color === 'red' && 'bg-red-500'}`}
//           // onClick={() => handleColorChange(id, 'red')}
//         >{date}</div>

//         {/* delete handler */}
//         <button
//           // onClick={() => handleDelete(id)}
//           className="btn bg-red-600 text-white px-2 py-0.25 rounded-md"
//         >
//           Delete
//         </button>

//         {/* edit handler */}
//         <button
//           // onClick={() => toggleEdit(id, editedName)}
//           className="btn bg-blue-500 text-white px-2 py-0.5 rounded-md"
//         >
//           {/* {isEditing ? 'Save' : 'Edit'} */}
//           Edit
//         </button>

//       </div>
//     </div>
//   )
// }
