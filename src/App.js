import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

// Using Node.js `require()`
const redstone = require('redstone-api');

export const UserContext = createContext(null);

function App() {

  let navigate = useNavigate();

  const [activeUser, setUser, unsetUser] = useLocalStorage('activeUser');
  const [isDarkMode, setisDarkMode] = useState(false)

  useEffect(() => {
    if (window.location.href == 'http://localhost:3000/') {
      navigate("/home")
    }
  }, [])

  /**
   * updates the account value for the activeUser by adding a value
   * @param {*} value the amount to be added to the account value
   */
  function addFunds(value) {
    setUser({
      ...activeUser,
      account_value: Number(activeUser.account_value) + Number(value)
    })
  }

  function login(newUser) {
    setUser(newUser);
  }

  function login(newUser) {
    setUser(newUser);
  }

  function logout() {
    unsetUser();
    navigate("/home")
  }


  return (
    <UserContext.Provider value={{ activeUser, login, logout, addFunds }}>

      <div className={"App " + (isDarkMode && 'dark-mode')}>
        <div className='app-wrapper'>
          <Nav />
          <Outlet />
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
