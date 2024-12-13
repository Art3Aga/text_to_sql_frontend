import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';







@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [
    MatIconModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, FormsModule, MatButtonModule,
    MatTableModule, CommonModule
  ],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.scss',
})
export class TranslatorComponent implements OnInit {

  text: string = '';
  loading: boolean = false;
  queryResult: string = '';
  data: any[] = [];
  showButtonExecute: boolean = false;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private readonly api: ApiService) {}


  ngOnInit(): void {
    //this.executeQuery()
  }

  translateSql() {
    this.loading = true;
    this.queryResult = 'Cargando...';
    this.api.translateToSql(this.text).subscribe({
      next: (data) => {
        this.loading = false;
        this.showButtonExecute = true;
        this.queryResult = data.result;
      },
      error: (err) => {
        this.showButtonExecute = false;
        this.loading = false;
        this.queryResult = `Error en el modelo: ${err}`;
        console.log(`Error en la API: ${err}`);
      },
    })
  }

  executeQuery(query: string) {
    this.api.executeQuery(query).subscribe({
      next: (data) => {
        console.log(data)
        this.displayedColumns = data.columns;
        this.dataSource = data.rows;
      },
      error: (err) => {
        console.log(`Error en la API: ${err}`);
      },
    })
  }


  clearData() {
    this.showButtonExecute = false;
    this.text = '';
    this.queryResult = '';
  }

}
