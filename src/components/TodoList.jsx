import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

const TodoList = () => {

  const {state, dispatch} = useContext(TodoContext);

  return (<div> 
      <div>This is the TodoList Component.</div>
      {
        state.map(todo => (
        <div key={todo.id}> {todo.text} </div>
      ))}
      </div>)
}

export default TodoList