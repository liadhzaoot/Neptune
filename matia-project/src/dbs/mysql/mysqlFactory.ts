import { Database } from "../database";
import { DbFactory } from "../dbFactory"
import { Mysql } from "./mysql";
export class MysqlFactory extends DbFactory {

  async getDB(): Promise<Database> {
    return Mysql.getInstance();
  }
}