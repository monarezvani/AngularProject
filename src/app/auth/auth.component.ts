import { Component, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { alertDirective } from '../shared/alert-dynamic-componet/alertDirective.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  LoggingMode = true;
  //   //for hide authForm when loggin

  isLoggedIn = false;
  error: string = null;
  @ViewChild('authForm') form: NgForm;
  //   //for access to the place for dynamic component

  @ViewChild(alertDirective, { static: false }) alertDirect: alertDirective;

  //for unsubscribe close button in alert
  closeSubscribe: Subscription


  onSwitchMode() {
    this.LoggingMode = !this.LoggingMode;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoggedIn = true;

    if (this.LoggingMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoggedIn = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        //   //show error
        this.alertDynamicComponent(this.error)
        this.isLoggedIn = false;
      }
    );

    this.form.reset();
  }
  //dynamic create component in type alertcomponent
  private alertDynamicComponent(error: string) {

    const ResolveCmpFact = this.cmpFactResolver.resolveComponentFactory(AlertComponent)
    const HostView = this.alertDirect.viewContainer;
    console.log(HostView)
    HostView.clear()
    const CmpRef = HostView.createComponent(ResolveCmpFact);
    CmpRef.instance.message = error;
    this.closeSubscribe = CmpRef.instance.close.subscribe(() => {
      this.closeSubscribe.unsubscribe();
      HostView.clear()
    })
  }


  constructor(private authService: AuthService, private router: Router, private cmpFactResolver: ComponentFactoryResolver) { }
  ngOnDestroy() {
    if (this.closeSubscribe) {
      this.closeSubscribe.unsubscribe()

    }
  }
}
