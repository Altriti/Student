import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function TimetableList() {
    const { timetableStore } = useStore();
    const { timetablesArr, deleteTimetable, loading } = timetableStore;

    const [target, setTarget] = useState('');

    function handleTimetableDelete(id: string, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name)
        deleteTimetable(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {timetablesArr.map(timetable => (
                    <Item key={timetable.id}>
                        <Item.Description>
                            <div>timetable id: {timetable.id}</div>
                            <div>timetable class id: {timetable.classId}</div>
                            <div>timetable class : {timetable.class.className}</div>
                            {timetable.weekDaySchedules.map(weekDaySchedule => (
                                <div key={weekDaySchedule.weekDayScheduleId}>
                                    <div> weekDaySchedule id: {weekDaySchedule.weekDayScheduleId}</div>
                                    <div>weekDaySchedule day: {weekDaySchedule.day}</div>
                                    {weekDaySchedule.schedules.map(schedule => (
                                        <div key={schedule.scheduleId}>
                                            <div>Schedule id: {schedule.scheduleId}</div>
                                            <div>Subject id: {schedule.subjectId}</div>
                                            <div>Subject : {schedule.subject.name}</div>
                                            <div>Time : {schedule.time}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Item.Description>
                        <Item.Extra>
                            <Button
                                content='View'
                                color="blue"
                                as={Link}
                                to={`/timetables/${timetable.id}`}
                            />
                            <Button
                                content='Delete'
                                color="red"
                                name={timetable.id}
                                onClick={(e) => handleTimetableDelete(timetable.id, e)}
                                loading={loading || target === timetable.id}
                            />
                        </Item.Extra>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})