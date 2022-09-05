import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Couldn't find what you're looking for!!!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/students' primary>
                    Return to students list page.
                </Button>
            </Segment.Inline>
        </Segment>
    )
}