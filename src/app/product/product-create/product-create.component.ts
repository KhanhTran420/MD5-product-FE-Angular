import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';
import {Product} from '../../model/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  userFile: any = File;
  product: Product[] = [];
  categories: Category[] = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(),
    category: new FormControl('')
  });
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.getAllCategories();
  }

  onSelectFile(event: Event) {
    // @ts-ignore
    this.userFile = event.target.files[0];
  }
  submit() {
    if (this.productForm.invalid) {
      return;
    } else {
      const product = new FormData();
      product.append('name', this.productForm.get('name').value);
      product.append('price', this.productForm.get('price').value);
      product.append('description', this.productForm.get('description').value);
      product.append('image', this.userFile);
      product.append('category', this.productForm.get('category').value);
      // product.category = {
      //   id: product.category
      // };
      this.productService.saveProduct(product).subscribe(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        });
      });
      this.productForm.reset();
      // this.router.navigate(['/product/list']);
    }
  }
  get nameControl() {
    return this.productForm.get('name');
  }
  get priceControl() {
    return this.productForm.get('price');
  }
  get descriptionControl() {
    return this.productForm.get('description');
  }
  getAllCategories() {
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories;
    }, (error) => {
      alert(error);
        }
    );
  }
}
