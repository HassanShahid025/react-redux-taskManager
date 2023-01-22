import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
    updateTask: (state, action) => {
        const index = state.findIndex(task => task.id === action.payload.id);
        state[index] = { ...state[index], ...action.payload.updatedTask };
    },
    removeTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    },
    createTask: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setTasks, updateTask, removeTask, createTask } = tasksSlice.actions;

export default tasksSlice.reducer;