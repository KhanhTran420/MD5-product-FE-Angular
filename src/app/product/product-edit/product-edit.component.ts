import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  selectedFile = null;
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    image: new FormControl(),
    category: new FormControl()
  });
  id: number;
  categories: Category[] = [];
  image = null;
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get('id');
      this.getProductById(this.id);
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  // productForm: FormGroup;
  // id: number;
  // categories: Category[] = [];
  // constructor(private productService: ProductService,
  //             private categoryService: CategoryService,
  //             private activatedRoute: ActivatedRoute) {
  //   this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
  //     this.id = +paramMap.get('id');
  //     this.getProduct(this.id);
  //   });
  // }
  //
  // ngOnInit() {
  //   this.getAllCategories();
  // }
  //
  // getProduct(id: number) {
  //   return this.productService.findById(id).subscribe(product => {
  //     this.productForm = new FormGroup({
  //       name: new FormControl(product.name),
  //       price: new FormControl(product.price),
  //       description: new FormControl(product.description),
  //     });
  //   });
  // }
  // editProduct(id: number) {
  //   const product = this.productForm.value;
  //   this.productService.editProduct(id, product).subscribe(() => {
  //     alert('Success');
  //   }, e => {
  //     console.log(e);
  //     }
  //   );
  // }
  //
  // private getAllCategories() {
  //   this.categoryService.getAllCategory().subscribe(categories => {
  //     this.categories = categories;
  //   });
  // }
  private getProductById(id: number) {
    return this.productService.findById(id).subscribe((product) => {
      // this.image = product.image;
      this.productForm = new FormGroup({
        id: new FormControl(product.id),
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        description: new FormControl(product.description),
        image: new FormControl(product.image),
        category: new FormControl(product.category.id),
      });
    });
  }

  editProduct(id: number) {
    if (this.productForm.invalid) {
      return;
    } else  {
      const product: FormData = new FormData();
      product.append('id', this.productForm.get('id').value);
      product.append('name', this.productForm.get('name').value);
      product.append('price', this.productForm.get('price').value);
      product.append('description', this.productForm.get('description').value);
      product.append('image', this.selectedFile);
      product.append('category', this.productForm.get('category').value);
      // const product = this.productForm.value;
      // product.category = {
      //   id: product.category
      // };
      this.productService.editProduct(id, product).subscribe(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/product/list']);
      });
    }
  }
  private getAllCategories() {
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories;
    }, (error) => {
      alert(error);
    });
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
}
