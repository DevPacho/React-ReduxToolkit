import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Task 1",
    description: "Learn React Redux Toolkit",
    completed: false
  },
  {
    id: "2",
    title: "Task 2",
    description: "Get my first job as dev!",
    completed: false
  }
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    addTask: (previousState, action) => {
      previousState.push(action.payload);
    },

    updateTask: (previousState, action) => {
      const {id, title, description} = action.payload;

      const taskFound = previousState.find((task) => task.id === id);
      if (taskFound) {
        taskFound.title = title;
        taskFound.description = description;
      }
    },

    deleteTask: (previousState, action) => {
      const taskFound = previousState.find((task) => task.id === action.payload);

      if (taskFound) {
        previousState.splice(previousState.indexOf(taskFound), 1);
      }
    },
  }
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
