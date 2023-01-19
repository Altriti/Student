import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Grade, GradeFormValues } from "../../../app/models/grade";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default observer(function GradesForm() {
    const { id } = useParams<{ id: string }>();
    const { gradesStore } = useStore();
    const { loadGrade, createGrade, updateGrade, loading, gradeStatus, loadingInitial } = gradesStore;
    const history = useHistory();

    const [grade, setGrade] = useState<GradeFormValues>(new GradeFormValues());

    useEffect(() => {
        if (id) loadGrade(id).then(grade => setGrade(new GradeFormValues(grade)))
    }, [id, loadGrade]);

    function handleFormSubmit(grade: GradeFormValues) {
        if (!grade.id) {
            let newGrade = {
                ...grade,
                id: uuid()
            };
            createGrade(newGrade).then(() => history.push(`/grades/${newGrade.id}`));
        } else {
            updateGrade(grade).then(() => history.push(`/grades/${grade.id}`));
        }
    }

    const [state, setState] = useState(gradeStatus);//kjo logjike kerkon vemendje 100% AltritBrain

    function handleGradeState() {
        setState(!state);
    }//kjo logjike kerkon vemendje 100% AltritBrain

    if (loadingInitial) return <LoadingComponent content="Loading Grade" />

    return (
        <Segment clearing>
            <Formik
                enableReinitialize
                initialValues={grade}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, }) => (
                    <Form className="ui form" autoComplete='off' onSubmit={handleSubmit}>
                        <MyTextInput name="studentId" placeholder="StudentId" />
                        <MyTextInput name="subjectId" placeholder="SubjectId" />
                        <MyTextInput name="grade" placeholder="Grade" type="number" />
                        <MyTextInput name="mainGrade" placeholder="MainGrade" type="checkbox" checked={state} onClick={handleGradeState} />
                        <Button
                            content='Submit'
                            loading={loading}
                            type='submit'
                            floated="right"
                            positive
                            disabled={!isValid || isSubmitting}
                        />
                        <Button
                            content='Cancel'
                            type="button"
                            floated="right"
                            as={Link}
                            to='/grades'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})