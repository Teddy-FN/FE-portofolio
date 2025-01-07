import { axiosInstance } from ".";

export const getListEducation = async () => {
  const { data, status } = await axiosInstance.get(
    `/education/get-education?isTable=false`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get List Education In Table
export const getListTableEducation = async ({ page, limit }) => {
  const { data, status } = await axiosInstance.get(
    `/education/get-education?isTable=true&page=${page}&limit=${limit}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get By Id
export const getEducationById = async (payload) => {
  const { data, status } = await axiosInstance.get(
    `/education/get-education/${payload.id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Post education
export const postEducation = async (payload) => {
  const { data, status } = await axiosInstance.post(
    "/education/add-education",
    payload
  );

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};

export const putEducation = async ({ id, body }) => {
  const { data, status } = await axiosInstance.put(
    `/education/edit-education/${id}`,
    body
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const deleteEducation = async ({ id }) => {
  const { data, status } = await axiosInstance.delete(
    `/education/delete-education/${id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const typeCertificate = async () => {
  const data = [
    {
      value: "Formal Education",
      label: "Formal Education",
    },
    {
      value: "Online Courses",
      label: "Online Courses",
    },
    {
      value: "Volunteering",
      label: "Volunteering",
    },
    {
      value: "Community Workshops",
      label: "Community Workshops",
    },
    {
      value: "Mentorship Programs",
      label: "Mentorship Programs",
    },
    {
      value: "Bootcamp",
      label: "Bootcamp",
    },
  ];

  return data;
};
