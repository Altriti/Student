import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Student } from "../../../app/models/student";

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
        parentState: '',
        isConfirmed: false,//change this, this was only temporary
        appUserId: ''

    });

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        surname: Yup.string().required(),
        email: Yup.string().email().required(),
        phoneNumber: Yup.string().required(),
        street: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        gender: Yup.string().required(),
        nationality: Yup.string().required(),
        parentName: Yup.string().required(),
        parentEmail: Yup.string().required(),
        parentPhoneNumber: Yup.string().required(),
        parentStreet: Yup.string().required(),
        parentCity: Yup.string().required(),
        parentState: Yup.string().required()
    })

    useEffect(() => {
        if (id) loadStudent(id).then(student => setStudent(student!))
    }, [id, loadStudent]);


    function handleFormSubmit(student: Student) {
        if (student.id.length === 0) {
            let newStudent = {
                ...student, //studenti qe vjen prej formes. dmth studenti qe po vjen si parameter metodes
                id: uuid()
            };
            createStudent(newStudent).then(() => history.push(`/students/${newStudent.id}`))
        } else {
            updateStudent(student).then(() => history.push(`/students/${student.id}`))
        }
    }

    // function handleChange(event: ChangeEvent<HTMLInputElement>) {
    //     const { name, value } = event.target;
    //     setStudent({ ...student, [name]: value })
    // }


    if (loadingInitial) return <LoadingComponent content="Loading student..." />


    return (
        <Segment clearing>
            <Header content='Student Details' sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={student}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Name' name='name' />
                        <MyTextInput placeholder='Surname' name='surname' />
                        <MyTextInput placeholder='Email' name='email' />
                        <MyTextInput placeholder='PhoneNumber' name='phoneNumber' />
                        <MyTextInput placeholder='Street' name='street' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='State' name='state' />
                        <MyTextInput placeholder='Gender' name='gender' />
                        <MyTextInput placeholder='Nationality' name='nationality' />
                        <MyTextInput placeholder='ParentName' name='parentName' />
                        <MyTextInput placeholder='ParentEmail' name='parentEmail' />
                        <MyTextInput placeholder='ParentPhoneNumber' name='parentPhoneNumber' />
                        <MyTextInput placeholder='ParentStreet' name='parentStreet' />
                        <MyTextInput placeholder='ParentCity' name='parentCity' />
                        <MyTextInput placeholder='ParentState' name='parentState' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated="right"
                            positive
                            type="submit"
                            content='Submit' />
                        <Button
                            as={Link}
                            to='/students'
                            floated="right"
                            type="button"
                            content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
}) 