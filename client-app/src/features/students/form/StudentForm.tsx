import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Student } from "../../../app/models/student";

interface Props {
    student: Student | undefined;
    closeForm: () => void;
    createEdit: (student: Student) => void
    submitting: boolean;
}

export default function StudentForm({ student: selectedStudent, closeForm, createEdit, submitting }: Props) {

    const initialState = selectedStudent ? selectedStudent : {
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
    }

    const [student, setStudent] = useState(initialState);

    function handleSubmit() {
        createEdit(student);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value })
    }
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
                <Button loading={submitting} floated="right" positive type="submit" content='Submit' />
                <Button onClick={closeForm} floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
}