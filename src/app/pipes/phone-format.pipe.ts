import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Remove qualquer coisa que não seja número
    value = value.replace(/\D/g, '');

    // Formata o telefone no padrão (00) 00000-0000
    if (value.length <= 10) {
      return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1 $2-$3');
    } else {
      return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '$1 $2-$3');
    }
  }
}