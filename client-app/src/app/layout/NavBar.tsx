import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown, Item } from "semantic-ui-react";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import { useStore } from "../stores/store";


export default observer(function NavBar() {
    const { userStore: { user, logout }, modalStore, classesStore: { classArr, classRegistry, loadClasses } } = useStore();

    useEffect(() => {
        if (classRegistry.size <= 1) loadClasses();
    }, [classRegistry.size, loadClasses])
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    HomePage
                </Menu.Item>
                <Menu.Item as={NavLink} to='/students' name="Students" />
                <Menu.Item as={NavLink} to='/professors' name="Professors" />
                <Menu.Item as={NavLink} to='/subjects' name="Subjects" />
                <Menu.Item as={NavLink} to='/grades' name="Grades" />
                <Dropdown text="Classes" >
                    <Dropdown.Menu>
                        {classArr.map(classR => (
                            <Item key={classR.id}>
                                <Dropdown.Item >
                                    <Menu.Item style={{ color: 'black' }}
                                        as={NavLink} to={`/classes/${classR.id}`}
                                    >
                                        {classR.className}
                                    </Menu.Item>
                                </Dropdown.Item>
                            </Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as={NavLink} to='/users' name="Users" />
                <Menu.Item as={NavLink} to='/errors' name="Errors" />
                <Menu.Item>
                    <Dropdown text="Add ...">
                        <Dropdown.Menu>
                            <Button as={NavLink} to='/createStudent' positive content='Add Student' />
                            <Button as={NavLink} to='/createProfessor' positive content='Add Professor' />
                            <Button as={NavLink} to='/createSubject' positive content='Add Subject' />
                            <Button as={NavLink} to='/createClass' positive content='Add Class' />
                            <Button as={NavLink} to='/createGrade' positive content='Add Grade' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item >
                    <Button onClick={() => modalStore.openModal(<LoginForm />)} >
                        Login
                    </Button>
                </Menu.Item>
                <Menu.Item >
                    <Button onClick={() => modalStore.openModal(<RegisterForm />)} >
                        Sign up
                    </Button>
                </Menu.Item>
                <Menu.Item position="right">
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})