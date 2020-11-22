export class BuyBitcoin {
  constructor(
    public contactNumber: string, 
    public name: string, 
    public dob: Date,
    public orderDate: Date,
    public orderType: string,
    public orderUnit: string,
    public cryptoBitcoinSGPrice: string, // get api ask + bid price
    public qrCodeOrBitCoinAddress: string, // enabled if 'Sell' or 'Buy'
    public cryptoSGPrice: string, // orderUnit x cryptoBitcoinSGPrice
    public gender?: string // ? means this is optional
  ){

  }
}