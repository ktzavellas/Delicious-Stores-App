import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-delicious-stores-5d65f.firebaseio.com/"
});

export default instance;
