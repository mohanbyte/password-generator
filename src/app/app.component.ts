import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  passwordLength: number = 8;
  includeAlphabets: boolean = true;
  includeNumbers: boolean = false;
  includeSpecialCharacters: boolean = false;

  password: string = '';

  generatePassword() {
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charPool = '';
    if (this.includeAlphabets) charPool += alphabets;
    if (this.includeNumbers) charPool += numbers;
    if (this.includeSpecialCharacters) charPool += specialChars;

    if (!charPool) {
      this.password = 'Please select at least one option.';
      return;
    }

    this.password = Array.from(
      { length: this.passwordLength },
      () => charPool[Math.floor(Math.random() * charPool.length)]
    ).join('');
  }
}
