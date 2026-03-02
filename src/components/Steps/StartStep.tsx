interface StartStepProps {
    flightNumbers: readonly string[];
    onComplete: (flightNumber: string) => void;
}

function StartStep({ flightNumbers, onComplete }: StartStepProps) {
    
    return (
        <div>
          <h2>Find a Seat</h2>
          <p>Available Flight Numbers: </p>
          <div className="button-flex-row">
            { flightNumbers.map(flight => (
                <button key={flight} onClick={() => onComplete(flight)}>{flight}</button>
            ))}
           </div>
        </div>
    );
}

export default StartStep;