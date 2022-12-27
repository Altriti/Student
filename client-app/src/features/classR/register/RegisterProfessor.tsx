import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Dropdown, Item } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

interface Props{
    classId : string
}

export default observer(function RegisterProfessor(props: Props) {
    const { professorStore, classesStore } = useStore();
    const { professorArr, professorRegistry, loadProfessors } = professorStore;
    const { registerProfessor, selectedClass, loadingInitial } = classesStore;

    

    useEffect(() => {
        if (professorRegistry.size <= 1) loadProfessors()
    }, [professorRegistry.size, loadProfessors])

    if (loadingInitial || !selectedClass) return <LoadingComponent content="Loading class" />

    return (
        <Dropdown text="Add professor to class" className='link item'>
            <Dropdown.Menu>
                {professorArr.map(professor => (
                    <Item key={professor.id}>
                        <Dropdown.Item onClick={() => registerProfessor(props.classId, professor.id)}>
                            <div>{professor.id}</div>
                            <div>{professor.name}</div>
                            <div>{professor.surname}</div>
                        </Dropdown.Item>
                    </Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
})