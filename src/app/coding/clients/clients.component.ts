import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  p: number = 1;
  clients: any;
  orginClients: any;
  client = {
    id: 0,
    name: '',
  };
  loading = false;
  isUpdate = false;

  constructor(
    private codingService: CodingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  onSubmit(clientForm: any) {
    this.loading = true;
    this.codingService.addClient(this.client.id, this.client.name).subscribe({
      next: (res) => {
        if (this.isUpdate) {
          this.clients = res.body;
          this.showNotify('تم تحديث العنصر الخاص بك بنجاح', 'success');
        } else {
          this.clients.push(res.body);
          this.showNotify('تمت إضافة العنصر الخاص بك بنجاح', 'success');
        }
        this.resetFrom(clientForm);
      },
      error: (err) => {
        let message = '';
        if (err.status == 422) {
          message = JSON.stringify(err.error.errors);
        } else {
          message = 'الخادم معطل ، يرجى المحاولة مرة أخرى';
        }
        this.showNotify(message, 'error');
      },
      complete: () => (this.loading = false),
    });
  }

  getClients() {
    this.codingService.getClients().subscribe((res) => {
      this.clients = res.body;
      this.orginClients = res.body;
    });
  }

  onSearchChange(e: any) {
    let str = e.target.value;
    this.clients = this.orginClients.filter((a: any) =>
      a.name.toLowerCase().includes(str.toLowerCase())
    );
  }

  editClient(id: number, name: string) {
    this.isUpdate = true;
    this.client.id = id;
    this.client.name = name;
  }

  resetFrom(clientForm: any) {
    clientForm.reset();
    this.isUpdate = false;
    this.client.id = 0;
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }
}
