import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Student } from "../../../app/models/student";

interface Props {
    students: Student[];
    selectStudent: (id: string) => void;
    deleteStudent: (id: string) => void
    submitting: boolean;
}

export default function StudentList({ students, selectStudent, deleteStudent, submitting }: Props) {

    const [target, setTarget] = useState('');

    function handleStudentDelete(e:SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteStudent(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {students.map(student => (
                    <Item key={student.id}>
                        <Item.Header as='a'>{student.id}</Item.Header>
                        <Item.Meta>{student.name} {student.surname}</Item.Meta>
                        <Item.Description style={{ marginLeft: '20px' }}>
                            <div>{student.email}</div>
                            <div>{student.phoneNumber}</div>
                            <div>{student.street}</div>
                            <div>{student.city}</div>
                            <div>{student.state}</div>
                            <div>{student.gender}</div>
                            <div>{student.nationality}</div>
                            <div>{student.parentName}</div>
                            <div>{student.parentEmail}</div>
                            <div>{student.parentPhoneNumber}</div>
                            <div>{student.parentStreet}</div>
                            <div>{student.parentCity}</div>
                            <div>{student.parentState}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button
                                onClick={() => selectStudent(student.id)}
                                floated="right"
                                content='View'
                                color="blue" />
                            <Button
                                name={student.id}
                                loading={submitting && target === student.id} 
                                onClick={(e) => handleStudentDelete(e, student.id)}
                                floated="right"
                                content='Delete'
                                color="red" />
                        </Item.Extra>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}