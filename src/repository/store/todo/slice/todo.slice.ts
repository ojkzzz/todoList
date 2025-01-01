import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IList {
  text: string;
  isDone: boolean;
  isDeleted: boolean;
}

interface IState {
  list: IList[];
  isVisibleAlert: boolean;
}

const getTodos = () => {
  if (localStorage.todo) {
    return JSON.parse(localStorage.todo);
  }
  return [];
};

const initialState: IState = {
  list: getTodos(),
  isVisibleAlert: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({
        text: action.payload,
        isDone: false,
        isDeleted: false,
      });
      localStorage.setItem("todo", JSON.stringify(state.list));
    },
    resetTodo: (state) => {
      state.list = [];
      localStorage.clear();
    },
    moveToTrash: (state, action) => {
      state.list[action.payload].isDeleted = true;
      state.list[action.payload].isDone = false;
      localStorage.setItem("todo", JSON.stringify(state.list));
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter(
        (todo) => String(todo.text) !== String(action.payload)
      );
      localStorage.setItem("todo", JSON.stringify(state.list));
    },
    doneTodo: (state, action) => {
      state.list[action.payload].isDone = true;
      localStorage.setItem("todo", JSON.stringify(state.list));
    },
    returnTodo: (state, action) => {
      state.list[action.payload].isDone = false;
      state.list[action.payload].isDeleted = false;
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
  deleteTodo,
  doneTodo,
  returnTodo,
  moveToTrash,
  makeAlertVisible,
  makeAlertHidden,
} = todoSlice.actions;
