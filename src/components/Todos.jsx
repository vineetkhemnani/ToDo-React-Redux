import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeTodo, completeTodo, addTodo } from '../features/todo/todoSlice'
import { useState } from 'react'
import AddTodo from './AddTodo'

const Todos = () => {
  const todos = useSelector((state) => state.todos)
  const doneTodos = useSelector((state) => state.doneTodos)
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-6">
        <div className="todos bg-yellow-400 p-4 rounded">
          <h1 className="font-bold text-center text-white mb-3">Todos</h1>
          <ul>
            {todos?.map((todo) => (
              <li className="bg-gray-100 mb-2 p-2 rounded" key={todo.id}>
                <div className="flex items-center justify-between">
                  <input
                    type="checkbox"
                    // checked={isChecked}
                    onChange={() => {
                      setIsChecked(!isChecked)
                      dispatch(completeTodo(todo.id))
                    }}
                  />
                  <p className="ml-2">{todo.text}</p>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="bg-red-600 text-white p-1 hover:bg-red-500 rounded"
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <AddTodo/>

        <div className="doneTodos bg-green-400 p-4 rounded">
          <h1 className="font-bold text-center text-white mb-3">
            Completed Todos
          </h1>
          <ul>
            {doneTodos.map((todo) => (
              <li className="bg-gray-100 mb-2 p-2 rounded" key={todo.id}>
                <div className="flex items-center justify-between">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      setIsChecked(!isChecked)
                      dispatch(addTodo(todo.text))
                      dispatch(removeTodo(todo.id))
                    }}
                  />
                  <p className="ml-2 line-through">{todo.text}</p>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
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
    </div>
  )
}

export default Todos
