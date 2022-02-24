import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
  const { username } = useSelector((state) => {
    return state.auth;
  });

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

export default Home;
