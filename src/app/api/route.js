import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const filePath = path.join(process.cwd(), 'public/tasks.json');

// GET Tasks
export async function GET() {
  try {
    const tasks = await fsPromises.readFile(filePath, 'utf-8');
    const json = await JSON.parse(tasks);
    return NextResponse.json(json);
  } catch(error) {
    return new NextResponse(
      JSON.stringify({ message: 'No Tasks Found' }),
      { status: 404, headers: {'content-type': 'application/json'} }
    )
  }
}
  
// POST a Task
export async function POST(req) {
  try {
    const tasks = await fsPromises.readFile(filePath, 'utf-8');
    const jsonArray = await JSON.parse(tasks);
    // destructure from req body (id lagbe na, cz new task er id server generate kore dbe!)
    const { task, category, date, priority } = await req.json();
    // generate id for the new task
    const id = crypto.randomBytes(16).toString('hex');
    // create new task object
    const newTask = { id, task, category, date, priority }
    // add new task to the json array
    jsonArray.push(newTask)
    // convert JSON back to string
    const updatedTask = JSON.stringify(jsonArray);
    // write updated task to json file
    await fsPromises.writeFile(filePath, updatedTask);
    return new NextResponse(
      JSON.stringify(newTask),
      { status: 201, headers: {'content-type': 'application/json'} }
    )
  } catch(error) {
    return new NextResponse(
      JSON.stringify({ message: 'Error reading or parsing the json file' }),
      { status: 500, headers: {'content-type': 'application/json'} }
    )
  }
}
    
// UPDATE a Task
export async function PATCH(req) {
  try {
    const tasks = await fsPromises.readFile(filePath, 'utf-8');
    const jsonArray = JSON.parse(tasks);
    // destructure from req body
    const { id, task, category, date, priority } = await req.json();
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
    desiredTask.priority = priority ? priority : desiredTask.priority;
    
    // update the json array
    jsonArray[taskIndex] = desiredTask;
    // conver the json array back to the string
    const updatedTask = JSON.stringify(jsonArray);
    // write the updated task to the json file
    await fsPromises.writeFile(filePath, updatedTask);
    
    return new NextResponse(
      JSON.stringify({ message: 'Task Successully Patched' }),
      { status: 200, headers: {'content-type': 'application/json'} }
    )
  } catch(error) {
    return new NextResponse(
      JSON.stringify({ message: 'No Tasks Found' }),
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