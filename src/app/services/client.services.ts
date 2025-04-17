import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ClientResponseModel, CreateClientRequestModel, CreateClientResponseModel, DeleteClientRequestModel, SearchClientResponseModel, UpdateClientRequestModel, UpdateClientResponseModel } from "../models/Client/client.model";
import { catchError, map, Observable } from "rxjs";
import { PaginatedResponse } from "../models/Helpers/paginated-response";


@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private readonly apiUrl = environment.api;

    constructor(private http: HttpClient) {

    }

    getClients(pageIndex: number | null, pageSize: number | null, search: string | null): Observable<PaginatedResponse<SearchClientResponseModel>> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        let params = new HttpParams()
            .set('pageIndex', pageIndex ?? 1)
            .set('pageSize', pageSize ?? 10);
        if (search)
            params = params.set('search', search);

        return this.http.get<PaginatedResponse<SearchClientResponseModel>>(`${this.apiUrl}/client`, { params, headers }).pipe(
            map((response: PaginatedResponse<SearchClientResponseModel>) => {
                return response;
            })
        );
    }

    getClient(id: string): Observable<ClientResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.get<ClientResponseModel>(`${this.apiUrl}/client/${id}`, { headers }).pipe(
            map((response: ClientResponseModel) => {
                return response;
            })
        );
    }

    deleteClient(model: DeleteClientRequestModel): Observable<boolean> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.http.delete(`${this.apiUrl}/client`, { headers, body: model }).pipe(
            map((response: any) => {
                return response === null || response === undefined;
            })
        );
    }
    saveClient(model: CreateClientRequestModel): Observable<CreateClientResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.post<CreateClientResponseModel>(`${this.apiUrl}/client`, model, { headers }).pipe(
            map((response: CreateClientResponseModel) => {
                return response;
            })
        );
    }


    updateClient(id: string, model: UpdateClientRequestModel): Observable<UpdateClientResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.put<UpdateClientResponseModel>(`${this.apiUrl}/client/${id}`, model, { headers }).pipe(
            map((response: UpdateClientResponseModel) => {
                return response;
            })
        );
    }
}