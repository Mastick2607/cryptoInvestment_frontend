import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-cryptocurrency-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, MatPaginatorModule],
  templateUrl: './cryptocurrency-list.component.html',
  styleUrl: './cryptocurrency-list.component.css'
})
export class CryptocurrencyListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'cmc_rank', 'name', 'symbol', 'market_cap', 'alert',
    'circulating_supply', 'volume_24h', 'percent_change_1h', 
    'percent_change_24h', 'percent_change_7d'
  ];

  dataSourceCryto = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.getCryptos();
  }

  ngAfterViewInit() {
    this.dataSourceCryto.paginator = this.paginator;
  }

  getCryptos() {
    this.cryptoService.getCryto().subscribe((data: any) => {
      // Asignamos los datos al dataSourceCryto
      this.dataSourceCryto.data = data.data;
    });
  }
}
