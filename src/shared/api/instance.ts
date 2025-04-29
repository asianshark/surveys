import axios from "axios";
import { appEnv } from "../env/appEnv";

const ONE_MINUTE = 60_000;
export const instance = axios.create({
  baseURL: appEnv.VITE_API_URL,
  timeout: ONE_MINUTE,
});
