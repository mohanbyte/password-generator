import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tooltipText: string = 'Copy to clipboard';
  passwordForm: FormGroup;
  generatedPassword = '';
  readonly alphabetChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  readonly numberChars = '0123456789';
  readonly specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      length: [
        8,
        [Validators.required, Validators.min(1), Validators.max(128)],
      ],
      includeAlphabets: [true],
      includeNumbers: [false],
      includeSpecialChars: [false],
      noRepeats: [false],
    });
    this.passwordForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
  updateTooltip() {
    this.tooltipText = 'Copy to clipboard';
  }
  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedPassword);
    this.tooltipText = 'Copied!';
  }

  generatePassword() {
    if (this.passwordForm.invalid) {
      alert('Please fix the errors in the form before generating a password.');
      return;
    }

    const {
      length,
      includeAlphabets,
      includeNumbers,
      includeSpecialChars,
      noRepeats,
    } = this.passwordForm.value;
    let flagCount = 0;
    let charPool = '';
    if (includeAlphabets) {
      charPool += this.alphabetChars;
      flagCount++;
    }
    if (includeNumbers) {
      charPool += this.numberChars;
      flagCount++;
    }
    if (includeSpecialChars) {
      charPool += this.specialChars;
      flagCount++;
    }
    const selectedFlags = [
      includeAlphabets,
      includeNumbers,
      includeSpecialChars,
    ].filter(Boolean).length;
    if (length < selectedFlags) {
      alert(
        'Password length must be at least equal to the number of selected character types.'
      );
      return;
    }

    if (!charPool) {
      alert(
        'Please select at least one character type to generate a password.'
      );
      return;
    }

    if (noRepeats && length > charPool.length) {
      alert(
        'Password length exceeds the number of unique characters available. Disable "No Repeats" or reduce the length.'
      );
      return;
    }

    this.generatedPassword = this.generateRandomPassword(
      charPool,
      length,
      noRepeats
    );
  }

  private generateRandomPassword(
    pool: string,
    length: number,
    noRepeats: boolean
  ): string {
    let result = '';
    const usedChars = new Set<string>();

    for (let i = 0; i < length; i++) {
      let randomChar;

      do {
        const randomIndex = Math.floor(Math.random() * pool.length);
        randomChar = pool[randomIndex];
      } while (noRepeats && usedChars.has(randomChar));

      result += randomChar;
      if (noRepeats) usedChars.add(randomChar);
    }

    return result;
  }
}
