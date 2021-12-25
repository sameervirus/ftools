import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: any;
  OrignCategories: any;
  productions: any;
  p: number = 1;
  category = { id: 0, name: '' };
  loading = false;
  isUpdate = false;

  constructor(
    private codingService: CodingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.codingService.getProductCategory().subscribe((res) => {
      this.categories = res.body;
      this.OrignCategories = res.body;
    });
  }

  onSearchChange(e: any) {
    let str = e.target.value;
    this.categories = this.OrignCategories.filter((a: any) =>
      a.name.toLowerCase().includes(str.toLowerCase())
    );
  }

  onSubmit(categoryForm: any) {
    this.loading = true;
    this.codingService
      .addCategory(this.category.id, this.category.name)
      .subscribe({
        next: (res) => {
          if (this.isUpdate) {
            this.categories = res.body;
            this.showNotify('تم تحديث العنصر الخاص بك بنجاح', 'success');
            this.isUpdate = false;
            this.category.id = 0;
          } else {
            this.categories.push(res.body);
            this.showNotify('تمت إضافة العنصر الخاص بك بنجاح', 'success');
          }
          categoryForm.reset();
        },
        error: (err) => {
          let message = '';
          if (err.status == 422) {
            message = JSON.stringify(err.error.errors);
          } else {
            console.log(err);
            message = 'الخادم معطل ، يرجى المحاولة مرة أخرى';
          }
          this.showNotify(message, 'error');
        },
        complete: () => (this.loading = false),
      });
  }

  editCategory(id: number, name: string) {
    this.isUpdate = true;
    this.category.id = id;
    this.category.name = name;
  }

  resetFrom(categoryForm: any) {
    categoryForm.reset();
    this.isUpdate = false;
    this.category.id = 0;
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }
}
