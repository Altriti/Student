import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image, Item } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfessorDetails() {
    const { professorStore } = useStore();
    const { selectedProfessor: professor, loadProfessor, loadingInitial } = professorStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadProfessor(id);
    }, [id, loadProfessor]);

    if (loadingInitial || !professor) return <LoadingComponent />

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/culture.jpg`} />
            <Item.Group divided>
                <Item>
                    <Item.Description>
                        <div>{professor.id}</div>
                        <div>{professor.name}</div>
                        <div>{professor.surname}</div>
                        <div>{professor.email}</div>
                        <div>{professor.phoneNumber}</div>
                        <div>{professor.street}</div>
                        <div>{professor.city}</div>
                        <div>{professor.state}</div>
                        <div>{professor.gender}</div>
                        <div>{professor.nationality}</div>
                        <div>{professor.appUserId}</div>
                    </Item.Description>
                </Item>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button
                            content='Edit'
                            color="blue"
                            basic
                            as={Link} to={`/professors/edit/${professor.id}`}
                        />
                        <Button
                            content='Cancel'
                            color="grey"
                            basic
                            as={Link} to='/professors' 
                        />
                    </Button.Group>
                </Card.Content>
            </Item.Group>

        </Card>
    )
})