import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeTodo, completeTodo, addTodo } from '../features/todo/todoSlice'
import { useState } from 'react'
import AddTodo from './AddTodo'

const Todos = ({listId}) => {
  // const list = useSelector((state) => state.lists[1]) // Access the lists slice
  const lists = useSelector((state)=>(state.lists));
  const list = lists.find((list) => list.id === listId)
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)

  const handleCompleteTodo = (listId, todoId) => {
    setIsChecked(!isChecked)
    dispatch(completeTodo({ listId, todoId }))
  }

  const handleAddTodo = (listId, text) => {
    dispatch(addTodo({ listId, text }))
  }

  const handleRemoveTodo = (listId, todoId) => {
    dispatch(removeTodo({ listId, todoId }))
  }

  return (!list)?'List deleted':(
    <div className="p-5">
      {/* {list.map((list) => ( */}
        <div className="grid grid-cols-3 gap-6" key={list.id}>
          <div className="todos bg-yellow-400 p-4 rounded">
            <h1 className="font-bold text-center text-white mb-3">
              {list.name}
            </h1>
            <ul>
              {list.todos.map((todo) => (
                <li className="bg-gray-100 mb-2 p-2 rounded" key={todo.id}>
                  <div className="flex items-center justify-between">
                    <input
                      type="checkbox"
                      // checked={isChecked}
                      onChange={() => handleCompleteTodo(list.id, todo.id)}
                    />
                    <p className="ml-2">{todo.text}</p>
                    <button
                      onClick={() => handleRemoveTodo(list.id, todo.id)}
                      className="bg-red-600 text-white p-1 hover:bg-red-500 rounded"
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <AddTodo listId={list.id} onAddTodo={handleAddTodo} />

          <div className="doneTodos bg-green-400 p-4 rounded">
            <h1 className="font-bold text-center text-white mb-3">
              Completed Todos
            </h1>
            <ul>
              {list.doneTodos.map((todo) => (
                <li className="bg-gray-100 mb-2 p-2 rounded" key={todo.id}>
                  <div className="flex items-center justify-between">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        handleAddTodo(list.id, todo.text)
                        handleRemoveTodo(list.id, todo.id)
                      }}
                    />
                    <p className="ml-2 line-through">{todo.text}</p>
                    <button
                      onClick={() => handleRemoveTodo(list.id, todo.id)}
                      className="bg-red-600 text-white p-1 hover:bg-red-500 rounded"
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      {/* ))} */}
    </div>
  )
}

export default Todos
