import { axiosInstance } from ".";

export const service = async (payload) => {
  //   const { data, status } = await axiosInstance.post("/auth/login", payload);

  //   if (status !== 200) throw Error(`${data.message}`);
  //   return data;

  const data = [
    {
      numb: 1,
      title: "FE Development",
      description: "lorem ipsum",
      href: "",
    },
    {
      numb: 2,
      title: "BE Development",
      description: "lorem ipsum",
      href: "",
    },
    {
      numb: 3,
      title: "Fullstack Development",
      description: "lorem ipsum",
      href: "",
    },
  ];

  return data;
};
