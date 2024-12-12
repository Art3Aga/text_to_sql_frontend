import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [ MatIconModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, FormsModule ],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.scss',
})
export class TranslatorComponent implements OnInit {

  text: string = '';
  loading: boolean = false;
  queryResult: string = '';

  constructor(private readonly api: ApiService) {}


  ngOnInit(): void {

  }

  translateSql() {
    this.loading = true;
    this.queryResult = 'Cargando...';
    this.api.translateToSql(this.text).subscribe({
      next: (data) => {
        this.loading = false;
        this.queryResult = data.result;
      },
      error: (err) => {
        this.loading = false;
        this.queryResult = `Error en el modelo: ${err}`;
        console.log(`Error en la API: ${err}`);
      },
    })
  }

}
