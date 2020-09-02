import { AuthService } from '../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    //authenticated
    isAuthenticated = false;

    selectedItem: string;
    //save Data to back-end storage
    onSaveData() {
        this.db.storeRecipe()
    }
    //fetch data from backend
    onFetchData() {
        this.db.fetchRecipes().subscribe()

    }
    //logOut
    onLogOut() {
        this.auth.logout()
    }
    constructor(private db: DataStorageService, private auth: AuthService) {

    }
    ngOnInit() {
        this.auth.user.subscribe(user => {
            this.isAuthenticated = user ? true : false;
        })

    }
    ngOnDestroy() {

    }
}