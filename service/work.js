import { axiosInstance } from ".";
const config = { headers: { "Content-Type": "multipart/form-data" } };

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

export const getListProject = async () => {
  const { data, status } = await axiosInstance.get(
    `/project/get-project?isTable=false`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get List project In Table
export const getListTableProject = async ({ page, limit }) => {
  const { data, status } = await axiosInstance.get(
    `/project/get-project?isTable=true&page=${page}&limit=${limit}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get By Id
export const getProjectById = async (payload) => {
  const { data, status } = await axiosInstance.get(
    `/project/get-project/${payload.id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Post project
export const postProject = async (payload) => {
  const { data, status } = await axiosInstance.post(
    "/project/add-project",
    payload,
    config
  );

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};

export const putProject = async ({ id, body }) => {
  const { data, status } = await axiosInstance.put(
    `/project/edit-project/${id}`,
    body
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const deleteProject = async ({ id }) => {
  const { data, status } = await axiosInstance.delete(
    `/project/delete-project/${id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
