import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Student } from "../../../app/models/student";
import StudentDetails from "../details/StudentDetails";
import StudentForm from "../form/StudentForm";
import StudentList from "./StudentList";

interface Props {
    students: Student[];
    selectedStudent: Student | undefined;
    selectStudent: (id: string) => void;
    cancelSelectStudent: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createEdit: (student: Student) => void;
    deleteStudent: (id: string) => void;
    submitting: boolean;
}


export default function StudentDashboard({ students, selectedStudent,
    selectStudent, cancelSelectStudent, editMode, openForm, closeForm, createEdit,
    deleteStudent, submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <StudentList
                    students={students}
                    selectStudent={selectStudent}
                    deleteStudent={deleteStudent}
                    submitting={submitting}
                />
            </Grid.Column>
            <GridColumn width='6'>
                {selectedStudent && !editMode &&
                    <StudentDetails
                        student={selectedStudent}
                        cancelSelectStudent={cancelSelectStudent}
                        openForm={openForm}
                    />}
                {editMode &&
                    <StudentForm
                        closeForm={closeForm}
                        student={selectedStudent}
                        createEdit={createEdit}
                        submitting={submitting}
                    />}
            </GridColumn>
        </Grid>
    )
}