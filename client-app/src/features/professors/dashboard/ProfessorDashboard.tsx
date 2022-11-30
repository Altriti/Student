import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ProfessorList from "./ProfessorList";

export default observer(function ProfessorDashboard() {
    const { professorStore } = useStore();
    const { professorRegistry, loadProfessors, loadingInitial } = professorStore;


    useEffect(() => {
        if (professorRegistry.size <= 1) loadProfessors();
    }, [professorRegistry.size, loadProfessors])


    if (loadingInitial) return <LoadingComponent content='Loading professors...' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ProfessorList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Professor filters</h2>
            </Grid.Column>
        </Grid>
    )
})