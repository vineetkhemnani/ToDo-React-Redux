import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList, removeList } from '../features/todo/todoSlice';
import Todos from './Todos';

const CustomLists = () => {
  const [newListName, setNewListName] = useState('');
  const [activeList, setActiveList] = useState(null); // Store the ID of the active list
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  const handleAddList = () => {
    if (newListName.trim() !== '') {
      dispatch(addList(newListName));
      setNewListName('');
    }
  };

  const handleRemoveList = (listId) => {
    dispatch(removeList(listId));
    if (listId === activeList) {
      // Clear the active list if it's deleted
      setActiveList(null);
    }
  };

  const handleSetActiveList = (listId) => {
    setActiveList(listId);
  };

  return (
    <div className="custom-lists-container p-4 mx-auto bg-gray-100 border border-gray-300 rounded-md">
      <div className="list-tabs flex space-x-4">
        {lists.map((list) => (
          <div
            key={list.id}
            onClick={() => handleSetActiveList(list.id)}
            className={`p-2 cursor-pointer rounded-md ${
              list.id === activeList
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {list.name}
            <button
              onClick={() => handleRemoveList(list.id)}
              className="ml-2 text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="add-list mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Enter list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
        />
        <button
          onClick={handleAddList}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Add List
        </button>
      </div>

      {activeList && (
        // <div className="active-list mt-4 p-4 bg-white border border-gray-300 rounded-md">
        //   {/* Render the content of the active list here */}
        //   {/* For example, display todos related to the active list */}
        // {console.log(activeList)}
        // </div>
        <Todos listId={activeList}/>
      )}
    </div>
  );
};

export default CustomLists;
