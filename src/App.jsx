import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import WelcomePage from './pages/WelcomePage';

function App() {
  const [welcome, setWelcome] = useState(false);

  useEffect(()=>{
    const localData = localStorage.getItem('welcome')
    if(localData){
      setWelcome(true)
    }
  },[])
  
const router = createBrowserRouter([
  {
    path:"/",
    element:<Login setWelcome={setWelcome}/>
  },

  {
    path: "/welcome",
    element: welcome ? <WelcomePage /> : <Navigate to="/welcome" />,
  },

])
  return (
    <>
      <RouterProvider router={router}/>
    </>
     
  )
}

export default App
