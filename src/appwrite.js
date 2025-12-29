// src/appwrite.js
import { Client, Databases, Storage, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);

export { client, databases, storage, account, ID };

