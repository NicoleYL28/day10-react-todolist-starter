import { useReducer, useState} from "react";
import './App.css';
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";
import { createBrowserRouter, NavLink, Outlet, RouterProvider, useParams } from "react-router";
import { Layout, Menu } from "antd";
import { HomeOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
const { Header, Footer} = Layout;

const items = [
  {
    label: <NavLink to="/">Home</NavLink>,
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: <NavLink to="/todos">Todo List</NavLink>,
    key: '/todos',
    icon: <ProfileOutlined />,
  },
  {
    label: <NavLink to="/about">About</NavLink>,
    key: '/about',
    icon: <UserOutlined />,
  },
]

function DefaultLayout() {
  const [current, setCurrent] = useState('/');
  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Layout>
    <Header>
      <nav> 
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" theme="dark" items={items} />;
        </nav>
    </Header> 
    <main>
      <h1> Hello, Welcome To My Page </h1>
      <Outlet/>
    </main>
    <Footer> hahaha </Footer>
  </Layout>;
}

function TodoDetail() {
  const {key} = useParams();
  console.log("key:", key);
  return <h3> This is todo detail for {key}: </h3>;
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
      element:<h3>Home Page</h3>,
    },{
      path: 'todos',
      element: <TodoList/>
    },
    {
      path: 'todoDetail/:key',
      element: <TodoDetail/>
    },
    {
      path: 'about',
      element: <h3>About Us</h3>
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
