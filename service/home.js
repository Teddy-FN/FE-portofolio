import { axiosInstance } from ".";

export const title = async (payload) => {
  //   const { data, status } = await axiosInstance.post("/auth/login", payload);

  //   if (status !== 200) throw Error(`${data.message}`);
  //   return data;

  const data = {
    name: "Teddy Ferdian Abrar Amrullah",
    position: "Full Stack Developer",
    photo: "/photo.jpg",
  };

  return data;
};
