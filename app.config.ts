import "dotenv/config";
export interface AppConfig {
  API_URL: string;
  API_TOKEN: string;
  BASE_URL_IMAGES: string;
}
export default {
  name: "animals-inventory-app",
  version: "1.0.0",
  extra: {
    API_URL: process.env.API_URL,
    API_TOKEN: process.env.API_TOKEN,
    BASE_URL_IMAGES: process.env.BASE_URL_IMAGES,
  },
  scheme: "animals-invent-app",
};
