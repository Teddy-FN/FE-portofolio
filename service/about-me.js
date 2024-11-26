import { axiosInstance } from ".";
const config = { headers: { "Content-Type": "multipart/form-data" } };

// Get About Me
export const getListAboutMe = async () => {
  const { data, status } = await axiosInstance.get("/about-me/get-about-me");

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Post About Me
export const postAboutMe = async (payload) => {
  const { data, status } = await axiosInstance.post(
    "/about-me/add-about-me",
    payload,
    config
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};

// Edit About Me
export const putAboutMe = async (payload) => {
  const { data, status } = await axiosInstance.put(
    `/about-me/edit-about-me/${payload.id}`,
    payload
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;
};
