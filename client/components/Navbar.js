import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Navbar = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => {
    return state.auth.id;
  });

  return (
    <div>
      <h1>Pokedex</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
            <div>
              <Link to="/gen1">Generation 1</Link>
              <Link to="/gen2">Generation 2</Link>
              <Link to="/gen3">Generation 3</Link>
              <Link to="/gen4">Generation 4</Link>
              <Link to="/gen5">Generation 5</Link>
              <Link to="/gen6">Generation 6</Link>
              <Link to="/gen7">Generation 7</Link>
              <Link to="/gen8">Generation 8</Link>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
