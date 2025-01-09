import { axiosInstance } from ".";

export const getDashboard = async () => {
  const { data, status } = await axiosInstance.get("/dashboard/get-dashboard");

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
