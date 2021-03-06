
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private fb: FormBuilder, private http: HttpClient) { }
    readonly BaseURI = 'https://localhost:44387/cadastrar';

    formModel = this.fb.group({
        Nome: ['', Validators.required],
        Email: ['', Validators.email],
        Login: ['', Validators.required],
        Passwords: this.fb.group({
            Password: ['', [Validators.required, Validators.minLength(4)]],
            ConfirmPassword: ['', Validators.required]
        }, { validator: this.comparePasswords })
    });

    comparePasswords(fb: FormGroup) {
        const confirmPswrdCtrl = fb.get('ConfirmPassword');
        // passwordMismatch
        // confirmPswrdCtrl.errors={passwordMismatch:true}
        if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
            if (fb.get('Password').value !== confirmPswrdCtrl.value) {
                confirmPswrdCtrl.setErrors({ passwordMismatch: true });
            } else {
                confirmPswrdCtrl.setErrors(null);
            }
        }
    }

    register() {

        const body = {
            Nome: this.formModel.value.Nome,
            Email: this.formModel.value.Email,
            Login: this.formModel.value.Login,
            Senha: this.formModel.value.Passwords.Password
        };

        console.log(body);

        return this.http.post(this.BaseURI + '/cadastrar', body);
    }

    login(formData) {
        return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
    }

    getUserProfile() {
        return this.http.get(this.BaseURI + '/UserProfile');
    }
}
