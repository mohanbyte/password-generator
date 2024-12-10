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

  password: string = '';

  generatePassword() {
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let charPool = alphabets;

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
