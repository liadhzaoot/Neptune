import { Database } from "./database";

export abstract class DbFactory {
    abstract getDB(): Promise<Database>;
  }