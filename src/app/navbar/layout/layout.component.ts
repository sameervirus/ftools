import { Component, OnInit, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../../_services';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-nav',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
	sideStatus = false;
	device = this.deviceService.deviceType;
	navStyle = environment.navStyle ?? 'navbar-white navbar-light';

	constructor(
		private authenticationService: AuthenticationService,
		private render: Renderer2,
		private deviceService: DeviceDetectorService,
		private idle: Idle,
		private keepalive: Keepalive
	) {
		if (localStorage.getItem('currentUser')) {
			idle.setIdle(3600);
			// sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
			idle.setTimeout(5);
			// sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
			idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

			idle.onTimeout.subscribe(() => {
				this.logout();
			});

			// sets the ping interval to 15 seconds
			keepalive.interval(15);

			this.reset();
		}
	}

	reset() {
		this.idle.watch();
	}

	ngOnInit(): void {
		this.bodyClasses();
	}

	logout() {
		this.authenticationService.logout();
	}

	changeSide() {
		if (this.sideStatus) {
			this.render.addClass(document.body, 'sidebar-collapse');
			if (this.device != 'desktop') {
				this.render.removeClass(document.body, 'sidebar-open');
				this.render.addClass(document.body, 'sidebar-closed');
			}
			this.sideStatus = false;
		} else {
			this.render.removeClass(document.body, 'sidebar-collapse');
			if (this.device != 'desktop') {
				this.render.removeClass(document.body, 'sidebar-closed');
				this.render.addClass(document.body, 'sidebar-open');
			}
			this.sideStatus = true;
		}
	}

	bodyClasses() {
		if (this.device != 'desktop') {
			this.render.removeClass(document.body, 'hold-transition');
			this.render.addClass(document.body, 'sidebar-closed');
			this.render.addClass(document.body, 'sidebar-collapse');
		}
	}
}
