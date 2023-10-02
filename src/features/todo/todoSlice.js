import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  todos: [{id:1, text:"Hello"}],
  doneTodos:[]
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      }
      state.todos.push(todo)
    },
    removeTodo: (state, action) => {
      // filter todo to delete using id
      // state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      // Check both todos and doneTodos for the todo with the given id
      const removeFromTodos = (todosArray) => {
        return todosArray.filter((todo) => todo.id !== action.payload)
      }

      state.todos = removeFromTodos(state.todos)
      state.doneTodos = removeFromTodos(state.doneTodos)
    },
    completeTodo: (state, action) => {
      // find todo that is completed
      const todoToComplete = state.todos.find(
        (todo) => todo.id === action.payload
      )

      if (todoToComplete) {
        // Remove the todo from todos
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)

        // Add the completed todo to doneTodos
        state.doneTodos.push(todoToComplete)
      }
    },
  },
})

export const {addTodo, removeTodo, completeTodo} = todoSlice.actions

export default todoSlice.reducer
