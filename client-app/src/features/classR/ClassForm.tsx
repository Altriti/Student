import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Dropdown, Item } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function ClassForm() {
    const { studentStore } = useStore();
    const { studentsArr, studentRegistry, loadStudents } = studentStore;

    useEffect(() => {
        if (studentRegistry.size <= 1) loadStudents();
    }, [studentRegistry.size, loadStudents])




    return (
        <Dropdown text="Choose a student" className='link item'>
            <Dropdown.Menu>
                {studentsArr.map(student => (
                    <Item key={student.id}>
                        <Dropdown.Item>
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