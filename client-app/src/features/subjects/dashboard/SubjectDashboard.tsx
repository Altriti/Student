import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import SubjectList from "./SubjectList";

export default observer(function SubjectDashboard() {

    const { subjectStore } = useStore();
    const { subjectRegistry, loadSubjects, loadingInitial } = subjectStore;

    useEffect(() => {
        if (subjectRegistry.size < 1) loadSubjects();
    }, [subjectRegistry, loadSubjects]);

    if(loadingInitial) return <LoadingComponent content="Loading subjects"/>

    return (
        <Grid>
            <Grid.Column width='10'>
                <SubjectList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Subject filters</h2>
            </Grid.Column>
        </Grid>
    )
})