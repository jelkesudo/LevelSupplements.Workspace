import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  repeatCount = Array(300);

  itemsFill = [
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
  ];
}
