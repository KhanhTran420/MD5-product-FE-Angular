import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // p: number = 1;
  products: Product[] = [];
  categories: Category[] = [];
  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getAllProduct();
    this.getAllCategories();
  }

   getAllProduct() {
     this.productService.getAll().subscribe((data) => {
       this.products = data;
       // tslint:disable-next-line:only-arrow-functions
       $(function() {
         $('#products').DataTable({
           paging: true,
           lengthChange: false,
           searching: true,
           ordering: true,
           info: true,
           pageLength: 2,
           autoWidth: false,
           responsive: true,
         });
       });
     }, (error) => {
       console.log(error);
     });
   }
  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    });
  }
}
