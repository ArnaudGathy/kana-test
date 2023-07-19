export const getIsEverythingChecked = (formState) =>
  Object.values(formState).every((isEnabled) => isEnabled);

export const getAreSomethingsChecked = (formState) =>
  Object.values(formState).some((isEnabled) => isEnabled);
