export const yearList = async () => {
  const currentYear = new Date().getFullYear();
  const yearRange = 70;

  const yearArray = Array.from({ length: yearRange + 1 }, (_, index) => {
    const year = currentYear - index;
    return { value: year, label: year.toString() };
  });

  return yearArray;
};
