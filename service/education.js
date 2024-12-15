import { axiosInstance } from ".";
import { data } from "@/utils/majorList";
import { formatText } from "@/utils/formatTextFirstLetterUpper";

export const getListEducation = async () => {
  const { data, status } = await axiosInstance.get(
    `/education/get-education?isTable=false`
  );

  if (status !== 200) throw Error(`${data.message}`);
  return data;

  // const data = [
  //   {
  //     institution: "A",
  //     degree: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  //   {
  //     institution: "B",
  //     degree: "Frontend Developer",
  //     duration: "2021 - Present",
  //   },
  // ];

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

export const typeEducation = async () => {
  const list = [
    {
      label: "No formal education",
      value: "No formal education",
    },
    {
      label: "Primary education",
      value: "Primary education",
    },
    {
      label: "Secondary education or high school",
      value: "Secondary education or high school",
    },
  ];
  return list;
};

export const educationDegree = async () => {
  const list = [
    {
      label: "GED",
      value: "GED",
    },
    {
      label: "Vocational qualification",
      value: "Vocational qualification",
    },
    {
      label: "Bachelor's degree",
      value: "Bachelor's degree",
    },
    {
      label: "Diploma degree",
      value: "Diploma degree",
    },
    {
      label: "Master's degree",
      value: "Master's degree",
    },
    {
      label: "Doctorate or higher",
      value: "Doctorate or higher",
    },
  ];
  return list;
};

export const formalMajorList = async () => {
  const datas = data.map((items) => {
    return {
      value: formatText(items),
      label: formatText(items),
    };
  });

  return { data: datas };
};

export const nonFormalEducation = async () => {
  const data = [
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
    {
      value: "Self-Directed Learning",
      label: "Self-Directed Learning",
    },
    {
      value: "Volunteering",
      label: "Volunteering",
    },
  ];

  return data;
};
