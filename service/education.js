import { axiosInstance } from ".";

export const getListEducation = async () => {
  const { data, status } = await axiosInstance.get("/education/get-education");

  if (status !== 200) throw Error(`${data.message}`);
  return data;

  // const data = [
  //   {
  //     institution: "A",
  //     degree: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     institution: "B",
  //     degree: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  // ];

  return data;
};

export const educationDegree = async () => {
  const list = [
    {
      label: "No formal education",
      value: "No formal education",
    },
    {
      label: "Primary education",
      value: "Primary education",
    },
    {
      label: "Secondary education or high school",
      value: "Secondary education or high school",
    },
    {
      label: "GED",
      value: "GED",
    },
    {
      label: "Vocational qualification",
      value: "Vocational qualification",
    },
    {
      label: "Bachelor's degree",
      value: "Bachelor's degree",
    },
    {
      label: "Master's degree",
      value: "Master's degree",
    },
    {
      label: "Doctorate or higher",
      value: "Doctorate or higher",
    },
  ];
  return list;
};
