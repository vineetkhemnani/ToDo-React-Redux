import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  lists: [
    {
      id: nanoid(),
      name: 'Default List',
      todos: [{ id: nanoid(), text: 'Hello' }],
      doneTodos: [],
    },
    {
      id: nanoid(),
      name: 'List1',
      todos: [{ id: nanoid(), text: 'List1' }],
      doneTodos: [],
    },
  ],
}

export const todoSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      const newList = {
        id: nanoid(),
        name: action.payload,
        todos: [],
        doneTodos: [],
      }
      state.lists.push(newList)
    },
    removeList: (state, action) => {
      const listIdToRemove = action.payload
      state.lists = state.lists.filter((list) => list.id !== listIdToRemove)
    },
    addTodo: (state, action) => {
      const { listId, text } = action.payload
      const list = state.lists.find((list) => list.id === listId)
      const todo = {
        id: nanoid(),
        text,
      }
      list.todos.push(todo)
    },
    removeTodo: (state, action) => {
      const { listId, todoId } = action.payload
      const list = state.lists.find((list) => list.id === listId)
      list.todos = list.todos.filter((todo) => todo.id !== todoId)
      list.doneTodos = list.doneTodos.filter((todo) => todo.id !== todoId)
    },
    completeTodo: (state, action) => {
      const { listId, todoId } = action.payload
      const list = state.lists.find((list) => list.id === listId)
      const todoToComplete = list.todos.find((todo) => todo.id === todoId)

      if (todoToComplete) {
        list.todos = list.todos.filter((todo) => todo.id !== todoId)
        list.doneTodos.push(todoToComplete)
      }
    },
  },
})

export const { addList, removeList, addTodo, removeTodo, completeTodo } =
  todoSlice.actions

export default todoSlice.reducer
