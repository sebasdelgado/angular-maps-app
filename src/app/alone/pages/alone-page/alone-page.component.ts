import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../component/counter-alone/counter-alone.component";
import { SideMenuComponent } from "../../component/side-menu/side-menu.component";

@Component({
  standalone: true,
  imports: [CounterAloneComponent, SideMenuComponent],
  templateUrl: './alone-page.component.html',
})
export class AlonePageComponent {

}
