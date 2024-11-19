import axios from "axios";

export const nationality = async () => {
  const { data, status } = await axios.get(
    "https://restcountries.com/v3.1/all"
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;

  // const data = {
  //   name: "Teddy Ferdian Abrar Amrullah",
  //   position: "Full Stack Developer",
  //   photo: "/photo.jpg",
  // };

  // return data;
};
