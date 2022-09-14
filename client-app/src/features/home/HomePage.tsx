import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";


export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Container style={{ marginTop: '7em' }}>
            {userStore.isLoggedIn ? (
                <>
                    <Header as='h2' inverted content='Welcome to homepage' />
                    <Button as={Link} to='/students' size="huge" inverted>
                        Go to Students
                    </Button>
                </>
            ) : (
                <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" >
                    Login
                </Button>
            )}
        </Container>
    )
})