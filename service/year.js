export const yearList = async () => {
  const currentYear = new Date().getFullYear();
  const yearRange = 70;

  const yearArray = Array.from({ length: yearRange + 1 }, (_, index) => {
    const year = currentYear - index;
    return { value: year.toString(), label: year.toString() };
  });

  return yearArray;
};

export const endDateExperience = async () => {
  const currentYear = new Date().getFullYear();
  const yearRange = 70;

  const yearArray = Array.from({ length: yearRange + 1 }, (_, index) => {
    const year = currentYear - index;
    return { value: year.toString(), label: year.toString() };
  });

  console.log("yearArray =>", yearArray);

  const endDate = [{ value: "Present", label: "Present" }, ...yearArray];

  return endDate;
};
