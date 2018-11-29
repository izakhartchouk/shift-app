import { Component, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { startWith, delay } from "rxjs/operators";

import { Helpers } from "../helpers/helpers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  subscription: Subscription;
  authentication: boolean;

  constructor(private helpers: Helpers) { }

  ngAfterViewInit() {
    this.subscription = this.helpers.isAuthenticationChanged().pipe(
      startWith(this.helpers.isAuthenticated()),
      delay(0)).subscribe((value) =>
        this.authentication = value
      );

  }

  title = 'Shift App';

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
