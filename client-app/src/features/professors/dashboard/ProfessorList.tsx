import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfessorList() {
    const { professorStore } = useStore();
    const { professorArr } = professorStore;


    return (
        <Segment>
            <Item.Group divided>
                {professorArr.map(professor => (
                    <Item key={professor.id}>
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
                        <Item.Extra>
                            <Button
                                as={Link} to={`/professors/${professor.id}`}
                                content='View'
                                color="blue"

                            />
                            <Button
                                content='Delete'
                                color="red"
                            />
                        </Item.Extra>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})