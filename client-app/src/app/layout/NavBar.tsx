import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { Student } from "../models/student";

interface Props{
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Students
                </Menu.Item>
                <Menu.Item name="Students" />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Add Student' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}