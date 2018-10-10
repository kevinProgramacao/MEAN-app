import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  pubs:Object;

  constructor(
    private authService:AuthService,
    private flasMessage: FlashMessagesService,
    private route: Router
  ) { }

  ngOnInit() {
    this.authService.getPubs().subscribe(publicacoes => {
      this.pubs = publicacoes.pub;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  onDelete(id) {
    this.authService.deletePub(id).subscribe( data => {
      if(data.success) {
        this.flasMessage.show('Success', {cssClass: 'alert-success', timeout: 3000});
        location.reload();
      } else {
        this.flasMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}
