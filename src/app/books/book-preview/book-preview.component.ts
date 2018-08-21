import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { BookModel } from '../models/BookModel';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css']
})
export class BookPreviewComponent implements OnInit {

  @ViewChild('captionHover')
  captionHover: ElementRef;

  @Input() model: BookModel;
  @Input() shouldBlur: boolean;
  @Output() blurEvent: EventEmitter<boolean> = new EventEmitter();
  isHovered: boolean = false;
  constructor() { }

  ngOnInit() {
    this.watchForNativeMouseLeave();
  }
  watchForNativeMouseLeave() {
    this.captionHover.nativeElement.addEventListener('mouseleave', (ev) => {
      this.isHovered = false;
      this.blurEvent.emit(false);

    });
  }
  mouseOver(ev) {
    console.log(ev);
    this.isHovered = true;
    this.blurEvent.emit(true);
  }
}
