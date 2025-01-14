import { axiosInstance } from ".";

// Login
export const login = async (payload) => {
  const { data, status } = await axiosInstance.post("/auth/login", payload);

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};

export const logout = async () => {
  const { data, status } = await axiosInstance.post("/auth/logout", payload);

  if (status !== 200 && status !== 201) throw Error(`${data.message}`);
  return data;
};
