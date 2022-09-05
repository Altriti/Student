import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';

export default observer(function StudentForm() {

    const history = useHistory();
    const { studentStore } = useStore();
    const { createStudent, updateStudent, loading, loadStudent, loadingInitial } = studentStore;
    const { id } = useParams<{ id: string }>();

    const [student, setStudent] = useState({
        id: '',
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        street: '',
        city: '',
        state: '',
        gender: '',
        nationality: '',
        parentName: '',
        parentEmail: '',
        parentPhoneNumber: '',
        parentStreet: '',
        parentCity: '',
        parentState: ''
    });


    useEffect(() => {
        if (id) loadStudent(id).then(student => setStudent(student!))
    }, [id, loadStudent]);


    function handleSubmit() {
        if (student.id.length === 0) {
            let newStudent = {
                ...student,
                id: uuid()
            };
            createStudent(newStudent).then(() => history.push(`/students/${newStudent.id}`))
        } else {
            updateStudent(student).then(() => history.push(`/students/${student.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value })
    }


    if (loadingInitial) return <LoadingComponent content="Loading student..." />


    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={student.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Surname' value={student.surname} name='surname' onChange={handleInputChange} />
                <Form.Input placeholder='Email' value={student.email} name='email' onChange={handleInputChange} />
                <Form.Input placeholder='PhoneNumber' value={student.phoneNumber} name='phoneNumber' onChange={handleInputChange} />
                <Form.Input placeholder='Street' value={student.street} name='street' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={student.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='State' value={student.state} name='state' onChange={handleInputChange} />
                <Form.Input placeholder='Gender' value={student.gender} name='gender' onChange={handleInputChange} />
                <Form.Input placeholder='Nationality' value={student.nationality} name='nationality' onChange={handleInputChange} />
                <Form.Input placeholder='ParentName' value={student.parentName} name='parentName' onChange={handleInputChange} />
                <Form.Input placeholder='ParentEmail' value={student.parentEmail} name='parentEmail' onChange={handleInputChange} />
                <Form.Input placeholder='ParentPhoneNumber' value={student.parentPhoneNumber} name='parentPhoneNumber' onChange={handleInputChange} />
                <Form.Input placeholder='ParentStreet' value={student.parentStreet} name='parentStreet' onChange={handleInputChange} />
                <Form.Input placeholder='ParentCity' value={student.parentCity} name='parentCity' onChange={handleInputChange} />
                <Form.Input placeholder='ParentState' value={student.parentState} name='parentState' onChange={handleInputChange} />
                <Button loading={loading} floated="right" positive type="submit" content='Submit' />
                <Button as={Link} to='/students' floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
}) 