import Body from './components/Body';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Profile from './components/profile';
import Connections from './components/Connections';

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route path='/' element={<Feed/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/connections' element={<Connections/>}/>
          <Route path='/login/:signup' element={<Signup/>}/> {/** use /signup or signup */} 
          </Route>  
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
