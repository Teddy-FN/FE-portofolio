import { axiosInstance } from ".";

export const workList = async () => {
  const { data, status } = await axiosInstance.get("/project/get-project");

  if (status !== 200) throw Error(`${data.message}`);
  return data;

  // const data = [
  //   {
  //     num: "01",
  //     category: "Frontend",
  //     img: "",
  //     title: "Project 1",
  //     description: "lorem ipsum",
  //     stack: [
  //       {
  //         name: "HTML5",
  //       },
  //       {
  //         name: "CSS3",
  //       },
  //       {
  //         name: "JAVASCRIPT",
  //       },
  //     ],
  //     live: "",
  //     github: "",
  //   },
  //   {
  //     num: "02",
  //     category: "Frontend",
  //     img: "",
  //     title: "Project 1",
  //     description: "lorem ipsum",
  //     stack: [
  //       {
  //         name: "HTML5",
  //       },
  //       {
  //         name: "CSS3",
  //       },
  //       {
  //         name: "JAVASCRIPT",
  //       },
  //     ],
  //     live: "",
  //     github: "",
  //   },
  //   {
  //     num: "03",
  //     category: "Frontend",
  //     img: "",
  //     title: "Project 1",
  //     description: "lorem ipsum",
  //     stack: [
  //       {
  //         name: "HTML5",
  //       },
  //       {
  //         name: "CSS3",
  //       },
  //       {
  //         name: "JAVASCRIPT",
  //       },
  //     ],
  //     live: "",
  //     github: "",
  //   },
  // ];

  // return data;
};
