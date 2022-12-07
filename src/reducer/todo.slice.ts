import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IState {
  list: string[];
  isVisibleAlert: boolean;
}

const initialState: IState = {
  list: localStorage.todo ? JSON.parse(localStorage.todo) : [],
  isVisibleAlert: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload);
      localStorage.setItem("todo", JSON.stringify(state.list));
    },
    resetTodo: (state) => {
      state.list = [];
      localStorage.clear();
    },
    todoIsDone: (state, action) => {
      state.list = state.list.filter(
        (todo) => String(todo) !== String(action.payload)
      );
      localStorage.setItem("todo", JSON.stringify(state.list));
    },
    makeAlertVisible: (state) => {
      state.isVisibleAlert = true;
    },
    makeAlertHidden: (state) => {
      state.isVisibleAlert = false;
    },
  },
});

export default todoSlice.reducer;
export const {
  addTodo,
  resetTodo,
  todoIsDone,
  makeAlertVisible,
  makeAlertHidden,
} = todoSlice.actions;
