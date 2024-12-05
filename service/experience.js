import { axiosInstance } from ".";

// Get List Experience In Table
export const getListExperienceTable = async ({ page, limit }) => {
  const { data, status } = await axiosInstance.get(
    `/experience/get-experience?isTable=true&page=${page}&limit=${limit}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get List Page Experience
export const getListExperience = async () => {
  const { data, status } = await axiosInstance.get(
    "/experience/get-experience?isTable=false"
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;

  // const data = [
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     company: "A",
  //     position: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  // ];

  // return data;
};

// Get By Id
export const getExperienceById = async (payload) => {
  const { data, status } = await axiosInstance.get(
    `/experience/get-experience/${payload.id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Post Experience
export const postExperience = async (payload) => {
  const { data, status } = await axiosInstance.post(
    "/experience/add-experience",
    payload
  );

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};

export const putExperience = async ({ id, body }) => {
  const { data, status } = await axiosInstance.put(
    `/experience/edit-experience/${id}`,
    body
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const deleteExperience = async ({ id }) => {
  const { data, status } = await axiosInstance.delete(
    `/experience/delete-experience/${id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
