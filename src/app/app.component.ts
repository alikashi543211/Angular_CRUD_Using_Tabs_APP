import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular_CRUD_Using_Tabs_APP';
    // addForm: FormGroup = new FormGroup({});
    addForm: FormGroup;
    submitted: boolean = false;

    constructor() {

    }

    ngOnInit() {
        this.setFormState();
    }

    setFormState() {
        this.addForm = new FormGroup({
            id: new FormControl(0),
            title: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            // dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|3[01])$/)])),
            dob: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            confirmPassword: new FormControl('', Validators.required),
            acceptTerms: new FormControl(false, Validators.requiredTrue)
        });
    }

    get f(){
        return this.addForm.controls;
    }

    register() {
        this.submitted = true;
        if (this.addForm.invalid) {
            alert("Validation failed");
        } else {
            alert("Validation Successfull");
        }
    }

    resetForm() {
        alert("resetForm");
    }
}
