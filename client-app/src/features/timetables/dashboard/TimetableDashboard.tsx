import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TimetableList from "./TimetableList";

export default observer(function TimetableDashboard() {
    const { timetableStore } = useStore();
    const { timetableRegistry, loadTimetables, loadingInitial } = timetableStore;

    useEffect(() => {
        if (timetableRegistry.size < 1) loadTimetables();
    }, [timetableRegistry, loadTimetables]);

    if (loadingInitial) return <LoadingComponent content="Loading timetables" />

    return (
        <Grid>
            <Grid.Column width='6'>
                <TimetableList />
            </Grid.Column>
            <Grid.Column width='4'>
                Filerts
            </Grid.Column>
        </Grid>
    )
})