import { axiosInstance } from ".";

export const getListAboutMe = async (payload) => {
  //   const { data, status } = await axiosInstance.post("/auth/login", payload);

  //   if (status !== 200) throw Error(`${data.message}`);
  //   return data;

  const data = [
    {
      fieldName: "Name",
      value: "Teddy Ferdian",
    },
    {
      fieldName: "Phone",
      value: "0821321",
    },
    {
      fieldName: "Experience",
      value: "3 Years",
    },
    {
      fieldName: "Nationality",
      value: "Indonesia",
    },
    {
      fieldName: "Email",
      value: "tedd.ferdy@gmail.com",
    },
    {
      fieldName: "Freelance",
      value: "Available",
    },
    {
      fieldName: "Languages",
      value: "Bahasa, English",
    },
  ];

  return data;
};
