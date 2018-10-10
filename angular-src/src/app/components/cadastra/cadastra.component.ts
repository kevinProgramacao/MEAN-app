import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastra',
  templateUrl: './cadastra.component.html',
  styleUrls: ['./cadastra.component.css']
})
export class CadastraComponent implements OnInit {
  titulo: String;
  texto: String;
  slug: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    const cad = {
      titulo: this.titulo,
      texto: this.texto,
      slug: this.slug
    }

    // Required Fields
    if(!this.validateService.validatePub(cad)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    this.authService.insertPub(cad).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Success', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/publicacoes']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
}
