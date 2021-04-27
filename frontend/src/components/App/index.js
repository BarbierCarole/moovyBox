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
import HomeMoveSelected from 'src/components/HomeMoveSelected';
import Research from 'src/components/Research';
import UpdateMove from 'src/components/UpdateMove';
import TasksList from 'src/components/TasksList';
import NewTasksList from 'src/components/NewTasksList';
import Task from 'src/components/Task';
import CreateTask from 'src/components/CreateTask';
import UpdateTask from 'src/components/UpdateTask';

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
            if (!isLogged) {
              console.log('isLogged',isLogged);
              //console.log('email,password page App/index',email,password);
              return <Redirect to="/signin" />;
            }
            //console.log('email,password,',email,password);
            return  <CreateMove />;
          }}
        />
        {/* CB : new page of home to add 3 buttons with research and my checklist */}
        <Route
        exact
        path="/move/:id/homeMoveSelected"
        render={() => {
            if (!isLogged) {
              console.log('isLogged',isLogged);
              //console.log('email,password page App/index',email,password);
              return <Redirect to="/signin" />;
            }
            //console.log('email,password,',email,password);
            return  <HomeMoveSelected />;
          }}
        />
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/move/:id" component={BoxesByMove} />
        <Route exact path="/move/:id/modify" component={UpdateMove} />
        <Route exact path="/create-box" component={CreateBox} />
        <Route exact path="/box/:id" component={Item} />
        <Route exact path="/move/:id/research" component={Research} />
        <Route exact path="/move/:id/tasksList" component={TasksList} />
        {/* Un doute sur l'utilité de la ligne ci-dessous - devrait servir pour la création d'une nouvelle liste*/}
        <Route exact path="/move/:id/newTasksList" component={NewTasksList} />
        <Route exact path="/move/:id/task/:taskId" component={Task} />
        <Route exact path="/move/:id/task/:taskId/modify" component={UpdateTask} />
        <Route exact path="/move/:id/create-task" component={CreateTask} />
        <Route exact path="*"><NotFound /></Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
