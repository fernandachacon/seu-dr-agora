import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type BtnVariants = 'primary' | 'secondary';

@Component({
  selector: 'btn-primary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-primary.html',
  styleUrls: ['./btn-primary.scss'],
})
export class BtnPrimaryComponent {
  @Input('btn-text') btnText = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() variant: BtnVariants = 'primary';

  @Output() clicked = new EventEmitter<void>();

  submit() {
  this.clicked.emit();
}

}
