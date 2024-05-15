import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ApiService] // Provide the ApiService
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  afterEach(() => {
    // Verify that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data from API', () => {
    const mockUser = { login: 'testUser', name: 'Test User' };

    // Make a mock HTTP request
    service.getUser('testUser').subscribe(user => {
      expect(user).toEqual(mockUser); // Verify that the response matches the mock data
    });

    const req = httpMock.expectOne('https://api.github.com/users/testUser');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockUser);
  });

  it('should get repositories data from API', () => {
    const mockRepos = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];

    // Make a mock HTTP request
    service.getRepos('testUser').subscribe(repos => {
      expect(repos).toEqual(mockRepos); // Verify that the response matches the mock data
    });

    const req = httpMock.expectOne('https://api.github.com/users/testUser/repos');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockRepos);
  });
});
