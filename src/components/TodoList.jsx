import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

const TodoList = () => {

  const {state, dispatch} = useContext(TodoContext);
  const [newTodoText, setNewTodoText] = useState('');

  function toggleDone(id){
    console.log("toggle done for id:", id);
    const action = {type: 'DONE', id: id};
    dispatch(action);
  }

  function addTodo() {
    const action = {type: 'ADD', text: newTodoText};
    dispatch(action);
  }

  return (<div className = {"todo-group"}> 
      <div>This is the TodoList Component.</div>
      {
        state.map((todo) => {
          console.log(todo)
          const {id, text, done} = todo;
          return (
            <div className={`todo-item ${done ? 'done' : ''}`} onClick={() => toggleDone(id)}> {text} </div>
          );
        })
      }
      {
        <div> 
        <input type="text" placeholder='Enter new todo here...' value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
        <button onClick={addTodo}> Add Todo </button>
        </div>
      }
      </div>)
}

export default TodoList