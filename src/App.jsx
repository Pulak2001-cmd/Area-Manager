import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import Map from './components/Map';
import Profile from './components/Profile';

function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <Main />
    </Router>
  )
}

export default App

function Main(){
  const navigate = useNavigate();
  return (
    <Routes>
          <Route exact path='/' element={< Login />}></Route>
          <Route exact path='/home' element={<HomePage navigate={navigate}/>}></Route>
          <Route exact path='/profile' element={<Profile navigate={navigate} />}></Route>
          <Route exact path='/map' element={<Map navigate={navigate}/>}></Route>
    </Routes>
  )
}