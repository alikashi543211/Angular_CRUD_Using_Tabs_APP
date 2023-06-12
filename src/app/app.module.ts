import { DataService } from './common/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
