import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive()
export abstract class BaseCommonCodeComponent {
  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.key;
    if (charCode > '31' && (charCode < '48' || charCode > '57')) {
      return false;
    }
    return true;
  }

  formatAmount(control: AbstractControl | null): void {
    if (control && control.value) {
      const amount = parseFloat(control.value);
      const formattedAmount = amount.toFixed(2);
      control.patchValue(formattedAmount);
    }
  }
}
