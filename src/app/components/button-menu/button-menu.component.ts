import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.scss']
})
export class ButtonMenuComponent implements OnInit {

  @Input()
  description = '';
  @Input()
  selected = false;

  @Output()
  click = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.click.emit();
  }

}
