import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useEffect } from "react";
import { Button, Modal } from "antd";
import { getTodos, addTodo, deleteTodo, toggleTodoDone, updateTodo} from "../apis/api";

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodoText, setNewTodoText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifiedTodoText, setModifiedTodoText] = useState("");
  const [currentEditId, setCurrentEditId] = useState(null);

  const showModal = (id, currentText) => {
    setCurrentEditId(id);
    setModifiedTodoText(currentText);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
     if (modifiedTodoText && modifiedTodoText.trim() && currentEditId) {
      const modifiedTodo = {
        text: modifiedTodoText.trim(),
      };
      const response = await updateTodo(currentEditId, modifiedTodo);
      dispatch({ type: "UPDATE", id: response.data.id, text: response.data.text });
      setModifiedTodoText("");
      setCurrentEditId(null);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModifiedTodoText("");
    setCurrentEditId(null);
  };

  // function toggleDone(id){
  //   console.log("toggle done for id:", id);
  //   const action = {type: 'DONE', id: id};
  //   dispatch(action);
  // }

  // function addTodo() {
  //   const action = {type: 'ADD', text: newTodoText};
  //   dispatch(action);
  // }

  // function deleteTodo(id) {
  //   const action = {type: 'DELETE', id: id};
  //   dispatch(action);
  // }

  const toggleDone = async (id) => {
    console.log("toggle done for id:", id);
    const response = await toggleTodoDone(id);
    dispatch({ type: "DONE", id: response.data.id });
  };

  const handleSubmit = async () => {
    if (newTodoText && newTodoText.trim()) {
      const newTodo = {
        done: false,
        text: newTodoText.trim(),
      };
      const response = await addTodo(newTodo);
      dispatch({ type: "ADD", todo: response.data });
      setNewTodoText("");
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    dispatch({ type: "DELETE", id: id });
  };

  useEffect(() => {
    getTodos().then((response) => {
      dispatch({ type: "LOAD_TODOS", todos: response.data });
    });
  }, [dispatch]);

  return (
    <div className={"todo-group"}>
      <h1>Todo List</h1>
      {state.length === 0 ? (
        <div style={{ margin: "16px 0", color: "gray" }}>
          Add the things you need to do today...
        </div>
      ) : (
        state.map((todo) => {
          console.log(todo);
          const { id, done } = todo;
          // Handle both string and object for text
          const displayText = typeof todo.text === 'string' ? todo.text : (todo.text?.text || '');
          return (
            <div className="todo-item-row" key={id}>
              <span
                className={`todo-item ${done ? "done" : ""}`}
                onClick={() => toggleDone(id)}
              >
                {displayText}
              </span>
              <button className="delete-btn" onClick={() => handleDelete(id)}>
                X
              </button>
              <Button type="primary" onClick={() => showModal(id, displayText)}>
                modify
              </Button>
              <Modal
                title="Basic Modal"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleUpdate}
                onCancel={handleCancel}
              >
                <input
                  type="text"
                  placeholder="Enter modified todo here..."
                  value={modifiedTodoText}
                  onChange={(e) => setModifiedTodoText(e.target.value)}
                />
              </Modal>
            </div>
          );
        })
      )}
      {
        <div>
          <input
            type="text"
            placeholder="Enter new todo here..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button className="add-btn" onClick={handleSubmit}>
            {" "}
            Add{" "}
          </button>
        </div>
      }
    </div>
  );
};

export default TodoList;
