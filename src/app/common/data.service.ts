import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class DataService implements InMemoryDbService {

    constructor() { }

    createDb() {
        let users: User[] = [
            { id: 1, title: 'Mr', firstName: 'Ajeet', lastName: 'Singh', dob: '2000-05-15', email: 'ajeet@test.com', password: '123456', accpetTerms: true },
            { id: 1, title: 'Mr', firstName: 'Chandan', lastName: 'Singh', dob: '2010-10-25', email: 'chandan@test.com', password: '898765', accpetTerms: true },
            { id: 1, title: 'Miss', firstName: 'Puja', lastName: 'Kumar', dob: '2006-12-05', email: 'puja@test.com', password: 'puja@123', accpetTerms: true },
            { id: 1, title: 'Mr', firstName: 'Pawan', lastName: 'Singh', dob: '2001-09-15', email: 'pawan@test.com', password: '987999', accpetTerms: true },
            { id: 1, title: 'Mr', firstName: 'Sameer', lastName: 'Raj', dob: '2012-05-25', email: 'sameer@test.com', password: '1948200', accpetTerms: true },
        ]

        return { users };
    }
}
