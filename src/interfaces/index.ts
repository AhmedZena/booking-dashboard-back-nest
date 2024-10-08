export interface IFlightBooking {
  id: number;
  userId: number;
  fromCity: string;
  cityCode: string;
  cityCountry: string;
  airportName: string;
  countryCode: string;
  countryName: string;
  toCity: string;
  toCityCode: string;
  airlineCode: string;
  duration: string;
  airlineName: string;
  price: number;
  insurancePrice: number;
  planName: string;
  planDescription: string;
  planCode: string;
  category: string;
  orderId: string;
  depTime: string;
  pnr: string;
  bookingId: string;
  phone: string;
  traceId: string;
  arrTime: string;
  isReturn: boolean;
  returnFlightId: number;
  dealeventName: string;
  dealpromoCode: string;
  dealOffer: string;
  dealPrice: number;
  paymentId: string;
  paymentlinkId: string;
  paymentStatus: string;
  isCanceled: boolean;
  refundId: number;
  firstCreated: Date;
  lastModified: Date;
  user: {
    name: string;
    phone: string;
    email: string;
  };
}