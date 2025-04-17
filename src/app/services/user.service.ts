import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { UserRequestModel, UserResponseModel } from "../models/users/user-response.model";
import { PaginatedResponse } from "../models/Helpers/paginated-response";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private readonly apiUrl = environment.api;

    constructor(private http: HttpClient) {

    }


    getUsers(pageIndex: number | null, pageSize: number | null, search: string | null): Observable<PaginatedResponse<UserResponseModel>> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        let params = new HttpParams()
            .set('pageIndex', pageIndex ?? 1)
            .set('pageSize', pageSize ?? 10);
        if (search)
            params = params.set('search', search);

        return this.http.get<PaginatedResponse<UserResponseModel>>(`${this.apiUrl}/user`, { params, headers }).pipe(
            map((response: PaginatedResponse<UserResponseModel>) => {
                return response;
            })
        );
    }

    getUser(id: number): Observable<UserResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.get<UserResponseModel>(`${this.apiUrl}/user/${id}`, { headers }).pipe(
            map((response: UserResponseModel) => {
                return response;
            })
        );
    }

    deleteUser(id: number): Observable<UserResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.delete<UserResponseModel>(`${this.apiUrl}/user/${id}`, { headers }).pipe(
            map((response: UserResponseModel) => {
                return response;
            })
        );
    }

    updateUser(id: number, model: UserRequestModel): Observable<UserResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.put<UserResponseModel>(`${this.apiUrl}/user/${id}`, model, { headers }).pipe(
            map((response: UserResponseModel) => {
                return response;
            })
        );
    }

    saveUser(model: UserRequestModel): Observable<UserResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.post<UserResponseModel>(`${this.apiUrl}/user`, model, { headers }).pipe(
            map((response: UserResponseModel) => {
                return response;
            })
        );
    }

}