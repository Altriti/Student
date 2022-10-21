import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default observer(function StudentDetails() {

    const { studentStore } = useStore();
    const { selectedStudent: student, loadStudent, loadingInitial } = studentStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadStudent(id);
    }, [id, loadStudent]);

    if (loadingInitial || !student) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/culture.jpg`} />
            {/* <Image src={`/assets/categoryImages/{student.id}.jpg`} />     ->>> qdo student ka me 
            pas foton te rujtne me emer te id se tij, culture osht veq sa per testim*/}
            <Card.Content>
                <Card.Header>{student.id}</Card.Header>
                <Card.Meta>
                    <span>{student.name} {student.surname}</span>
                </Card.Meta>
                <Card.Description>
                    <div>{student.email}</div>
                    <div>{student.phoneNumber}</div>
                    <div>{student.street}</div>
                    <div>{student.city}</div>
                    <div>{student.state}</div>
                    <div>{student.gender}</div>
                    <div>{student.nationality}</div>
                    <div>{student.parentName}</div>
                    <div>{student.parentEmail}</div>
                    <div>{student.parentPhoneNumber}</div>
                    <div>{student.parentStreet}</div>
                    <div>{student.parentCity}</div>
                    <div>{student.parentState}</div>
                    <div>{student.isConfirmed.toString()}</div>
                    <div>{student.appUserId}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/edit/${student.id}`} basic color="blue" content='Edit' />
                    <Button as={Link} to='/students' basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}) 