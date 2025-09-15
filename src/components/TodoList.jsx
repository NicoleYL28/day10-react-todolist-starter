import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useEffect } from "react";
import { getTodos, addTodo, deleteTodo} from "../apis/api";

const TodoList = () => {

  const {state, dispatch} = useContext(TodoContext);
  const [newTodoText, setNewTodoText] = useState('');

  function toggleDone(id){
    console.log("toggle done for id:", id);
    const action = {type: 'DONE', id: id};
    dispatch(action);
  }

  // function addTodo() {
  //   const action = {type: 'ADD', text: newTodoText};
  //   dispatch(action);
  // }

  // function deleteTodo(id) {
  //   const action = {type: 'DELETE', id: id};
  //   dispatch(action);
  // }

  const handleSubmit = async () => {
      if (newTodoText && newTodoText.trim()) {
        const newTodo = { 
          done: false,
          text: newTodoText.trim()
        }
        const response = await addTodo(newTodo);
        dispatch({ type: 'ADD', todo: response.data });
        setNewTodoText('');
      }
    }

  const handleDelete = async (id) => {
    await deleteTodo(id);
    dispatch({ type: 'DELETE', id });
  };

  useEffect( () => {
    getTodos().then( response => {
      dispatch({type: 'LOAD_TODOS', todos: response.data});
    })
  }, []);

  return (<div className = {"todo-group"}> 
      <h1>Todo List</h1>
      {
        state.length === 0
          ? <div style={{margin: '16px 0', color: 'gray'}}>Add the things you need to do today...</div>
          : state.map((todo) => {
              console.log(todo)
              const {id, text, done} = todo;
              return (
                <div className="todo-item-row">
                  <span className={`todo-item ${done ? 'done' : ''}`} onClick={() => toggleDone(id)}>{text}</span>
                  <button className='delete-btn' onClick={() => handleDelete(id)}>X</button>
                </div>
              );
            })
      }
      {
        <div> 
        <input type="text" placeholder='Enter new todo here...' value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
        <button className='add-btn' onClick={handleSubmit}> Add </button>
        </div>
      }
      </div>)
}

export default TodoList