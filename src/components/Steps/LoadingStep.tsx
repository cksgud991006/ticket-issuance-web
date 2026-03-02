import { useEffect } from "react";
import { getData } from "../../services/api";
import type { TicketSessionResponse } from "../../services/types";

interface LoadingStepProps {
    guid: string;
    onComplete: () => void;
    onFailure: () => void;
}

function LoadingStep({ guid, onComplete, onFailure }: LoadingStepProps) {

    useEffect(() => {
        const intervalId = setInterval(() => {
            getData<TicketSessionResponse>("queue/status/{id}", { id: guid }).then((response) => {
                if (response.timeExpiry <= 0) {
                    onFailure();
                    clearInterval(intervalId);
                }

                else {
                    onComplete();
                    clearInterval(intervalId);
                }
            })
        }, 500); // Poll every 500 ms
    }, [guid]);

    return (
        <div>
          <h2>Processing...</h2>
          <p>Please wait while we verify your request.</p>
        </div>
    );
}

export default LoadingStep;