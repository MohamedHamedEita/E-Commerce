import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})

export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private _OrderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(page: number = 1) {
    this._OrderService.getAllOrders(page).subscribe({
      next: (res:any) => {
        this.orders = res.data;
        console.log(this.orders)
        this.totalPages = res.paginationResult.numberOfPages; // depends on your backend structure
        this.currentPage = page;
      },
      error: (err:any) => {
        console.error('Failed to fetch orders', err);
      }
    });
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.fetchOrders(page);
    }
  }
}
