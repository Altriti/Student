import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Subject } from "../../../app/models/subject";
import { useStore } from "../../../app/stores/store";
import { Link, useHistory, useParams } from "react-router-dom";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function SubjectForm() {
    const { subjectStore } = useStore();
    const { createSubject, updateSubject, loading, loadSubject, subjectRegistry, loadingInitial } = subjectStore;
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [subject, setSubject] = useState({
        id: '',
        name: ''
    });

    const validationSchema = Yup.object({
        id: Yup.string().required(),
        name: Yup.string().required()
    })

    // function handleFormValues(subject: Subject) {
    //     if (subject.id.length === 0) {
    //         let newSubject = {
    //             ...subject,
    //             id: uuid()
    //         };
    //         createSubject(newSubject).then(() => history.push('/subjects'));
    //     } else {
    //         updateSubject(subject).then(() => history.push('/subjects'));
    //     }
    // }


    function handleFormValues(subject: Subject) {
        let result = subjectRegistry.has(subject.id);
        if (!result) {
            createSubject(subject).then(() => history.push('/subjects'));
        } else {
            updateSubject(subject).then(() => history.push('/subjects'));
        }
    }


    useEffect(() => {
        if (id) loadSubject(id).then(subject => setSubject(subject!))
    }, [id, loadSubject])

    if (loadingInitial) return <LoadingComponent content="Loading subject" />

    return (
        <Segment clearing>
            <Header content='Subject details' sub color="teal" />
            <Formik
                initialValues={subject}
                enableReinitialize
                onSubmit={values => handleFormValues(values)}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Id' name='id' />
                        <MyTextInput placeholder='Name' name='name' />
                        <Button
                            content='Submit'
                            disabled={isSubmitting || !dirty || !isValid}
                            floated="right"
                            positive
                            type="submit"
                            loading={loading}
                        />
                        <Button
                            content='Cancel'
                            as={Link}
                            to='/subjects'
                            floated="right"
                            type="button"
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})