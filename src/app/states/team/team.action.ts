import { createAction, props } from '@ngrx/store';
import TeamModel from 'src/app/models/team.model';

export const removeTeamState = createAction('[Team] Remove');
export const getTeam = createAction('[Team] Get', props<{ teamId: string }>());
export const getTeamList = createAction('[Team] GetList');
export const getTeamLoadedList = createAction('[Team] LoadedList', props<{ teams: TeamModel [] }>());
export const getTeamLoaded = createAction('[Team] Loaded', props<{ team: TeamModel }>());
export const createTeam = createAction('[Team] Create', props<{ team: TeamModel }>());
export const updateTeam = createAction('[Team] Update', props<{ team: TeamModel }>());
export const deleteTeam = createAction('[Team] Delete', props<{ teamId: string }>());
