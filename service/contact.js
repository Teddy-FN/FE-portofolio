import { axiosInstance } from ".";

export const getContact = async () => {
  const { data, status } = await axiosInstance.get("/about-me/get-about-me");

  if (status !== 200) throw Error(`${data.message}`);

  const formatDatas = [
    {
      title: "Phone",
      description: data?.data?.phoneNumber || "-",
    },
    {
      title: "Email",
      description: data?.data?.email || "-",
    },
    {
      title: "Address",
      description: data?.data?.address || "-",
    },
  ];
  return formatDatas;
};
