import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import StudentList from "./StudentList";


export default observer(function StudentDashboard() {

    const { studentStore } = useStore();
    const { loadStudents, studentRegistry } = studentStore;

    useEffect(() => {
        if (studentRegistry.size <= 1) loadStudents();
    }, [studentRegistry.size, loadStudents])

    if (studentStore.loadingInitial) return <LoadingComponent content='Loading students...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <StudentList />
            </Grid.Column>
            <GridColumn width='6'>
                <h2>Students filters</h2>
            </GridColumn>
        </Grid>
    )
})