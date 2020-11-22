import { Component } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators, AbstractControl, FormGroupDirective } from '@angular/forms';
import { BitcoinService } from './bitcoinservice.service'

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
  today = new Date()
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

  // html's buyBitcoin has 2 parameters "buyBitcoinForm(form, formDirective)"
  buyBitcoinForm(form: any, formGroupDirective: FormGroupDirective): void {
    // resets after clicking on submit
    console.log('buyBitcoinForm activated ---> ', this.form.value);
    // formGroupDirective.resetForm(form)
    // this.form.reset()
    this.resetAll(form, formGroupDirective); 
  }

  // formDirective is passed from #formDirective from html
  restartForm(form: any, formDirective: FormGroupDirective): void {
    // console.log("resetForm ---> ", form)
    // this.form.reset();
    this.resetAll(form, formDirective);
    console.log("resetForm activated")
  }

  resetAll(form: any, formDirective : FormGroupDirective){
    // this.form.reset();
    form.reset();
    formDirective.resetForm();
    // Object.keys(this.form.controls).forEach(key => {
    //   form.get(key).setErrors(null) ;
    // });
    this.nameFormControl.setValidators([Validators.required]);
    this.nameFormControl.updateValueAndValidity();
    this.contactNumberFormControl.setValidators([Validators.required]);
    this.contactNumberFormControl.updateValueAndValidity();
    this.dobFormControl.setValidators([Validators.required]);
    this.dobFormControl.updateValueAndValidity();  
    this.orderDateFormControl.setValidators([Validators.required]);
    this.orderDateFormControl.updateValueAndValidity();  
    this.orderUnitFormControl.setValidators([Validators.required]);
    this.orderUnitFormControl.updateValueAndValidity();  
    // this.cryptoBitcoinSGPriceFormControl.setValidators([Validators.required]);
    // this.cryptoBitcoinSGPriceFormControl.updateValueAndValidity();  
    this.qrCodeOrBitCoinAddressFormControl.setValidators([Validators.required]);
    this.qrCodeOrBitCoinAddressFormControl.updateValueAndValidity();  
    this.cryptoSGPriceFormControl.setValidators([Validators.required]);
    this.cryptoSGPriceFormControl.updateValueAndValidity();  
    // this.genderFormControl.setValidators([Validators.required]);
    // this.genderFormControl.updateValueAndValidity();  
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