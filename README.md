# Task Management Application

[Live Website](http://localhost:3000)

## Technologies used
- Next JS 14 App Router
- Redux RTK Query
- Tailwind CSS
- Daisy UI

## Getting Started

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
