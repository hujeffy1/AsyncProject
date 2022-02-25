import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllGen1 from './components/AllGen1';
import AllGen2 from './components/AllGen2';
import AllGen3 from './components/AllGen3';
import AllGen4 from './components/AllGen4';
import AllGen5 from './components/AllGen5';
import AllGen6 from './components/AllGen6';
import AllGen7 from './components/AllGen7';
import AllGen8 from './components/AllGen8';
import QuizGen1 from './components/QuizGen1';
import QuizGen2 from './components/QuizGen2';
import SinglePokemon from './components/SinglePokemon';

const Routes = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/gen1" component={AllGen1} />
          <Route path="/gen1/quiz" component={QuizGen1} />
          <Route exact path="/gen2" component={AllGen2} />
          <Route path="/gen2/quiz" component={QuizGen2} />
          <Route exact path="/gen3" component={AllGen3} />
          <Route exact path="/gen4" component={AllGen4} />
          <Route exact path="/gen5" component={AllGen5} />
          <Route exact path="/gen6" component={AllGen6} />
          <Route exact path="/gen7" component={AllGen7} />
          <Route exact path="/gen8" component={AllGen8} />
          <Route path="/pokemon/:id" component={SinglePokemon} />
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
