import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    public gifList: Gif[] = []; 

    private _tagHistory: string[] = [];
    private apiKey: string = 'M9Seh90EQo7VCGCcCBJuSPe0n1IvekMO';
    private serviceUrl:string = 'https://api.giphy.com/v1/gifs/';
    
    constructor(private http:HttpClient) {
        this.loadLocalStorage();
     }

    get tagHistory() {
        return [...this._tagHistory];
    }

    organizeHistory(tag:string) {
        tag = tag.toLocaleLowerCase();
        // Recibo el tag nuevo 
        if(this._tagHistory.includes(tag)) {
            // Elimino el tag si ya existe
            this._tagHistory = this._tagHistory.filter((olTag) => olTag !== tag);
        }
        // Ingreso el nuevo tag
        this._tagHistory.unshift(tag);
        this._tagHistory = this._tagHistory.splice(0,12);
        // Guardo en el localStorage
        this.saveLocalStorage();
    }
    
    private saveLocalStorage():void {
        localStorage.setItem('history',JSON.stringify(this._tagHistory));
    }

    private loadLocalStorage():void {
        if(!localStorage.getItem('history')) return;
        this._tagHistory = JSON.parse(localStorage.getItem('history')!);
        if(this._tagHistory.length === 0) return;
        this.seachTag(this._tagHistory[0]);
    }

    seachTag(tag: string):void {
        // Para que no puedan enviar input vacio
        if (tag.length === 0) return;
        this.organizeHistory(tag);
        // 
        const params = new HttpParams()
            .set('apiKey', this.apiKey)
            .set('limit', '12')
            .set('q', tag)

        // Petición http
        this.http.get<SearchResponse>(`${this.serviceUrl}search`, {params})
            .subscribe(resp => {
                this.gifList = resp.data;
            });
        
    }

    
}