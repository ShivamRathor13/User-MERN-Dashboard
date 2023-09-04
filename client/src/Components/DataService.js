import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get("/news");
    return response.data.data.news;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
