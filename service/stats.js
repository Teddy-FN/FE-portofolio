import { axiosInstance } from ".";

export const stats = async (payload) => {
  //   const { data, status } = await axiosInstance.post("/auth/login", payload);

  //   if (status !== 200) throw Error(`${data.message}`);
  //   return data;

  const data = [
    {
      numb: 3,
      text: "Years Experience",
    },
    {
      numb: 4,
      text: "Project Completed",
    },
    {
      numb: 5,
      text: "Technologies Mastered",
    },
  ];

  return data;
};
