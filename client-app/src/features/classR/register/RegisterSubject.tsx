import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Dropdown, Item } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function RegisterSubject() {
    const { subjectStore, classesStore } = useStore();
    const { subjectsArr, subjectRegistry, loadSubjects } = subjectStore;
    const { registerSubject, selectedClass, loadingInitial } = classesStore;

    useEffect(() => {
        if (subjectRegistry.size <= 1) loadSubjects()
    }, [subjectRegistry.size, loadSubjects])

    if (loadingInitial || !selectedClass) return <LoadingComponent content="Loading class" />

    return (
        <Dropdown text="Add subject to class" className='link item'>
            <Dropdown.Menu>
                {subjectsArr.map(subject => (
                    <Item key={subject.id}>
                        <Dropdown.Item onClick={() => registerSubject(selectedClass.id, subject.id)}>
                            <div>{subject.id}</div>
                            <div>{subject.name}</div>
                        </Dropdown.Item>
                    </Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
})