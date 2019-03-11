import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // which tab is selected now
  public selectedTab: string;

  constructor(private router: Router) {
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
    // TODO: log user out
  }

}
