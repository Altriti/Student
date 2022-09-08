import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import StudentDashboard from '../../features/students/dashboard/StudentDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import StudentForm from '../../features/students/form/StudentForm';
import StudentDetails from '../../features/students/details/StudentDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {

  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/students' component={StudentDashboard} />
          <Route path={'/errors'} component={TestErrors} />
          <Route path={'/server-error'} component={ServerError} />
          <Route key={location.key} path={['/createStudent', `/edit/:id`]} component={StudentForm} />
          <Route path='/students/:id' component={StudentDetails} />
          <Route component={NotFound} />
          {/* If we write/get a bad route, it will check all routes above, 
          if doesnt match them, it will match the 28th line. Switch -> one route at a time */}
        </Switch>

      </Container>

    </>
  );
}

export default observer(App);
