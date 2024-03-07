import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { enviroment } from "../enviroment";
import PlayerModel from "../models/player.model";
import FilterPlayerDTO from "../models/playerFilter.model";

function handleError(error: HttpErrorResponse): Observable<never> {

    return throwError(() => new Error(error.message));
}

@Injectable({
    providedIn: 'root',
})
export default class ApiService {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    getPlayersList(filters: FilterPlayerDTO): Observable<PlayerModel[]> {
        let params = new HttpParams();
        if(filters.firstName && filters.firstName !== "") params = params.set('firstName', filters.firstName!)
        if(filters.lastName && filters.lastName !== "") params = params.set('lastName', filters.lastName!)
        
        return this.httpClient
            .get<any>(`${enviroment.baseUrl}Players`, { params: params })
            .pipe(retry(0), catchError(handleError));
    }

    getList(controller: string): Observable<any> {
        return this.httpClient
            .get<any>(`${enviroment.baseUrl}${controller}s`)
            .pipe(retry(0), catchError(handleError));
    }

    get(controller:string, Id: string): Observable<any> {
        return this.httpClient
            .get<PlayerModel>(`${enviroment.baseUrl}${controller}/${Id}`)
            .pipe(retry(0), catchError(handleError));
    }

    create(controller: string, model: any): Observable<any> {
        return this.httpClient
            .post<any>(`${enviroment.baseUrl}${controller}`, model)
            .pipe(retry(0), catchError(handleError));
    }

    update(controller: string, model: any): Observable<any> {
        return this.httpClient
            .put<any>(`${enviroment.baseUrl}${controller}/${model.id}`, model)
            .pipe(retry(0), catchError(handleError));
    }

    delete(controller: string, Id: any): Observable<any> {
        return this.httpClient
            .delete<any>(`${enviroment.baseUrl}${controller}/${Id}`)
            .pipe(retry(0), catchError(handleError));
    }
}