import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Student } from '../models/student';
import NavBar from './NavBar';
import StudentDashboard from '../../features/students/dashboard/StudentDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Students.list().then(response => {
      setStudents(response);
      setLoading(false);
    })
  }, [])


  function handleSelectStudent(id: string) {
    setSelectedStudent(students.find(x => x.id === id))
  }

  function handleCancelSelectStudent() {
    setSelectedStudent(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectStudent(id) : handleCancelSelectStudent();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleEditCreateStudent(student: Student) {
    setSubmitting(true);
    if (student.id) {
      agent.Students.update(student).then(() => {
        setStudents([...students.filter(x => x.id !== student.id), student])
        setSelectedStudent(student);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      student.id = uuid();
      agent.Students.create(student).then(() => {
        setStudents([...students, student])
        setSelectedStudent(student);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteStudent(id: string) {
    setSubmitting(true);
    agent.Students.delete(id).then(() => {
      setStudents([...students.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <StudentDashboard
          students={students}
          selectedStudent={selectedStudent}
          selectStudent={handleSelectStudent}
          cancelSelectStudent={handleCancelSelectStudent}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createEdit={handleEditCreateStudent}
          deleteStudent={handleDeleteStudent}
          submitting={submitting}
        />
      </Container>

    </Fragment>
  );
}

export default App;
