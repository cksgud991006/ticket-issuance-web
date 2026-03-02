export const STEPS = [
    "START",
    "LOADING",
    "SELECTION",
    "COMPLETE",
    "FAILURE",
    "CONFIRMATION"
] as const;

export type StepType = typeof STEPS[number];

export const START_STEP = STEPS[0];