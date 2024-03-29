import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";
// import crypto from 'crypto';

const filePath = path.join(process.cwd(), "data/tasks.json");

// DELETE a Task
export async function DELETE(req, { params }) {
  try {
    // read json file
    const tasks = await fsPromises.readFile(filePath, "utf-8");
    // parse to json array
    const jsonArray = await JSON.parse(tasks);

    //console.log('Request', id)
    const { id } = params;

    // find the index of the task to edit
    // console.log("jsonArray", jsonArray);
    const taskIndex = await jsonArray.findIndex((task) => task.id == id);

    // console.log("taskIndex", taskIndex);
    // if task not found, return 404
    if (taskIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "No Tasks Found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }
    // remove task from json array
    // await jsonArray.splice(taskIndex, 1);
    const newArray = jsonArray.filter((j) => j.id != id);
    // convert JSON back to string
    const updatedTask = JSON.stringify(newArray);
    // write the updated task to the json file
    // console.log("updatedTask", updatedTask);
    await fsPromises.writeFile(filePath, updatedTask);

    return new NextResponse(JSON.stringify(newArray), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    //console.log('Test', error)
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the json file" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

// UPDATE a Task
export async function PATCH(req, { params }) {
  // console.log("Update Request");
  try {
    const tasks = await fsPromises.readFile(filePath, "utf-8");
    const jsonArray = JSON.parse(tasks);
    // destructure from req body
    const { id } = params;
    const { task, category, date, completed } = await req.json();

    // find the index of the task to edit
    const taskIndex = jsonArray.findIndex((task) => task.id == id);
    // if task not found, return 500
    if (taskIndex < 0) {
      return new NextResponse(
        JSON.stringify({ message: "Error reading or parsing the json file" }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    let desiredTask = jsonArray[taskIndex];

    desiredTask.task = task ? task : desiredTask.task;
    desiredTask.category = category ? category : desiredTask.category;
    desiredTask.date = date ? date : desiredTask.date;
    desiredTask.completed = (completed == undefined || null || '') ? false : completed;

    // update the json array
    jsonArray[taskIndex] = desiredTask;
    // convert the json array back to the string
    const updatedTask = JSON.stringify(jsonArray);
    // write the updated task to the json file
    await fsPromises.writeFile(filePath, updatedTask);

    return new NextResponse(
      JSON.stringify(updatedTask),
      // JSON.stringify({ message: 'Task Successully Patched' }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    // console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the json file" }),
      { status: 404, headers: { "content-type": "application/json" } }
    );
  }
}