import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrl: './custom-accordion.component.scss'
})
export class CustomAccordionComponent {
  @Input() items: { title: string; description: string }[] = [];

  openedIndex: number | null = null;

  toggle(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
}
