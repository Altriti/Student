import { observer } from "mobx-react-lite"
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store"
import RegisterProfessor from "../register/RegisterProfessor";
import RegisterStudent from "../register/RegisterStudent";

export default observer(function ClassDetails() {
    const { classesStore } = useStore();
    const { loadClass, selectedClass: classR, loadingInitial, deleteClass } = classesStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    useEffect(() => {
        if (id) loadClass(id)
    }, [id, loadClass]);

    if (loadingInitial || !classR) return <LoadingComponent content="Loading Class" />;

    return (
        <>
            <Card fluid>
                <Image src={`/assets/categoryImages/culture.jpg`} />
                {/* <Image src={`/assets/categoryImages/{student.id}.jpg`} />     ->>> qdo student ka me 
            pas foton te rujtne me emer te id se tij, culture osht veq sa per testim*/}
                <Card.Content>
                    <Card.Header>{classR.id}</Card.Header>
                    <Card.Description>
                        <div>{classR.id}</div>
                        <div>{classR.className}</div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button as={Link} to={`/edit/${classR.id}`} basic color="blue" content='Edit' />
                        <Button onClick={() => deleteClass(classR.id).then(() => history.push('/'))} basic color="red" content='Delete' />
                        {/* <Button as={Link} to='/classes' basic color="grey" content='Cancel' /> */}
                    </Button.Group>
                </Card.Content>
            </Card>

            <RegisterStudent />

            <RegisterProfessor classId={classR.id}/>

        </>
    )
})