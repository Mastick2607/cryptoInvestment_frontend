import {Component, ViewChild,OnInit} from '@angular/core';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {CryptoService} from '../../services/crypto.service'

@Component({
  selector: 'app-cryptocurrency-list',
  standalone: true,
  imports: [MatTableModule,MatIconModule,CommonModule,MatPaginatorModule],
  templateUrl: './cryptocurrency-list.component.html',
  styleUrl: './cryptocurrency-list.component.css'
})
export class CryptocurrencyListComponent implements OnInit {

  displayedColumns: string[] = ['cmc_rank','name','symbol','market_cap','alert','circulating_supply','volume_24h','percent_change_1h','percent_change_24h','percent_change_7d',];
  dataSourceCryto= new MatTableDataSource<any>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  


  constructor(
    private _cryptoService:CryptoService,
    private router: Router
  ) {}


  ngOnInit(): void {
    
  }
  loadCategories() {
    this._cryptoService.getCategories().subscribe((data: any) => {
      this.dataSourceCryto = new MatTableDataSource(data.categories); // ✅ CORRECTO
      this.dataSourceCryto.paginator = this.paginator; // ✅ Asigna el paginador aquí   
   console.log(data);
   
    });
  }

}
