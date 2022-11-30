import { Fragment, useEffect } from 'react';
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
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import UsersList from '../../features/users/UsersList';
import ProfessorDashboard from '../../features/professors/dashboard/ProfessorDashboard';
import ProfessorDetails from '../../features/professors/details/ProfessorDetails';

function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/students' component={StudentDashboard} />
          <Route path={'/errors'} component={TestErrors} />
          <Route path={'/server-error'} component={ServerError} />
          <Route key={location.key} path={['/createStudent', `/edit/:id`]} component={StudentForm} />
          <Route path='/students/:id' component={StudentDetails} />
          <Route path='/login' component={LoginForm} />
          <Route path='/users' component={UsersList} />
          <Route exact path='/professors' component={ProfessorDashboard} />
          <Route path='/professors/:id' component={ProfessorDetails} />
          <Route component={NotFound} />
          {/* If we write/get a bad route, it will check all routes above, 
          if doesnt match them, it will match the {NotFound}}. Switch -> one route at a time */}
        </Switch>

      </Container>

    </>
  );
}

export default observer(App);
