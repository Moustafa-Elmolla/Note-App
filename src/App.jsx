import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'

function App() {

  let routes = createBrowserRouter([{
    path:'', element: <Layout />, children: [
      {index: true, element: <Login /> },
      {path: 'home', element: <ProtectedRoutes><Home /></ProtectedRoutes>},
      {path: 'login', element: <Login /> },
      {path: 'register', element: <Register /> },
      {path: '*', element: <Notfound /> }
    ]
  }])

  return (
    <>
        <RouterProvider router={routes} />
    </>
  );
}
export default App;
