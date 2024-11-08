import { axiosInstance } from ".";

export const getListExperience = async (payload) => {
  //   const { data, status } = await axiosInstance.post("/auth/login", payload);

  //   if (status !== 200) throw Error(`${data.message}`);
  //   return data;

  const data = [
    {
      company: "A",
      position: "Frontend Developer",
      duration: "2021 - Present",
    },
    {
      company: "A",
      position: "Frontend Developer",
      duration: "2021 - Present",
    },
    {
      company: "A",
      position: "Frontend Developer",
      duration: "2021 - Present",
    },
    {
      company: "A",
      position: "Frontend Developer",
      duration: "2021 - Present",
    },
    {
      company: "A",
      position: "Frontend Developer",
      duration: "2021 - Present",
    },
    {
      company: "A",
      position: "Frontend Developer",
      duration: "2021 - Present",
    },
    {
      company: "A",
      position: "Frontend Developer",
      duration: "2021 - Present",
    },
    {
      company: "A",
      position: "Frontend Developer",
      duration: "2021 - Present",
    },
  ];

  return data;
};
