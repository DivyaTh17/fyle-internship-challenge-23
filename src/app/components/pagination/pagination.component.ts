import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  onPageChange(event: any) {
    const selectedPage = event.target?.value; // Access 'value' property safely
    if (selectedPage) {
      this.pageChange.emit(parseInt(selectedPage, 10));
    }
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isLastPage(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return this.currentPage === totalPages;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize) || 0;
  }

  get availablePages(): number[] {
    const totalPages = this.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
