declare module 'bun:sqlite' {
  export type SQLiteValue = string | number | Uint8Array | null;

  export class Statement<T = any, Params extends any[] = any[]> {
    get(...params: Params): T | undefined;
    all(...params: Params): T[];
    run(...params: Params): void;
  }

  export class Database {
    constructor(filename: string, options?: { create?: boolean; readonly?: boolean });
    run(sql: string, ...params: SQLiteValue[]): void;
    query<T = any, Params extends any[] = any[]>(sql: string): Statement<T, Params>;
    close(): void;
  }
}


