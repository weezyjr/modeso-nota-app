import { Component, OnInit, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() clickOutside: EventEmitter<boolean> = new EventEmitter();

  // keyboard escape key
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.clickOutside.emit(true);
  }

  // (evenet: { ... }) just to make the linter happy :)
  handleOutsideClick(event: { target: { classList: string[]; }; }) {
    // check if it is the background
    if (event.target.classList && event.target.classList[0] === 'modal') {
      this.clickOutside.emit(true);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
