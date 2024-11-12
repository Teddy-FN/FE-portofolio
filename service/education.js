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
