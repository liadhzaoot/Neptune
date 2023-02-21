import { Database } from "../database";
import { DbFactory } from "../dbFactory"
import { Postgres } from "./postgres";
export class PostgresFactory extends DbFactory {

  async getDB(): Promise<Database> {
    return Postgres.getInstance();
  }
}