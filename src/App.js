import { useReducer } from "react";
import './App.css';
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";
import { createBrowserRouter, NavLink, Outlet, RouterProvider } from "react-router";

function DefaultLayout() {
  return <>
    <header>
      <nav> 
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/todos">Todo List</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
        </nav>
    </header> 
    <main>
      <h1> xxx </h1>
      <Outlet/>
    </main>
    <footer> hahaha </footer>
  </>;
}

function Error() {
  return <div> 404 Not Found </div>;
}

const route = [
  {
    path:'/',
    element : <DefaultLayout/>,
    errorElement: <Error/>,
    children: [{
      path:'',
      element:<h1>Home Page</h1>,
    },{
      path: 'todos',
      element: <TodoList/>
    },
    {
      path: 'about',
      element: <h1>About Us</h1>
    }]
  }
]

const router = createBrowserRouter(route);

function App() {
  // the Hooks API manage component data state
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const value = {state, dispatch};


  return (
    <div className="App">
      <TodoContext.Provider value={value}>
        <RouterProvider router={router} />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
