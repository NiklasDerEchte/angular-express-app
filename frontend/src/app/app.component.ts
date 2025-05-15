import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // The apiUrl already contains a /api, so the URL looks something like this: https://../api/api
    // This might look strange but makes sense.
    // To ensure both services run under a single url, they need different base paths. Hence the first /api. For more details, refer to the Readme.
    // The second /api is the actual path defined in the backend API.
    this.http.request('get', environment.apiUrl + '/api').subscribe({
      next:(response) => {
        console.log('Backend response:', response);
      },
      error: (error) => {
        console.error('Error fetching data from backend:', error);
      }
    });
  }
}
