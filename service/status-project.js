import { axiosInstance } from ".";

export const getListStatusProject = async () => {
  const { data, status } = await axiosInstance.get(
    `/status-project/get-status-project?isTable=false`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const getListSkilsInputWork = async () => {
  const { data, status } = await axiosInstance.get(
    `/status-project/get-status-project?isTable=false`
  );

  console.log("DATA getListSkilsInputWork =>", data);
  if (status !== 200) throw Error(`${data.message}`);

  const newFormatData = data.data.map((items) => {
    return {
      name: items.name,
      value: items.name,
    };
  });

  return newFormatData;
};

// Get List Status Project In Table
export const getListTableStatusProject = async ({ page, limit }) => {
  const { data, status } = await axiosInstance.get(
    `/status-project/get-status-project?isTable=true&page=${page}&limit=${limit}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get By Id
export const getStatusProjectById = async (payload) => {
  const { data, status } = await axiosInstance.get(
    `/status-project/get-status-project/${payload.id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Post Status Project
export const postStatusProject = async (payload) => {
  const { data, status } = await axiosInstance.post(
    "/status-project/add-status-project",
    payload
  );

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};

export const putStatusProject = async ({ id, body }) => {
  const { data, status } = await axiosInstance.put(
    `/status-project/edit-status-project/${id}`,
    body
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const deleteStatusProject = async ({ id }) => {
  const { data, status } = await axiosInstance.delete(
    `/status-project/delete-status-project/${id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
