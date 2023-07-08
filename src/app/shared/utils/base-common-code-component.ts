import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive()
export abstract class BaseCommonCodeComponent {
  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.key;
    if (charCode !== 'Backspace' && (charCode < '0' || charCode > '9')) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  formatAmount(control: AbstractControl | null): void {
    if (control && control.value) {
    const inputElement = document.activeElement as HTMLInputElement;
    const cursorPosition = inputElement.selectionStart;

      const amount = parseFloat(control.value);
      const formattedAmount = amount.toFixed(2);
      control.patchValue(formattedAmount);

    // Set the cursor position to the end of the integer part of the number
    const integerPartLength = formattedAmount.split('.')[0].length;
    const newCursorPosition = Math.min(cursorPosition as number, integerPartLength);
    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }
}
