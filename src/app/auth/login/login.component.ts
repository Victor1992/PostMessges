import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";

import { AuthService } from './../auth.service';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {

    isLoading = false;

    constructor(public authService: AuthService) { }

    onLogin(form: NgForm) {
        if (!form) return;

        this.authService.login(form.value.email, form.value.password);
    }

}