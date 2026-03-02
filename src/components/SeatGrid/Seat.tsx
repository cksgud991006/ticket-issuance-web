
import { FLIGHT_CLASSES, FLIGHT_STATUS  } from "../../../constants/flight";
import type { SeatInfo } from "../../services/types";

interface SeatProps {
    seat: SeatInfo;
    status: typeof FLIGHT_STATUS[keyof typeof FLIGHT_STATUS];
    isSelected: boolean;
    onSelect: (seat: SeatInfo) => void;
}

export default function Seat({ seat, status, isSelected, onSelect }: SeatProps) {
    const { seatClass, seatNumber } = seat;
    
    const getBackgroundColor = () => {
        if (status === FLIGHT_STATUS.RESERVED) return 'lightgrey';
        if (isSelected) return '#4caf50';

        switch (seatClass) {
            case FLIGHT_CLASSES.ECONOMY: return '#1a73e8';
            case FLIGHT_CLASSES.BUSINESS: return '#ffeb3b';
            default: return '#e0e0e0';
        }
    };

    const seatStyle = {
        width: '45px',
        height: '45px',
        margin: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        fontSize: '15px',
        fontWeight: 'bold',
        backgroundColor: getBackgroundColor(),
        cursor: status === FLIGHT_STATUS.RESERVED ? 'not-allowed' : 'pointer',
        color: isSelected ? 'white' : 'black',
        disabled: status === FLIGHT_STATUS.RESERVED
    };
    
    return (
        <button 
            key={seatNumber}
            style={seatStyle}
            onClick={() => status === FLIGHT_STATUS.AVAILABLE && onSelect(seat)}>
            {seatNumber}
        </button>
    );
};