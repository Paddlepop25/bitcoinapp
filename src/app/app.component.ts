import { Component } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators, AbstractControl, FormGroupDirective } from '@angular/forms';
// import { BitcoinService } from './bitcoinservice.service'

// import { BuyBitcoin } from './buybitcoin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'bitcoinapp';
  form: FormGroup;
  gender = ['Male', 'Female'];
  orderType = ['Buy', 'Sell'];
  // value: number;
  bitcoinResult = {}

  // expected validations in comments
  // all fields are required
  contactNumberFormControl = new FormControl('', [Validators.required, Validators.pattern(/(8|9)\d{7}$/)]); // must be valid Singapore mobile, should not contain invalid characters, +, -, space, and round brackets are allowed
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]); // min length = 3, max length = 20
  dobFormControl = new FormControl('', [Validators.required, above21Validator]); // at least 21 years old
  orderDateFormControl = new FormControl('', [Validators.required]);
  orderTypeFormControl = new FormControl('', [Validators.required]);
  orderUnitFormControl = new FormControl('', [Validators.required, Validators.min(1)]); // must be in number
  // cryptoBitcoinSGPriceFormControl = new FormControl('', []); // must be in decimal
  qrCodeOrBitCoinAddressFormControl = new FormControl('', [Validators.required]);
  cryptoSGPriceFormControl = new FormControl('', []); // must be in decimal
  genderFormControl = new FormControl('', []);
  
  // constructor(private bitcoinSvc: BitcoinService, private fb: FormBuilder){
  constructor(private fb: FormBuilder){
    this.form = fb.group({
      "contactNumber": this.contactNumberFormControl,
      "name": this.nameFormControl,
      "dob": this.dobFormControl,
      "orderDate": this.orderDateFormControl,
      "orderType": this.orderTypeFormControl,
      "orderUnit": this.orderUnitFormControl,
      // "cryptoBitcoinSGPrice": this.cryptoBitcoinSGPriceFormControl,
      "qrCodeOrBitCoinAddress": this.qrCodeOrBitCoinAddressFormControl,
      "cryptoSGPrice": this.cryptoSGPriceFormControl,
      "gender": this.genderFormControl,
    });
  }

  // async ngOnInit(): Promise<void> {
  // }

  // async getBitcoinRate() {
  //   this.bitcoinResult = await (this.bitcoinSvc.getBitcoinRate());
  //   console.info(typeof(this.bitcoinResult));
  //   console.info(this.bitcoinResult);
  // }

  buyBitcoinForm() {
    // console.log('form submitted');
    // console.log('this.form ---> ', this.form);
    console.log('this.form.value ---> ', this.form.value);
    // console.log('this.form.value.orderType ---> ', this.form.value.orderType);
    // console.log('this.form.value.contactNumber ---> ', this.form.value.contactNumber);

    // resets after clicking on submit
    this.form.reset()
  }

  // Browser console: cannot read property 'resetForm' of undefined at AppComponent.resetForm (app.component.ts:68)
  resetForm(form: FormGroupDirective) {
    this.form.reset();
    form.resetForm(); // gives error in console
    console.log("reset form")
  }
}

// Validate the user's age from form control
// Return null if validation passed and return object if validation failed
function above21Validator(control: AbstractControl): {[key: string]: boolean} | null {
  const dob = new Date(control.value);
  // console.log('dob ---> ', dob)
  const ageDifference = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifference); // miliseconds from epoch 
  const userAge = Math.abs(ageDate.getUTCFullYear() - 1970)
  // console.log('userAge ---> ', userAge)
  if (userAge < 21 )
  {
    return {above21Validator: true };
  }  
  return null;
}