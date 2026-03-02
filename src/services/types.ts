import type { FLIGHT_CLASSES } from "../../constants/flight";

export interface TicketWaitResponse {
  id: string;      // Matches your C# property
  position: number; // Matches your C# property
}

export interface TicketSessionResponse {
  id: string;      // Matches your C# property
  timeExpiry: number; // Matches your C# property
}

export interface SeatInfo {
  seatClass: typeof FLIGHT_CLASSES[keyof typeof FLIGHT_CLASSES]; // Matches your C# property
  seatNumber: string; // Matches your C# property
}