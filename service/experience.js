import { axiosInstance } from ".";

export const getListExperience = async () => {
  const { data, status } = await axiosInstance.get(
    "/experience/get-experience"
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;

  // const data = [
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  // ];

  // return data;
};
