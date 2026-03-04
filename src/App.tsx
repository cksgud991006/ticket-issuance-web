import './App.css'
import { useEffect, useState } from 'react';
import SelectionStep from './components/Steps/SelectionStep';
import CompleteStep from './components/Steps/CompleteStep';
import LoadingStep from './components/Steps/LoadingStep';
import StartStep from './components/Steps/StartStep';
import FailureStep from './components/Steps/FailureStep';
import { postData, getData } from './services/api';
import { type StepType, START_STEP } from '../constants/page';
import { FLIGHT_NUMBERS } from '../constants/flight';
import { type SeatInfo } from './services/types';

// App.tsx
function App() {
  // Logic State
  const [flightNumber, setFlightNumber] = useState('');
  const [guid, setGuid] = useState('');
  const [step, setStep] = useState<StepType>(START_STEP);
  const [seats, setSeats] = useState<SeatInfo[]>([]);
  const [reservedSeats, setReservedSeats] = useState<SeatInfo[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<SeatInfo[]>([]);

  const MAX_SELECTIONS = 5;

  useEffect(() => {
    // Generate a new GUID for each session
    const newGuid = crypto.randomUUID();
    setGuid(newGuid);
  }, []);

  useEffect(() => {
    if (step === 'START') {
      setSelectedSeats([]);
    }
  }, [step]);


  const handleStartComplete = (flightNumber: string) => {
      setFlightNumber(flightNumber);

      try {
        postData("queue", {
          Id: guid,
          RequestTime: new Date().toISOString(),
          IdempotencyKey: guid
        });

        setStep('LOADING');
      } catch (error) {
        setStep('FAILURE');
      }
      
    };

  const handleLoadingComplete = async () => {

    try {
      
      // Fetch all seats on initial load
      getData<SeatInfo[]>("seats/total/{flightNumber}", { flightNumber: flightNumber }).then((response) => {
        const sortedSeats = response.sort((a, b) => {
          return a.seatNumber.localeCompare(b.seatNumber, undefined, { 
            numeric: true,
            sensitivity: 'base'
          });
        });
        setSeats(sortedSeats);
      });

      // Fetch reserved seats on initial load
      getData<SeatInfo[]>("seats/reserved/{flightNumber}", { flightNumber: flightNumber }).then((response) => {
        setReservedSeats(response);
      });
  
      setStep('SELECTION');
    } catch (error) {
      setStep('FAILURE');
    }

  };

  const handleLoadingFailure = async () => {

    setStep('FAILURE');

  };

  const handleSelectionComplete = async () => {
    
      const seatRequests = selectedSeats.map((seat) => {
        return postData("seat", {
          FlightNumber: flightNumber,
          Date: new Date().toISOString(),
          SeatClass: seat.seatClass,
          SeatNumber: seat.seatNumber,
          Id: guid
        });
      });

      await Promise.all(seatRequests).then(() => {
        setStep('COMPLETE');
      }).catch(() => {
        setStep('FAILURE');
      });
    };
  // --- RENDERING LOGIC ---

  return (
    <div style={{ padding: '20px' }}>
      {step === 'START' && <StartStep flightNumbers={FLIGHT_NUMBERS} onComplete={handleStartComplete}/>}
    
      {step === 'LOADING' && <LoadingStep guid={guid} onComplete={handleLoadingComplete} onFailure={handleLoadingFailure} />}

      {step === 'SELECTION' && <SelectionStep seats={seats} reservedSeats={reservedSeats} selectedSeats={selectedSeats} 
      maxSelections={MAX_SELECTIONS}
      onSeatToggle={(seat: SeatInfo) => setSelectedSeats(prev => prev.includes(seat) ? prev.filter(s => s !== seat) : prev.length < MAX_SELECTIONS ? [...prev, seat] : prev)}  
      onComplete={handleSelectionComplete} onCancel={() => setStep('START')} />}

      {step === 'COMPLETE' && <CompleteStep onReload={() => setStep('START')} />}

      {step === 'FAILURE' && <FailureStep onRetry={() => setStep('START')} />}
    </div>
  );
}

export default App;