import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const filePath = path.join(process.cwd(), 'data/tasks.json');

console.log('filePath', filePath)

// GET Tasks
export async function GET() {
  try {
    console.log('Get From Here')
    const tasks = await fsPromises.readFile(filePath, 'utf-8');
    const json = await JSON.parse(tasks);
    return NextResponse.json(json);
  } catch(error) {
    console.log(error)
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
    const { task, category, date, completed } = await req.json();
    // generate id for the new task
    const id = crypto.randomBytes(16).toString('hex');
    // create new task object
    const newTask = { id, task, category, date, completed }
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