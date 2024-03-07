import { createReducer, on } from '@ngrx/store';
import TeamStore from './team.model';
import TeamModel from 'src/app/models/team.model';
import { getTeamLoaded, getTeamLoadedList, removeTeamState } from './team.action';


export const initialState: TeamStore = {
  teams: [],
  current: undefined,
};

export const teamReducer = createReducer(
  initialState,
  on(getTeamLoaded, (state, action) => ({ ...state, current: action.team, teams: state.teams })),
  on(getTeamLoadedList, (state, action) => ({ ...state, current: state.current, teams: action.teams })),
  on(removeTeamState, (state, action) => ({ ...state, current: new TeamModel(), teams: state.teams })),
);
