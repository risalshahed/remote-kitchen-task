# Task Management Application

## Technologies used
- Next JS 14 App Router
- Redux RTK Query
- Tailwind CSS
- Daisy UI

[Front End Live Website](https://task-management-ap.netlify.app)

(Not Accessible to full CRUD Operations as it's only the view part)

To get full acess of the server & be adle to see all CRUD Operations
```bash
git clone https://github.com/risalshahed/remote-kitchen-task.git
cd remote-kitchen-task
yarn
yarn dev
```
And Open the URL of the Local Repository

### Server Side
- Initial data in data/tasks.json
- routes in src/app/api
  - GET & POST in route.js
    - PATCH & DELETE in [id]/route.js

### Client Side
- Providers
  - Redux Provider (provides the "store" of redux)
    - Root Layout
    - RTK Query Feature
      - tasksApi      
    - Home Page
      - Designed with Tailwind CSS & Daisy UI
      - Components
        - Header
        - Tasks.jsx to Get All data
        - EachTask.jsx to display each datum & keep the components clean, Update & Delete datum is handled here
        - Form.jsx to Add a new data
        - Loader & Toast to display while loading & a toast if a datum is successfully added