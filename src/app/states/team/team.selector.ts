import { createSelector } from "@ngrx/store";
import TeamStore from "./team.model";

export const getFullState = (currentState: any): TeamStore => currentState.teamReducer;
export const selectCurrentTeamState = createSelector(
    getFullState, (state: TeamStore) => state.current,
);
export const selectTeamListState = createSelector(
    getFullState, (state: TeamStore) => state.teams,
);
