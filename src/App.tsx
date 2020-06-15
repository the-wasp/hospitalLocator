import React, { useEffect, useState } from 'react';
import './App.css';

import Paper from '@material-ui/core/Paper';
import NavBar from './components/Navbar';
import Main from './components/Main';

function App() {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0
  });



  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

    });
  });

  return (
    <Paper component='section'>
      <NavBar />
      {userLocation.latitude + " " + userLocation.longitude}
      <Main currentPosition={userLocation} />
    </Paper>

  );
}

export default App;
