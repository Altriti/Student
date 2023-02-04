import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { TimetableFormValues } from "../../app/models/timetable";
import { useStore } from "../../app/stores/store";

export default observer(function TimetableForm() {
    const { timetableStore } = useStore();
    const { timetableRegistry, createTimetable, updateTimetable, loadTimetable } = timetableStore;
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [timetable, setTimetable] = useState<TimetableFormValues>(new TimetableFormValues());

    function handleFormSubmit(timetable: TimetableFormValues) {
        let result = timetableRegistry.has(timetable.id)
        if (!result) {
            createTimetable(timetable).then(() => history.push(`/timetables/${timetable.id}`));
        } else {
            updateTimetable(timetable).then(() => history.push(`timetables/${timetable.id}`));
        }
    }

    // useEffect(() => {
    //     if (id) loadTimetable(id).then(timetable => {
    //         if (timetable) {
    //             setTimetable(new TimetableFormValues({
    //                 id: timetable.id,
    //                 classId: timetable.classId,
    //                 weekDayschedules: timetable.weekDaySchedules[0]
    //             }))
    //         }
    //     });
    // }, [id, loadTimetable]);

    return (
        <Segment clearing>
            <Formik
                initialValues={timetable}
                onSubmit={values => handleFormSubmit(values)}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name="id" placeholder="Timetable Id" />
                        <MyTextInput name="classId" placeholder="Class Id" />
                        {timetable.weekDayschedules.map((weekDaySchedule, index) => (
                            <>
                                <MyTextInput
                                    key={index}
                                    name={`weekDayschedules.${index}.day`}
                                    placeholder="Day"
                                    type="number"
                                />
                                {weekDaySchedule.schedules.map((schedule, index) => (
                                    <>
                                        <MyTextInput
                                            key={index}
                                            name={`weekDayschedules.${index}.schedules.${index}.subjectId`}
                                            placeholder="Subject Id"
                                        />
                                        <MyTextInput
                                            key={index}
                                            name={`weekDayschedules.${index}.schedules.${index}.time`}
                                            placeholder="Time"
                                        />
                                    </>
                                ))}
                            </>
                        ))}
                        <Button
                            content='Submit'
                            disabled={isSubmitting || !dirty || !isValid}
                            floated="right"
                            positive
                            type="submit"
                        />
                    </Form>
                )}
            </Formik>

        </Segment>

    )
})