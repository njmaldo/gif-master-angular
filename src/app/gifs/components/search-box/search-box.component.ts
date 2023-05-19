import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { style } from '@angular/animations';

@Component({
    selector: 'gifs-search-box',
    styleUrls: ['./search-box.component.css'],
    template: `
    <h5>Busca tu personaje favorito</h5>
    <input type="text"
           class="form-control "
           placeholder="Buscar Gifs..."
           (keyup.enter)="searchTag()"
           #textTagInput>
    `
})

export class SearchBoxComponent {

    @ViewChild('textTagInput')
    public tagInput!: ElementRef<HTMLInputElement>

    constructor(private GifsService: GifsService ) { }
    

    searchTag() {
        const newTag = this.tagInput.nativeElement.value;
        // llamo al servicio
        this.GifsService.seachTag(newTag);
        // limpio
        this.tagInput.nativeElement.value = '';
    }
}