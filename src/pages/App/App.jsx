import { useRoutes, BrowserRouter, useNavigate } from "react-router-dom"
import Header from "../../Components/Header"
import NavBar from "../../Components/NavBar"
import Home from "../Home"
import './App.css'


const AppRoutes=()=>{
  let routes=useRoutes([
    {path: '/', element :<Home/>},
 
  ])
  return routes;
}

const App=()=> {

 

  return (
  
      <BrowserRouter
      future={{
        v7_startTransition: true, // Habilita `startTransition`
        v7_relativeSplatPath: true, // Habilita resolución relativa de rutas splat
      }}
      >
      
<Header/>
<NavBar/>
        <AppRoutes />
       

      </BrowserRouter>
    

  )
}

export default App