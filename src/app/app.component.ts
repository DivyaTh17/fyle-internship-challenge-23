import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: any;
  repositories: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  isLoading: boolean = true;
  totalRepositories: number = 0;

  constructor(private apiService: ApiService) {}

  async onSearch(username: string) {
    try {
      this.user = await this.apiService.getUser(username).toPromise();
      this.fetchRepositories(username);
    } catch (error) {
      console.error('Error fetching user:', error);
      // Handle error
    }
  }

  fetchRepositories(username: string) {
    this.apiService.getRepos(username, this.currentPage, this.pageSize).subscribe(
      (reposResponse: any) => {
        console.log('Response from API:', reposResponse);
        this.repositories = reposResponse;
        this.isLoading = false;
        for (let repo of reposResponse) {
          console.log('Repository Name:', repo.name);
          console.log('Repository Description:', repo.description);
        }
      },
      (error: any) => {
        console.error('Error fetching repositories:', error);
        this.isLoading = false;
        // Handle error
      }
    );
  }
  
  

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchRepositories(this.user.login);
  }
}
