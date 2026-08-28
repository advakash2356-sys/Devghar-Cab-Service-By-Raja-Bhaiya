export type TripStatus = 'Assigned' | 'On Ride' | 'Completed' | 'Cancelled';

export interface TripRecord {
  id: string;
  date: string;
  time?: string;
  passengerName: string;
  phone: string;
  pickup: string;
  destination: string;
  fare: number;
  driverId: string;
  driverName: string;
  driverCommission: number; // e.g. 50 or 100 Rs
  status: TripStatus;
  commissionCollected: boolean;
  notes?: string;
  createdAt: string;
}

export interface DriverRecord {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  vehicleNumber: string;
  status: 'Available' | 'On Ride' | 'Off Duty';
  location: string;
}
