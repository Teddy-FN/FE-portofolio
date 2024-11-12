import { axiosInstance } from ".";

export const getListAboutMe = async () => {
  const { data, status } = await axiosInstance.get("/about-me/get-about-me");

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
