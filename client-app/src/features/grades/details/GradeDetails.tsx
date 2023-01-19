import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image, Item } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store"

export default observer(function GradeDetails() {
    const { gradesStore } = useStore();
    const { selectedGrade: grade, loadingInitial, loadGrade } = gradesStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadGrade(id)
    }, [id, loadGrade])

    if (loadingInitial || !grade) return <LoadingComponent content="Loading grade" />

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/culture.jpg`} />
            <Item.Group>
                <Item key={grade.id}>
                    <Item.Description>
                        <div>{grade.id}</div>
                        <div>{grade.studentId}</div>
                        <div>{grade.student?.displayName}</div>
                        <div>{grade.subjectId}</div>
                        <div>{grade.subject?.name}</div>
                        <div>{grade.grade}</div>
                        <div>{grade.mainGrade.toString()}</div>
                        <div>{grade.professor?.name}</div>
                    </Item.Description>
                </Item>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button
                            content='Edit'
                            as={Link} to={`/grades/edit/${grade.id}`}
                            basic
                            color="blue"
                        />
                        <Button 
                            content='Cancel'
                            basic
                            color="grey"
                            as={Link}
                            to='/grades'
                        />
                    </Button.Group>
                </Card.Content>
            </Item.Group>
        </Card>
    )
})