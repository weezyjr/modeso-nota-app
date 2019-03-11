import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // which tab is selected now
  public selectedTab: string;
  public notesUrl = '/dashboard/notes';
  public publicNotesUrl = '/dashboard/notes/public';
  public profileUrl = '/dashboard/profile';

  constructor(private router: Router, private authService: AuthService) {
    // update seleceted tab on router change
    router.events.subscribe(() => {
      this.selectedTab = this.router.url;
    });
  }

  ngOnInit() {
  }

  goTo(url: string) {
    // navigate and select tab
    this.router.navigateByUrl(url);
    this.selectedTab = url;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
