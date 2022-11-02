import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function StudentList() {

    const { studentStore, userStore } = useStore();
    const { deleteStudent, studentsArr, loading } = studentStore;
    const { confirmStudent } = userStore;

    const [target, setTarget] = useState('');

    function handleStudentDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteStudent(id);
    }

    function handleStudentConfirm(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        confirmStudent(id);
    }
    //shtoj filters per mi filtrsu studentat requested edhe trregullt. Nese sbohet kerqysh add a new component
    return (
        <Segment>
            <Item.Group divided>
                {studentsArr.map(student => (
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
                            <div>{student.isConfirmed.toString()}</div>
                            <div>{student.appUserId}</div>
                        </Item.Description>
                        {userStore.user?.role === "Administrator" ? (
                            <>
                                <Item.Extra>
                                    <Button
                                        content="Confirm"
                                        color="green"
                                        onClick={(e) => handleStudentConfirm(e, student.appUserId)}
                                        // loading={loading && target === student.id}
                                        name={student.id}
                                    //me hek butonin nese osht confirmed
                                    />
                                    <Button
                                        as={Link} to={`/students/${student.id}`}
                                        floated="right"
                                        content='View'
                                        color="blue" />
                                    <Button
                                        name={student.id}
                                        loading={loading && target === student.id}
                                        onClick={(e) => handleStudentDelete(e, student.id)}
                                        floated="right"
                                        content='Delete'
                                        color="red" />
                                </Item.Extra>
                            </>
                        ) : (
                            <>
                                <Button
                                    as={Link} to={`/students/${student.id}`}
                                    floated="right"
                                    content='View'
                                    color="blue" />
                            </>
                        )
                        }

                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}) 