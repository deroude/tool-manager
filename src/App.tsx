import { CircularProgress } from '@mui/material';
import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import "./App.scss";
import { whoami } from './services/Auth';
import { firebaseInit } from './services/Firebase';

function App() {

  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await firebaseInit();
      setLoading(false);
      const me = await whoami();
      if (!!me) {
        setUser(me);
      } else {
        navigate("/login");
      }
    }

    init().catch(err => console.log(err))
  }, [loading, user, navigate])

  return (
    (loading ? <CircularProgress className='loader' size="20vh" /> :
      <Outlet />
    )
  );
}

export default App;
