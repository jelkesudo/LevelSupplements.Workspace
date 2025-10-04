import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
    isLoading = false;

    showLoader(): void {
        this.isLoading = true;
    }

    hideLoader(): void {
        this.isLoading = false;
    }
}
