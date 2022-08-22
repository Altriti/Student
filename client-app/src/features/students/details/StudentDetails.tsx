import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Student } from "../../../app/models/student";


interface Props {
    student: Student;
    cancelSelectStudent: () => void;
    openForm: (id: string) => void;
}


export default function StudentDetails({ student, cancelSelectStudent,openForm }: Props) {
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
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic onClick={() => openForm(student.id)} color="blue" content='Edit' />
                    <Button basic onClick={cancelSelectStudent} color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}