import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  pub: Object;
  //titulo: String;
  //texto: String;
  //slug: String;
  

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private route: Router
  ) { }
  
  ngOnInit() {
    let id = this.route.url.split("/")[2];

     this.authService.getOnePub(id).subscribe( publicacao => {
       this.pub = publicacao.slug[0];
     },
      err => {
        console.log(err);
        return false;
      });
  }

  onSubmit() {
    let id = this.route.url.split("/")[2];

    const update = {
      titulo: titulo.value,
      texto: texto.value,
      slug: slug.value
    }

    // Required Fields
    if(!this.validateService.validatePub(update)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    this.authService.updatePub(id, update).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Success', {cssClass: 'alert-success', timeout: 3000});
        this.route.navigate(['/publicacoes']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}
