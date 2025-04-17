import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageHelper {
  constructor(private http: HttpClient) {}

  convertToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Data = reader.result as string;
            resolve(base64Data);
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        },
        error: (error) => reject(error)
      });
    });
  }
}