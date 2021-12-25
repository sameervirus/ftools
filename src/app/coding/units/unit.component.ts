import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
})
export class UnitComponent implements OnInit {
  units: any;
  OrignUnits: any;
  productions: any;
  p: number = 1;
  unit = { id: 0, name: '' };
  loading = false;
  isUpdate = false;

  constructor(
    private codingService: CodingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUnits();
  }

  getUnits() {
    this.codingService.getProductUnit().subscribe((res) => {
      this.units = res.body;
      this.OrignUnits = res.body;
    });
  }

  onSearchChange(e: any) {
    let str = e.target.value;
    this.units = this.OrignUnits.filter((a: any) =>
      a.name.toLowerCase().includes(str.toLowerCase())
    );
  }

  onSubmit(unitForm: any) {
    this.loading = true;
    this.codingService.addUnit(this.unit.id, this.unit.name).subscribe({
      next: (res) => {
        if (this.isUpdate) {
          this.units = res.body;
          this.showNotify('تم تحديث العنصر الخاص بك بنجاح', 'success');
          this.isUpdate = false;
          this.unit.id = 0;
        } else {
          this.units.push(res.body);
          this.showNotify('تمت إضافة العنصر الخاص بك بنجاح', 'success');
        }
        unitForm.reset();
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

  editUnit(id: number, name: string) {
    this.isUpdate = true;
    this.unit.id = id;
    this.unit.name = name;
  }

  resetFrom(unitForm: any) {
    unitForm.reset();
    this.isUpdate = false;
    this.unit.id = 0;
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }
}
