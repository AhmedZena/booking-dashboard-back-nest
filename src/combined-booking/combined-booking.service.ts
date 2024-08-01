import { Injectable } from '@nestjs/common';
import { BusBookingService } from '../bus-booking/bus-booking.service';
import { FlightBookingService } from '../flight-booking/flight-booking.service';
import { HotelBookingService } from '../hotel-booking/hotel-booking.service';
import { TransferBookingService } from '../transfer-booking/transfer-booking.service';

@Injectable()
export class CombinedBookingService {
  constructor(
    private readonly busBookingService: BusBookingService,
    private readonly flightBookingService: FlightBookingService,
    private readonly hotelBookingService: HotelBookingService,
    private readonly transferBookingService: TransferBookingService,
  ) { }

  async getAllBookingsByDay(day: string): Promise<any> {
    try {
      // Fetch bookings concurrently from all services
      const [busBookings, flightBookings, hotelBookings, transferBookings] = await Promise.all([
        this.busBookingService.getBookingsByDay(day),
        this.flightBookingService.getBookingsByDay(day),
        this.hotelBookingService.getBookingsByDay(day),
        this.transferBookingService.getBookingsByDay(day),
      ]);

      // Add the service key to each booking entry
      const busResults = busBookings.results.map((result) => ({
        ...result,
        service: 'Bus',
      }));

      const flightResults = flightBookings.results.map((result) => ({
        ...result,
        service: 'Flight',
      }));

      const hotelResults = hotelBookings.results.map((result) => ({
        ...result,
        service: 'Hotel',
      }));

      const transferResults = transferBookings.results.map((result) => ({
        ...result,
        service: 'Cab',
      }));

      // Combine all results into a single array
      const allResults = [...busResults, ...flightResults, ...hotelResults, ...transferResults];

      return {
        date: day,
        totalBookings:
          busBookings.totalBookings +
          flightBookings.totalBookings +
          hotelBookings.totalBookings +
          transferBookings.totalBookings,
        totalSales:
          busBookings.totalSales +
          flightBookings.totalSales +
          hotelBookings.totalSales +
          transferBookings.totalSales,

        busBookingsTotalSales:  busBookings.totalSales,
        busBookingsTotalBookings: busBookings.totalBookings,
        flightBookingsTotalSales: flightBookings.totalSales,
        flightBookingsTotalBookings: flightBookings.totalBookings,
        hotelBookingsTotalSales: hotelBookings.totalSales,
        hotelBookingsTotalBookings: hotelBookings.totalBookings,
        transferBookingsTotalSales: transferBookings.totalSales,
        transferBookingsTotalBookings: transferBookings.totalBookings,

        results: allResults, // Return the merged results array
   
      };
    } catch (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
  }


  async getBookingsInRange(from: string, to: string): Promise<any> {
    try {
      // Fetch bookings concurrently from all services within the date range
      const [busBookings, flightBookings, hotelBookings, transferBookings] = await Promise.all([
        this.busBookingService.getBookingsInRange(from, to),
        this.flightBookingService.getBookingsInRange(from, to),
        this.hotelBookingService.getBookingsInRange(from, to),
        this.transferBookingService.getBookingsInRange(from, to),
      ]);

      // Calculate the total bookings and the number of each booking type
      const totalBookings =
        busBookings.totalBookings +
        flightBookings.totalBookings +
        hotelBookings.totalBookings +
        transferBookings.totalBookings;

      const busPercentage = totalBookings ? (busBookings.totalBookings / totalBookings) * 100 : 0;
      const flightPercentage = totalBookings ? (flightBookings.totalBookings / totalBookings) * 100 : 0;
      const hotelPercentage = totalBookings ? (hotelBookings.totalBookings / totalBookings) * 100 : 0;
      const transferPercentage = totalBookings ? (transferBookings.totalBookings / totalBookings) * 100 : 0;

      return {
        from,
        to,
        totalBookings,
        types: {
          bus: {
            count: busBookings.totalBookings,
            percentage: busPercentage.toFixed(2),
          },
          flight: {
            count: flightBookings.totalBookings,
            percentage: flightPercentage.toFixed(2),
          },
          hotel: {
            count: hotelBookings.totalBookings,
            percentage: hotelPercentage.toFixed(2),
          },
          transfer: {
            count: transferBookings.totalBookings,
            percentage: transferPercentage.toFixed(2),
          },
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch bookings in range: ${error.message}`);
    }
  }
}

