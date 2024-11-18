import { axiosInstance } from ".";

export const title = async () => {
  const { data, status } = await axiosInstance.get("/about-me/get-about-me");

  if (status !== 200) throw Error(`${data.message}`);
  return data;

  // const data = {
  //   name: "Teddy Ferdian Abrar Amrullah",
  //   position: "Full Stack Developer",
  //   photo: "/photo.jpg",
  // };

  // return data;
};
