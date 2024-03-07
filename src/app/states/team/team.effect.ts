import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import ApiService from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import TeamModel from 'src/app/models/team.model';
import { getTeamList, getTeamLoadedList } from './team.action';

@Injectable()
export default class TeamEffects {
    getTeamList$ = createEffect(() => this.actions$.pipe(
        ofType(getTeamList),
        mergeMap(() => this.service.getList('Team')
            .pipe(
                map((teams: TeamModel[]) => {
                    return ( getTeamLoadedList({ teams }) );
                }),
                catchError((error) => {
                    this.showNotification('loaded', true);
                    return of({ type: '[Team] Error', ErrorDet: `${error}` });
                }),
            )),
    ));

    createTeam$ = createEffect(() => this.actions$.pipe(
        ofType('[Team] Create'),
        mergeMap((action: any) => this.service.create('Team', action.team)
            .pipe(
                map(() => {
                    this.showNotification('created', false);
                    return ({ type: '[Team] GetList' });
                }),
                catchError((error) => {
                    this.showNotification('created', true);
                    return of({ type: '[Team] Error', ErrorDet: `${error}` });
                }),
            )),
    ));

    updateTeam$ = createEffect(() => this.actions$.pipe(
        ofType('[Team] Update'),
        mergeMap((action: any) => this.service.update('Team', action.team)
            .pipe(
                map(() => {
                    this.showNotification('updated', false);
                    return ({ type: '[Team] GetList' });
                }),
                catchError((error) => {
                    this.showNotification('updated', true);
                    return of({ type: '[Team] Error', ErrorDet: `${error}` });
                }),
            )),
    ));

    deleteTeam$ = createEffect(() => this.actions$.pipe(
        ofType('[Team] Delete'),
        mergeMap((action: any) => this.service.delete('Team', action.teamId)
            .pipe(
                map(() => {
                    this.showNotification('deleted', false);
                    return ({ type: '[Team] GetList' });
                }),
                catchError((error) => {
                    this.showNotification('created', true);
                    return of({ type: '[Team] Error', ErrorDet: `${error}` });
                }),
            )),
    ));

    loadTeam$ = createEffect(() => this.actions$.pipe(
        ofType('[Team] Get'),
        mergeMap((action: any) => {
            if (action.teamId === undefined || action.teamId === '') {
                return new Observable<TeamModel>();
            }
            return this.service.get('Team', action.teamId);
        }),
        map(res => ({ type: '[Team] Loaded', team: res })),
        catchError(error => of({ type: '[Team] Error', ErrorDet: `${error}` })),
    ));

    showNotification(message: string, isError: boolean): void {
        if (isError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Error when ${message}`,
                footer: '<a href="/teams">Back</a>'
            })
            return
        }
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Record ${message} successfully`,
            showConfirmButton: false,
            timer: 1000
        })
        return
    }

    constructor(
        private readonly service: ApiService,
        private readonly actions$: Actions,
    ) {
    }
}
