import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function TimetableDetails() {
    const { timetableStore } = useStore();
    const { selectedTimetable: timetable, loadingInitial, loadTimetable } = timetableStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadTimetable(id)
    }, [id, loadTimetable])

    if (loadingInitial || !timetable) return <LoadingComponent content="Loading timetable" />

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{timetable.id}</Card.Header>
                <Card.Description>
                    <div>Class id : {timetable.classId}</div>
                    <div>Class : {timetable.class.className}</div>
                    {timetable.weekDaySchedules.map(weekDaySchedule => (
                        <div key={weekDaySchedule.weekDayScheduleId}>
                            <div>WeekScheduleId : {weekDaySchedule.weekDayScheduleId}</div>
                            <div>Day : {weekDaySchedule.day}</div>
                            {weekDaySchedule.schedules.map(schedule => (
                                <div key={schedule.scheduleId}>
                                    <div>Schedule id : {schedule.scheduleId}</div>
                                    <div>Subject id : {schedule.subjectId}</div>
                                    <div>Subject : {schedule.subject.name}</div>
                                    <div>Time : {schedule.time}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button
                        content='Edit'
                        basic
                        color="blue"
                        as={Link}
                        to={`/timetables/edit/${timetable.id}`}
                    />
                    <Button
                        basic
                        content='Cancel'
                        color="grey"
                        as={Link}
                        to='/timetables'
                    />
                </Button.Group>

            </Card.Content>
        </Card>
    )
})