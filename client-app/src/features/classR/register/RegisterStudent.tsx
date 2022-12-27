import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Dropdown, Item } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function RegisterStudent() {
    const { studentStore, classesStore } = useStore();
    const { studentsArr, studentRegistry, loadStudents, } = studentStore;
    const { resgisterStudent, selectedClass: classR, loadingInitial } = classesStore;

    useEffect(() => {
        if (studentRegistry.size <= 1) loadStudents();
    }, [studentRegistry.size, loadStudents])

    if (loadingInitial || !classR) return <LoadingComponent content="Loading Students" />;


    return (
        <Dropdown text="Add student to class" className='link item'>
            <Dropdown.Menu>
                {studentsArr.map(student => (
                    <Item key={student.id}>
                        <Dropdown.Item onClick={() => resgisterStudent(classR.id, student.id)}>
                            <div>{student.id}</div>
                            <div>{student.name}</div>
                            <div>{student.surname}</div>
                        </Dropdown.Item>
                    </Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
})