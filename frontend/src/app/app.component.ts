import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { environment } from '../environments/environment.prod';

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
    this.http.request('get', environment.apiUrl).subscribe({
      next:(response) => {
        console.log('Backend response:', response);
      },
      error: (error) => {
        console.error('Error fetching data from backend:', error);
      }
    });
  }
}
