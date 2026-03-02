import Seat from './Seat';
import { type SeatInfo } from '../../services/types';
import { FLIGHT_STATUS } from '../../../constants/flight';

interface SeatGridProps {
    seats: SeatInfo[];
    reservedSeats: SeatInfo[];
    selectedSeats: SeatInfo[];
    onSeatToggle: (seatInfo: SeatInfo) => void;
}

export default function SeatGrid({ seats, reservedSeats, selectedSeats, onSeatToggle }: SeatGridProps) {

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif'}}>
            <h2>Select Your Seat</h2>

            {/* The Grid Container */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(8, 40px)`,
                gap: '10px',
                marginBottom: '20px'
            }}>
                { seats.map((seat) => {
                        const isReserved = reservedSeats.some(reservedSeat => seat.seatNumber === reservedSeat.seatNumber && seat.seatClass === reservedSeat.seatClass);
                        const isSelected = selectedSeats.some(selectedSeat => seat.seatNumber === selectedSeat.seatNumber && seat.seatClass === selectedSeat.seatClass);

                        return (
                            <Seat
                                seat={seat}
                                status={isReserved? FLIGHT_STATUS.RESERVED:FLIGHT_STATUS.AVAILABLE}
                                isSelected={isSelected}
                                onSelect={() => onSeatToggle(seat)}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};