import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  pubs: Object;
  page: Number = 1;
 
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getPubs().subscribe(pub => {
      this.pubs = pub.pub;
    })
  }

  

}
