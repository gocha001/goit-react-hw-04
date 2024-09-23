import axios from "axios";

export const fetchPicture = async (page, query) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=e0v6IZkEQ3woH7MCLwAwneAwPX47vCLCwy_Ib4xSlBc&query=${query}&page=${page}&per_page=12`
  );
  return data;
};
