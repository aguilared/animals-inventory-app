import Constants from "expo-constants";
import { AppConfig } from "./app.config";

const { API_TOKEN, API_URL, BASE_URL_IMAGES } = Constants.manifest
  ?.extra as AppConfig;
