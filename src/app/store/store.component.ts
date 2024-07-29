import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  stores: any[] = [];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getStores().subscribe(data => {
      this.stores = data.stores;
    });
  }
}
