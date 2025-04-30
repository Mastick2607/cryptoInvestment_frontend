import { Routes } from '@angular/router';
import { CryptocurrencyListComponent } from './components/cryptocurrency-list/cryptocurrency-list.component';
import { CrytoDetailComponent } from './components/cryto-detail/cryto-detail.component';

export const routes: Routes = [

    { path: '', component:CryptocurrencyListComponent  },
    
    {
        path:'cryptodetail/:id',component:CrytoDetailComponent,

       },
];
