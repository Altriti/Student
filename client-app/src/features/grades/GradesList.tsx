import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function GradesList() {

    const { gradesStore } = useStore();
    const { gradesArray, gradesRegistry, loadGrades } = gradesStore;

    useEffect(() => {
        if (gradesRegistry.size < 1) loadGrades()
    }, [gradesRegistry.size, loadGrades])

    return (
        <Segment>
            <Item.Group divided>
                {gradesArray.map(grade => (
                    <Item key={grade.id}>
                        <Item.Description>
                            <div>{grade.id}</div>
                            <div>{grade.studentId}</div>
                            <div>{grade.student.name}</div>
                            <div>{grade.subjectId}</div>
                            <div>{grade.subject.name}</div>
                            <div>{grade.grade}</div>
                            <div>{grade.mainGrade}</div>
                            <div>{grade.professor?.name}</div>
                        </Item.Description>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})