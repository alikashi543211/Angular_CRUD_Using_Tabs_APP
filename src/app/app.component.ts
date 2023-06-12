import { DBOperation } from './common/db-operation';
import { User } from './common/user.interface';
import { UserService } from './common/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MustMatch } from './common/must.match.validator';

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
    users: User[] = [];
    buttonTxt: string;
    dbops: DBOperation;


    @ViewChild('nav') elFile: any;
    constructor(private _userService: UserService, private _toastr: ToastrService) {
    }

    ngOnInit() {
        this.setFormState();
        this.getUsers();
    }

    setFormState() {
        this.buttonTxt = "Save";
        this.dbops = DBOperation.add;
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
        },
            MustMatch('password', 'confirmPassword'),
        );
    }

    get ctrl() {
        return this.addForm.controls;
    }

    register() {
        this.submitted = true;
        console.log(this.addForm.value);
        if (this.addForm.invalid) {
            return;
        }
        switch (this.dbops) {
            case DBOperation.add:
                this._userService.addUser(this.addForm.value).subscribe(res => {
                    this._toastr.success("User Added !!", "User Registration");
                    this.getUsers();
                    this.resetForm();
                    this.elFile.select('viewtab');
                })
                break;
            case DBOperation.update:
                this._userService.updateUser(this.addForm.value).subscribe(res => {
                    this._toastr.success("User Updated !!", "User Registration");
                    this.getUsers();
                    this.resetForm();
                    this.elFile.select('viewtab');
                })
                break;
        }
    }

    resetForm() {
        this.dbops = DBOperation.add;
        this.buttonTxt = 'Save';
        this.submitted = false;
        this.addForm.reset();
    }

    getUsers() {
        this._userService.getAllUsers().subscribe((res: User[]) => {
            this.users = res;
            // console.log(this.users);
        });
    }

    onEdit(userId: number) {
        this.dbops = DBOperation.update;
        this.buttonTxt = 'Update';

        let user = this.users.find((u: User) => u.id === userId);
        this.addForm.patchValue(user);
        this.elFile.select('addtab');

        this.addForm.get('password').setValue('');
        this.addForm.get('confirmPassword').setValue('');
        this.addForm.get('acceptTerms').setValue(false);
    }

    onDelete(userId: number) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this._userService.deleteUser(userId).subscribe(res => {
                    this._toastr.success("Record Deleted !!", "User Registration");
                    // swalWithBootstrapButtons.fire(
                    //     'Deleted!',
                    //     'Your record has been deleted.',
                    //     'success'
                    // )
                    this.getUsers();
                });

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your record is safe :)',
                    'error'
                )
            }
        })
    }

    tabChange() {
        this.resetForm();
    }

}
