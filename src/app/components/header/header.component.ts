import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}


}
