import * as sql from "mssql";
export default class DBUtil {
    /**
     * Executes the query on MSSQL database
     * @param dbConfig data base configuration
     * @param query to be executed
     * @returns record set
     */
    static executeMSSQLQuery(dbConfig: string, query: string): Promise<{
        rows: sql.IRecordSet<any>;
        rowsAffected: number[];
    }>;
    /**
     * Executes the query on Oracle database
     * @param dbConfig data base configuration
     * @param query to be executed
     * @returns record set
     */
    static executeOracleQuery(dbConfig: string, query: string): Promise<{
        rows: unknown[] | undefined;
        rowsAffected: number | undefined;
    }>;
    /**
     * Executes the query on DB2 database
     * @param dbConfig data base configuration
     * @param query to be executed
     * @returns record set
     */
    static executeDB2Query(dbConfig: string, query: string): Promise<{
        rows: any;
        rowsAffected: any;
    }>;
}
