/* eslint-disable @typescript-eslint/no-explicit-any */
import * as sql from 'mssql';
import oracledb from 'oracledb';
import * as Constants from '@data/Constants';

export default class DBUtil {
  ibmdb = require('ibm_db');
  /**
   * Executes the query on MSSQL database
   * @param dbConfig data base configuration
   * @param query to be executed
   * @returns record set
   */
  public static async executeMSSQLQuery(dbConfig: string, query: string) {
    try {
      const pool = await sql.connect(`${dbConfig}${Constants.DBConstants.CERTIFICATE}`);
      const result = await pool.request().query(query);

      return { rows: result.recordset, rowsAffected: result.rowsAffected };
    } catch (err) {
      throw new Error(`Error while executing query\n${err.message}`);
    }
  }

  /**
   * Executes the query on Oracle database
   * @param dbConfig data base configuration
   * @param query to be executed
   * @returns record set
   */
  public static async executeOracleQuery(dbConfig: string, query: string) {
    const configs = dbConfig.split(Constants.CommonConstants.SEMICOLON);
    const config = {
      user: configs[0].replace(Constants.DBConstants.USER, Constants.CommonConstants.BLANK).trim(),
      password: configs[1].replace(Constants.DBConstants.PASSWORD, Constants.CommonConstants.BLANK).trim(),
      connectString: configs[2]
        .replace(Constants.DBConstants.CONNECTION_STRING, Constants.CommonConstants.BLANK)
        .trim(),
    };
    let connection: oracledb.Connection | undefined;
    try {
      connection = await oracledb.getConnection(config);
      const result = await connection.execute(query);

      return { rows: result.rows, rowsAffected: result.rowsAffected };
    } catch (err) {
      throw new Error(`Error while executing query\n${err.message}`);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  /**
   * Executes the query on DB2 database
   * @param dbConfig data base configuration
   * @param query to be executed
   * @returns record set
   */
  public static async executeDB2Query(dbConfig: string, query: string) {
    let connection: any;
    try {
      connection = ibmdb.openSync(`${dbConfig}${Constants.DBConstants.PROTOCOL}`);
      const result = connection.querySync(query);

      return { rows: result, rowsAffected: result.length };
    } catch (error) {
      throw new Error(`Error while executing query\n${error.message}`);
    } finally {
      if (connection) {
        try {
          connection.closeSync();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}
