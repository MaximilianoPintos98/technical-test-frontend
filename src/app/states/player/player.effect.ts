import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import ApiService from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import PlayerModel from 'src/app/models/player.model';
import { getPlayerList, getPlayerLoadedList } from './player.action'

@Injectable()
export default class PlayerEffects {
    getPlayerList$ = createEffect(() => this.actions$.pipe(
        ofType(getPlayerList),
        mergeMap((action) => this.service.getPlayersList(action.filters)
            .pipe(
                map((players) => {
                    return ( getPlayerLoadedList({ players }) );
                }),
                catchError((error) => {
                    this.showNotification('loaded', true);
                    return of({ type: '[Player] Error', ErrorDet: `${error}` });
                }),
            )),
    ));

    createPlayer$ = createEffect(() => this.actions$.pipe(
        ofType('[Player] Create'),
        mergeMap((action: any) => this.service.create('Player', action.player)
            .pipe(
                map(() => {
                    this.showNotification('created', false);
                    return ({ type: '[Player] Create Success' });
                }),
                catchError((error) => {
                    this.showNotification('created', true);
                    return of({ type: '[Player] Error', ErrorDet: `${error}` });
                }),
            )),
    ));

    updatePlayer$ = createEffect(() => this.actions$.pipe(
        ofType('[Player] Update'),
        mergeMap((action: any) => this.service.update('Player', action.player)
            .pipe(
                map(() => {
                    this.showNotification('updated', false);
                    return ({ type: '[Player] Update Success' });
                }),
                catchError((error) => {
                    this.showNotification('updated', true);
                    return of({ type: '[Player] Error', ErrorDet: `${error}` });
                }),
            )),
    ));

    deletePlayer$ = createEffect(() => this.actions$.pipe(
        ofType('[Player] Delete'),
        mergeMap((action: any) => this.service.delete('Player', action.playerId)
            .pipe(
                map(() => {
                    this.showNotification('deleted', false);
                    return ({ type: '[Player] Delete Success' });
                }),
                catchError((error) => {
                    this.showNotification('created', true);
                    return of({ type: '[Player] Error', ErrorDet: `${error}` });
                }),
            )),
    ));

    loadPlayer$ = createEffect(() => this.actions$.pipe(
        ofType('[Player] Get'),
        mergeMap((action: any) => {
            if (action.playerId === undefined || action.playerId === '') {
                return new Observable<PlayerModel>();
            }
            return this.service.get('Player', action.playerId);
        }),
        map(res => ({ type: '[Player] Loaded', player: res })),
        catchError(error => of({ type: '[Player] Error', ErrorDet: `${error}` })),
    ));

    showNotification(message: string, isError: boolean): void {
        if (isError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Error when ${message}`,
                footer: '<a href="/players">Back</a>'
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
        private readonly store: Store,
        private readonly service: ApiService,
        private readonly actions$: Actions,
    ) {
    }
}
