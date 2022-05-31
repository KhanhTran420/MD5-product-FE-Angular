import {Component, OnInit} from '@angular/core';
import {Category} from './model/category';
import {ProductService} from './service/product.service';
import {CategoryService} from './service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-product-management';
  categories: Category[] = [];

  ngOnInit(): void {
  }
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    });
  }
}
