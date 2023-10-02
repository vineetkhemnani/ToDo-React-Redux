import React, { useState } from 'react'
import Todos from './Todos'

function CustomLists() {
  const [lists, setLists] = useState({
    default: [{ id: 1, text: 'Hello' }],
  })
  const [activeList, setActiveList] = useState('default')
  const [newListName, setNewListName] = useState('')

  const handleAddList = () => {
    // Create a new list with a unique name
    const newListKey = `list${Date.now()}`
    setLists({
      ...lists,
      [newListKey]: [],
    })
    setActiveList(newListKey)
    setNewListName('')
  }

  return (
    <div className="p-4">
      <div className="flex space-x-2">
        {Object.keys(lists).map((listName) => (
          <button
            key={listName}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              listName === activeList ? 'bg-blue-700' : ''
            }`}
            onClick={() => setActiveList(listName)}
          >
            {listName}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter new list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="border border-gray-400 px-2 py-1"
        />
        <button
          onClick={handleAddList}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded ml-2"
        >
          Add List
        </button>
      </div>
      {/* <div className="mt-4">
        <h2 className="text-lg font-semibold">{activeList}</h2>
        <ul className="list-disc list-inside">
          {lists[activeList].map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div> */}
      <Todos/>
    </div>
  )
}

export default CustomLists
