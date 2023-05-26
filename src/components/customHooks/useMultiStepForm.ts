import React, { useState, ReactElement } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
    function next() {
      setCurrentStepIndex((step) => {
        if (step >= steps.length - 1) return step;
        return step + 1;
      });
    }
    function back() {
      setCurrentStepIndex((step) => {
        if (step < 0) return step;
        return step - 1;
      });
    }
  
    function goTo(index: number) {
      setCurrentStepIndex(index);
    }
    return {
      currentStepIndex,
      step: steps[currentStepIndex],
      goTo, next, back, steps, isFirstStep: currentStepIndex === 0,isLastStep: currentStepIndex === steps.length - 1,
    };
  }