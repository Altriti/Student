import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function SubjectList() {
    const { subjectStore } = useStore();
    const { subjectsArr, deleteSubject, loading } = subjectStore;

    const [target, setTarget] = useState('');

    function handleSubjectDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteSubject(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {subjectsArr.map(subject => (
                    <Item key={subject.id}>
                        <Item.Description>
                            <div>{subject.id}</div>
                            <div>{subject.name}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button
                                content='Edit'
                                color="blue"
                                floated='right'
                                as={Link}
                                to={`/subjects/edit/${subject.id}`}
                            />
                            <Button
                                content='Delete'
                                color="red"
                                floated='right'
                                name={subject.id}
                                onClick={(e) => handleSubjectDelete(e, subject.id)}
                                loading={loading && target === subject.id}
                            />
                        </Item.Extra>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})