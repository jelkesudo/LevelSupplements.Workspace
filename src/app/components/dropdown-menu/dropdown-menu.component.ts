import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DropdownItem {
  label: string;
  action: () => void;
}
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  @Input() items: DropdownItem[] = [];
  @Input() top: string = '0px';
  @Input() left: string = '0px';
  @Input() visible: boolean = false;

  @Output() closed = new EventEmitter<void>();

  onItemClick(action: () => void) {
    action();
    this.closed.emit();
  }
}
