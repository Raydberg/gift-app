import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gift-list-item',
  imports: [],
  templateUrl: './gift-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftListItemComponent {
  imageUrl = input.required<string>()
}
