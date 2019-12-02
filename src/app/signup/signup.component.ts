import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Usuario } from '../shared/model/usuario.model';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { UserService } from '../shared/services/UserService.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})


export class SignupComponent implements OnInit {

    user: Usuario = new Usuario();

    constructor(public service: UserService) { }

    ngOnInit() {
        this.service.formModel.reset();
    }

    click_efetuarCadastro() {

        this.service.register().subscribe(
            (res: any) => {
                if (res.succeeded) {
                    this.service.formModel.reset();
                    alert('New user created!');
                } else {
                    res.errors.forEach(element => {
                        switch (element.code) {
                            case 'DuplicateUserName':
                                alert('Username is already taken');
                                break;
                            default:
                                alert('element.description');
                                break;
                        }
                    });
                }
            },
            err => {
                console.log(err);
            }
        );


        return false;
    }
}
