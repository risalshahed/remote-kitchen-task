import { tasksApi } from '@/features/tasksApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer
  },
  middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(tasksApi.middleware)
})