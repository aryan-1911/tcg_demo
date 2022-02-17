import { useState, useEffect, useCallback } from 'react';
import { CREDIT_CARD } from 'const';

enum StepType {
  first,
  second,
  third,
}

export const useFillIndicator = (
  getValues: (name: string) => void,
  getPhoneValue: () => void,
) => {
  const [step1, setStep1] = useState({
    avatar: false,
    phone: false,
  });

  const [isStep1Completed, setCompleteStep1] = useState(false);

  const [step2, setStep2] = useState({
    gamePokemon: false,
    gameMtg: false,
    gameYugioh: false,
  });

  const [isStep2Completed, setCompleteStep2] = useState(false);

  const [step3, setStep3] = useState({
    number: false,
    expDate: false,
    cvc: false,
    name: false,
  });

  const [isStep3Completed, setCompleteStep3] = useState(false);

  const setValuesToStep = (setStep, step, value, name) => {
    if (name.includes(CREDIT_CARD)) {
      name = name.slice(11);
    }

    setStep((step) => {
      return {
        ...step,
        [name]: value && value !== '',
      };
    });
  };

  const stepKeys = {
    [StepType.first]: [setStep1, step1],
    [StepType.second]: [setStep2, step2],
    [StepType.third]: [setStep3, step3],
  };

  const handlerBlurStep = (type: StepType) => (name: string) => {
    let value = getValues(name);

    if (name === 'phone-num') {
      name = 'phone';
      value = getPhoneValue();
    }

    const [setStep, step] = stepKeys[type];

    setValuesToStep(setStep, step, value, name);
  };

  const completeStep = useCallback((setCompleteStep) => {
    setCompleteStep(true);
  }, []);

  const unCompleteStep = useCallback((setCompleteStep) => {
    setCompleteStep(false);
  }, []);

  useEffect(() => {
    const controlStep = (step, setCompleteStep, isEvery = true) => {
      const values = Object.values(step);

      if (isEvery ? values.every((i) => i) : values.some((i) => i)) {
        completeStep(setCompleteStep);
      } else {
        unCompleteStep(setCompleteStep);
      }
    };

    controlStep(step1, setCompleteStep1);
    controlStep(step2, setCompleteStep2, false);
    controlStep(step3, setCompleteStep3);
  }, [step1, step2, step3, completeStep, unCompleteStep]);

  return {
    isStep1Completed,
    isStep2Completed,
    isStep3Completed,
    handlerBlurStep,
    // handlerBlurStep2,
    // handlerBlurStep3,
  };
};
