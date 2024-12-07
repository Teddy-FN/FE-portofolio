import { axiosInstance } from ".";

export const stats = async () => {
  const { data, status } = await axiosInstance.get("/stats/get-stats");

  if (status !== 200) throw Error(`${data.message}`);
  return data;

  // const data = [
  //   {
  //     numb: 3,
  //     text: "Years Experience",
  //   },
  //   {
  //     numb: 4,
  //     text: "Project Completed",
  //   },
  //   {
  //     numb: 5,
  //     text: "Technologies Mastered",
  //   },
  // ];

  // return data;
};
