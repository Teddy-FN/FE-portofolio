import { axiosInstance } from ".";

export const getListSkills = async () => {
  const { data, status } = await axiosInstance.get(
    `/skills/get-skills?isTable=false`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get List skills In Table
export const getListTableSkills = async ({ page, limit }) => {
  const { data, status } = await axiosInstance.get(
    `/skills/get-skills?isTable=true&page=${page}&limit=${limit}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get By Id
export const getSkillsById = async (payload) => {
  const { data, status } = await axiosInstance.get(
    `/skills/get-skills/${payload.id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Post skills
export const postSkills = async (payload) => {
  const { data, status } = await axiosInstance.post(
    "/skills/add-skills",
    payload
  );

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};

export const putSkills = async ({ id, body }) => {
  const { data, status } = await axiosInstance.put(
    `/skills/edit-skills/${id}`,
    body
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const deleteSkills = async ({ id }) => {
  const { data, status } = await axiosInstance.delete(
    `/skills/delete-skills/${id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
