// import { axiosInstance } from ".";

// export const service = async (payload) => {
//   //   const { data, status } = await axiosInstance.post("/auth/login", payload);

//   //   if (status !== 200) throw Error(`${data.message}`);
//   //   return data;

//   const data = [
//     {
//       numb: 1,
//       title: "FE Development",
//       description: "lorem ipsum",
//       href: "",
//     },
//     {
//       numb: 2,
//       title: "BE Development",
//       description: "lorem ipsum",
//       href: "",
//     },
//     {
//       numb: 3,
//       title: "Fullstack Development",
//       description: "lorem ipsum",
//       href: "",
//     },
//   ];

//   return data;
// };

import { axiosInstance } from ".";

export const getListService = async () => {
  const { data, status } = await axiosInstance.get(
    `/service/get-service?isTable=false`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const getListServiceInputWork = async () => {
  const { data, status } = await axiosInstance.get(
    `/service/get-service?isTable=false`
  );

  if (status !== 200) throw Error(`${data.message}`);

  const newFormatData = data.data.map((items) => {
    return {
      name: items.name,
      value: items.name,
    };
  });

  return newFormatData;
};

// Get List service In Table
export const getListTableService = async ({ page, limit }) => {
  const { data, status } = await axiosInstance.get(
    `/service/get-service?isTable=true&page=${page}&limit=${limit}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Get By Id
export const getServiceById = async (payload) => {
  const { data, status } = await axiosInstance.get(
    `/service/get-service/${payload.id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Post service
export const postService = async (payload) => {
  const { data, status } = await axiosInstance.post(
    "/service/add-service",
    payload
  );

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};

export const putService = async ({ id, body }) => {
  const { data, status } = await axiosInstance.put(
    `/service/edit-service/${id}`,
    body
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

export const deleteService = async ({ id }) => {
  const { data, status } = await axiosInstance.delete(
    `/service/delete-service/${id}`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
