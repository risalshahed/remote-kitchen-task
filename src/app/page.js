'use client';

import Form from "@/components/Form";
import { useGetTasksQuery } from "@/features/tasksApi";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: task, isLoading, isError } = useGetTasksQuery();

  // console.log(task);

  const [status, setStatus] = useState('all');
  // const [tasks, setTasks] = useState([]);

  const handleStatus = status => {
    setStatus(status);
  }

  return (
    <div className="max-w-[768px] mx-auto py-12">
      <header>
        <h1 className="font-bold text-3xl text-center text-gray-700 pb-12">Task Management Application</h1>
      </header>

      <main>
        {/* Adding Tasks' Form */}
        <Form />

        

        {/* Task List */}
        <h2 className="font-bold text-2xl text-center text-gray-700 pt-8 pb-4">Upcoming Tasks</h2>
        {/* Search & Priority */}
        <div className="flex justify-center gap-x-5">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-4 py-2 my-4"
          />
          <select className="border rounded-md px-4 py-2 my-4 cursor-pointer">
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        {/* List */}
        <div className="flex justify-center gap-x-5">
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
      </main>

    </div>
  );
}