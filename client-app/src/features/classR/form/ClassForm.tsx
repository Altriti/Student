import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Class } from "../../../app/models/class";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ClassForm() {
    const { id } = useParams<{ id: string }>();
    const { classesStore } = useStore();
    const { loadClass, createClass, updateClass, loadingInitial, loading } = classesStore;
    const history = useHistory();

    const [classR, setClassR] = useState({
        id: '',
        className: ''
    });

    function handleFormSubmit(classR: Class) {
        if (classR.id.length === 0) {
            let newClassR = {
                ...classR,
                id: uuid()
            };
            createClass(newClassR).then(() => history.push(`/classes/${newClassR.id}`));
        } else {
            updateClass(classR).then(() => history.push(`/classes/${classR.id}`));
        }
    }

    useEffect(() => {
        if (id) loadClass(id).then(classR => setClassR(classR!));
    }, [id, loadClass]);

    if (loadingInitial) return <LoadingComponent content="Loading Class" />

    return (
        <Segment clearing>
            <Header content='Class Details' sub color="teal" />
            <Formik
                initialValues={classR}
                enableReinitialize
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autocmplete='off'>
                        <MyTextInput placeholder="ClassName" name="className" />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}
                            loading={loading}
                            content='Submit'
                            positive
                            type="submit"
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})