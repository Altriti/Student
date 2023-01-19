import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import GradesList from "./GradesList";

export default observer(function GradesDashboard() {
    const { gradesStore } = useStore();
    const { gradesRegistry, loadGrades, loadingInitial } = gradesStore;

    useEffect(() => {
        if (gradesRegistry.size < 1) loadGrades()
    }, [gradesRegistry.size, loadGrades])

    if (loadingInitial) return <LoadingComponent content="Loading grades" />

    return (
        <Grid>
            <Grid.Column width='6'>
                <GradesList />
            </Grid.Column>
            <Grid.Column width='4'>
                Filters
            </Grid.Column>
        </Grid>
    )
})