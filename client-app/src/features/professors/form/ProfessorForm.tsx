import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Professor } from "../../../app/models/professor";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ProfessorForm() {
    const { id } = useParams<{ id: string }>();
    const { professorStore } = useStore();
    const { loadProfessor, createProfessor, updateProfessor, loading, loadingInitial } = professorStore;
    const history = useHistory();

    const [professor, setProfessor] = useState({
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
        appUserId: ''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        surname: Yup.string().required(),
        email: Yup.string().required(),
        phoneNumber: Yup.string().email().required(),
        street: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        gender: Yup.string().required(),
        nationality: Yup.string().required()
    })



    function handleFormSubmit(professor: Professor) {
        if (professor.id.length === 0) {
            let newProfessor = {
                ...professor,
                id: uuid()
            };
            createProfessor(newProfessor).then(() => history.push(`/professors/${newProfessor.id}`))
        } else {
            updateProfessor(professor).then(() => history.push(`/professors/${professor.id}`))
        }
    }


    useEffect(() => {
        if (id) loadProfessor(id).then(professor => setProfessor(professor!));
    }, [id, loadProfessor])

    if (loadingInitial) return <LoadingComponent content="Loading Professor" />

    return (
        <Segment clearing>
            <Header content='Professor Details' sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={professor}
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
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated="right"
                            positive
                            type="submit"
                            content='Submit'
                        />
                        <Button
                            as={Link}
                            to='/professors'
                            floated="right"
                            type="button"
                            content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>

    )
})