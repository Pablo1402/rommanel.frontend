import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CreateAddressRequestModel, CreateAddressResponseModel, DeleteAddressRequestModel, UpdateAddressRequestModel, UpdateAddressResponseModel } from "../models/address/address.model";
import { CreateClientResponseModel } from "../models/Client/client.model";

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    private readonly apiUrl = environment.api;

    constructor(private http: HttpClient) {

    }


    deleteAddress(model: DeleteAddressRequestModel): Observable<boolean> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.http.delete(`${this.apiUrl}/address`, { headers, body: model }).pipe(
            map((response: any) => {
                return response === null || response === undefined;
            })
        );
    }

    saveAddress(model: CreateAddressRequestModel): Observable<CreateAddressResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.post<CreateAddressResponseModel>(`${this.apiUrl}/address`, model, { headers }).pipe(
            map((response: CreateAddressResponseModel) => {
                return response;
            })
        );
    }


    updateUser(id: string, model: UpdateAddressRequestModel): Observable<UpdateAddressResponseModel> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.put<UpdateAddressResponseModel>(`${this.apiUrl}/address/${id}`, model, { headers }).pipe(
            map((response: UpdateAddressResponseModel) => {
                return response;
            })
        );
    }
}