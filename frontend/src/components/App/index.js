// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';

// == Import
import SignIn from 'src/components/SignIn';
import Move from 'src/components/Move';
import CreateMove from 'src/components/CreateMove';
import SignUp from 'src/components/SignUp';
import ResetPassword from 'src/components/ResetPassword';
import Profile from 'src/components/Profile';
import Contact from '../Contact';
import CreateBox from 'src/components/CreateBox';
import BoxesByMove from 'src/components/BoxesByMove';
import Item from 'src/components/Item';
import NotFound from 'src/components/Notfound';
import Home from 'src/components/Home';
// == Composant
const App = () => {
  const isLogged = useSelector((state) => state.isLogged);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          exact
          path="/move"
          render={() => {
            //if ((email === '') || (password === '')) {
            if (!isLogged) {
              console.log('state of isLogged',isLogged);
              //console.log('email,password page App/index',email,password);
              return <Redirect to="/signin" />;
            }
            //console.log('email,password,',email,password);
            return <Move />;
          }}
        />
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route
        exact
        path="/profile"
        render={() => {
            //if ((email === '') || (password === '')) {
            if (!isLogged) {
              console.log('isLogged',isLogged);
              //console.log('email,password page App/index',email,password);
              return <Redirect to="/signin" />;
            }
            //console.log('email,password,',email,password);
            return  <Profile />;
          }}
        />
        <Route exact path="/ResetPassword">
          <ResetPassword />
        </Route>
        <Route
        exact
        path="/create-move"
        render={() => {
            //if ((email === '') || (password === '')) {
            if (!isLogged) {
              console.log('isLogged',isLogged);
              //console.log('email,password page App/index',email,password);
              return <Redirect to="/signin" />;

            }
            //console.log('email,password,',email,password);
            return  <CreateMove />;
          }}
        />
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/move/:id" component={BoxesByMove} />
        <Route exact path="/create-box" component={CreateBox} />
        <Route exact path="/box/:id" component={Item} />
        <Route exact path="*"><NotFound /></Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
