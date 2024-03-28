import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'tasks.json');

export async function GET(req) {
  const { params } = req;
  const { id } = params;

  try {
    const data = await fsPromises.readFile(filePath, 'utf-8');
    const tasks = JSON.parse(data);
    const task = tasks.find(t => t.id === id);

    if (!task) {
      return new NextResponse(null, { status: 404 });
    }

    return new NextResponse(JSON.stringify(task), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error retrieving task' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// UPDATE a Task
export async function PATCH(req) {
  try {
    const tasks = await fsPromises.readFile(filePath, 'utf-8');
    const jsonArray = JSON.parse(tasks);
    // destructure from req body
    const { id, task, category, date, completed } = await req.json();
    // find the index of the task to edit
    const taskIndex = jsonArray.findIndex(task => task.id === id);
    // if task not found, return 500
    if(taskIndex < 0) {
      return new NextResponse(
        JSON.stringify({ message: 'Error reading or parsing the json file' }),
        { status: 500, headers: {'content-type': 'application/json'} }
      )
    }
  
    let desiredTask = jsonArray[taskIndex];
  
    desiredTask.task = task ? task : desiredTask.task;
    desiredTask.category = category ? category : desiredTask.category;
    desiredTask.date = date ? date : desiredTask.date;
    desiredTask.completed = completed ? completed : desiredTask.completed;
    
    // update the json array
    jsonArray[taskIndex] = desiredTask;
    // convert the json array back to the string
    const updatedTask = JSON.stringify(jsonArray);
    // write the updated task to the json file
    await fsPromises.writeFile(filePath, updatedTask);
    
    return new NextResponse(
      JSON.stringify(updatedTask),
      // JSON.stringify({ message: 'Task Successully Patched' }),
      { status: 200, headers: {'content-type': 'application/json'} }
    )
  } catch(error) {
    return new NextResponse(
      JSON.stringify({ message: 'Error reading or parsing the json file' }),
      { status: 404, headers: {'content-type': 'application/json'} }
    )
  }
}

// DELETE a Task
export async function DELETE(req) {
  try {
    // read json file
    const tasks = await fsPromises.readFile(filePath, 'utf-8');
    // parse to json array
    const jsonArray = await JSON.parse(tasks);
    // extract the "id" of the task
    const { id } = await req.json();
    // find the index of the task to edit
    const taskIndex = await jsonArray.findIndex(task => task.id === id);
    // if task not found, return 404
    if(taskIndex < 0) {
      return new NextResponse(
        JSON.stringify({ message: 'No Tasks Found' }),
        { status: 404, headers: {'content-type': 'application/json'} }
      )
    }
    // remove task from json array
    await jsonArray.splice(taskIndex, 1);
    // convert JSON back to string
    const updatedTask = JSON.stringify(jsonArray);
    // write the updated task to the json file
    await fsPromises.writeFile(filePath, updatedTask);
    
    return new NextResponse(
      JSON.stringify({ message: 'Task Successully Removed' }),
      { status: 200, headers: {'content-type': 'application/json'} }
    )
  } catch(error) {
    return new NextResponse(
      JSON.stringify({ message: 'Error reading or parsing the json file' }),
      { status: 500, headers: {'content-type': 'application/json'} }
    )
  }
}