// import { NextResponse } from 'next/server';
// import fsPromises from 'fs/promises';
// import path from 'path';

// const filePath = path.join(process.cwd(), 'data', 'tasks.json');

// export async function GET(req, context) {
//   // console.log(req);
//   const { params } = context;
//   // const { id } = params;

//   try {
//     const data = await fsPromises.readFile(filePath, 'utf-8');
//     // const tasks = JSON.parse(data);
//     const task = data.find(t => params.id == t.id);

//     if (!task) {
//       return new NextResponse(null, { status: 404 });
//     }

//     return NextResponse.json({ task })

//     // return new NextResponse(JSON.stringify(task), {
//     //   status: 200,
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     // });
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ message: 'Error retrieving task' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// DELETE a Task
// export async function DELETE(req) {
//   try {
//     // read json file
//     const tasks = await fsPromises.readFile(filePath, 'utf-8');
//     // parse to json array
//     const jsonArray = await JSON.parse(tasks);
//     // extract the "id" of the task
//     const { id } = await req.json();
//     // find the index of the task to edit
//     const taskIndex = await jsonArray.findIndex(task => task.id === id);
//     // if task not found, return 404
//     if(taskIndex < 0) {
//       return new NextResponse(
//         JSON.stringify({ message: 'No Tasks Found' }),
//         { status: 404, headers: {'content-type': 'application/json'} }
//       )
//     }
//     // remove task from json array
//     // await jsonArray.splice(taskIndex, 1);
//     const newArray = jsonArray.filter(j => j.id != id)
//     // convert JSON back to string
//     const updatedTask = JSON.stringify(newArray);
//     // write the updated task to the json file
//     await fsPromises.writeFile(filePath, updatedTask);
    
//     return new NextResponse(
//       JSON.stringify(newArray),
//       { status: 200, headers: {'content-type': 'application/json'} }
//     )
//   } catch(error) {
//     return new NextResponse(
//       JSON.stringify({ message: 'Error reading or parsing the json file' }),
//       { status: 500, headers: {'content-type': 'application/json'} }
//     )
//   }
// }