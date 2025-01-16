import { axiosInstance } from ".";
const config = { headers: { "Content-Type": "multipart/form-data" } };

export const getListCertificate = async () => {
  const { data, status } = await axiosInstance.get(
    `/certificate/get-certificate?isTable=false`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get List Certificate In Table
export const getListTableCertificate = async ({ page, limit }) => {
  const { data, status } = await axiosInstance.get(
    `/certificate/get-certificate?isTable=true&page=${page}&limit=${limit}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get By Id
export const getCertificateById = async (payload) => {
  const { data, status } = await axiosInstance.get(
    `/certificate/get-certificate/${payload.id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Post Certificate
export const postCertificate = async (payload) => {
  const { data, status } = await axiosInstance.post(
    "/certificate/add-certificate",
    payload,
    config
  );

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};

export const putCertificate = async ({ id, body }) => {
  const { data, status } = await axiosInstance.put(
    `/certificate/edit-certificate/${id}`,
    body,
    config
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const deleteCertificate = async ({ id }) => {
  const { data, status } = await axiosInstance.delete(
    `/certificate/delete-certificate/${id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const typeCertificate = async () => {
  const data = [
    {
      value: "Formal Certificate",
      label: "Formal Certificate",
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
