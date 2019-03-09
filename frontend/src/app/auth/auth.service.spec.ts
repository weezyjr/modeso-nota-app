import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      NotifierModule
    ],
    providers: [
      // to attach JWT on requests
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      // to handle errors
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  /*
    // Run first time
    it('should register', async () => {
      const service: AuthService = TestBed.get(AuthService);
      await service.register(new User('name', 'test@test.com', 'test', 'testtest'))
        .subscribe(() => {
          expect(service.currentUser).toBeDefined();
          expect(service.currentUser.jwt).toBeDefined();
          expect(service.currentUser.username).toEqual('test');
          expect(service.currentUser.email).toEqual('test@test.com');
          expect(service.currentUser.fullname).toEqual('name');
        });
    });*/

  it('should login', async () => {
    const service: AuthService = TestBed.get(AuthService);
    await service.login('test', 'testtest').subscribe(() => {
      expect(service.currentUser).toBeDefined();
      expect(service.currentUser.jwt).toBeDefined();
      expect(service.currentUser.username).toEqual('test');
      expect(service.currentUser.email).toEqual('test@test.com');
      expect(service.currentUser.fullname).toEqual('name');
    });
  });

  it('should retrive user from localstorage', async () => {
    const service: AuthService = TestBed.get(AuthService);
    await service.currentUser$.subscribe((value) => {
      expect(service.currentUser).toBeDefined();
      expect(service.currentUser.jwt).toBeDefined();
      expect(service.currentUser.username).toEqual('test');
      expect(service.currentUser.email).toEqual('test@test.com');
      expect(service.currentUser.fullname).toEqual('name');
    });
  });

  it('should logout', () => {
    const service: AuthService = TestBed.get(AuthService);
    service.logout();
    expect(service.currentUser).toBeNull();
  });

  afterAll(() => {
    localStorage.removeItem('currentUser');
  });

});
