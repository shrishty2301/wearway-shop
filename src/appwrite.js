import { Client, Databases, Storage, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // or your self‑hosted URL
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };


