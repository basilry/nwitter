import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fBase"



function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 굳이 없어도 된다.
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        // setIsLoggedIn(true);
        setUserObj(user);
      }
      //  else {
      //   setIsLoggedIn(false);
      // }
      setInit(true)
    })
  }, [])
  return (
    <>
      {/* {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."} */}
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
