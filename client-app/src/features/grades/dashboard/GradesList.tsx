import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function GradesList() {

    const { gradesStore } = useStore();
    const { gradesArray, deleteGrade, loading } = gradesStore;

    const [target, setTarget] = useState('');

    function handleGradeDelete(id: string, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name)
        deleteGrade(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {gradesArray.map(grade => (
                    <Item key={grade.id}>
                        <Item.Description>
                            <div>grade id - {grade.id}</div>
                            <div>student id - {grade.studentId}</div>
                            <div>student name - {grade.student?.displayName}</div>
                            <div>subject id - {grade.subjectId}</div>
                            <div>subject name - {grade.subject?.name}</div>
                            <div>grade - {grade.grade}</div>
                            <div>is main? - {grade.mainGrade.toString()}</div>
                            <div>profesor name - {grade.professor?.name}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button
                                as={Link} to={`/grades/${grade.id}`}
                                content='View'
                                color='blue'
                            />
                            <Button
                                content='Delete'
                                color="red"
                                name={grade.id}
                                loading={loading && target === grade.id}
                                onClick={(e) => handleGradeDelete(grade.id, e)}
                            />
                        </Item.Extra>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})