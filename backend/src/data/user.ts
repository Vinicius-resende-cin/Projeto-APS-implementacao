import User from "../models/user";
import { JSONtoSQLAdapter } from "./JSONtoSQLAdapter";
import * as sqlite3 from "sqlite3";

interface IUserRepository {
    create(User: Partial<User>): Promise<User>;
    read(id: number): Promise<User | null>;
    listAll(): Promise<User[] | null>;
    update(User: Partial<User>): Promise<User>;
    delete(id: number): Promise<User>;
}

class UserRepositoryBDR implements IUserRepository {
    db = new sqlite3.Database(require.main === module ? "./database.sqlite":"./src/data/database.sqlite", (error) => {
        if (error) {
            console.error(error.message);
            throw error;
        }
        console.log("Conexão com o banco de dados estabelecida.");
    });
    jsonToSQLAdapter = new JSONtoSQLAdapter("Users");

    doReadSql(sql: string, params: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows: User[]) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    doWriteSql(sql: string, params: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row: User) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async create(User: Partial<User>): Promise<User> {
        const { sql, values } = this.jsonToSQLAdapter.adaptCreate(User);
        try {
            const row = await this.doWriteSql(sql, values);
            return row;
        } catch (error: any) {
            console.error(error.message);
            throw error;
        }
    }

    async read(id: number): Promise<User | null> {
        const { sql, params } = this.jsonToSQLAdapter.adaptRead(id);
        try {
            const Users = await this.doReadSql(sql, params);
            return Users[0] || null;
        } catch (error: any) {
            console.error(error.message);
            return null;
        }
    }

    async listAll(): Promise<User[] | null> {
        const { sql, params } = this.jsonToSQLAdapter.adaptListAll();
        try {
            const Users = await this.doReadSql(sql, params);
            return Users || null;
        } catch (error: any) {
            console.error(error.message);
            return null;
        }
    }
    async update(User: Partial<User>): Promise<User> {
        const { sql, params } = this.jsonToSQLAdapter.adaptUpdate(User);
        try {
            const row = await this.doWriteSql(sql, params);
            return row;
        } catch (error: any) {
            console.error(error.message);
            throw error;
        }
    }

    async delete(id: number): Promise<User> {
        const { sql, params } = this.jsonToSQLAdapter.adaptDelete(id);
        try {
            const row = await this.doWriteSql(sql, params);
            return row;
        } catch (error: any) {
            console.error(error.message);
            throw error;
        }
    }
}

class UserRepositoryNR implements IUserRepository {
    create(User: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    read(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    listByUserID(userID: number): Promise<User[] | null> {
        throw new Error("Method not implemented.");
    }
    listAll(): Promise<User[] | null> {
        throw new Error("Method not implemented.");
    }
    update(User: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
}

class UserCollection {
    private UserRepository: IUserRepository;

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository;
    }
    create(User: Partial<User>): Promise<User> {
        return this.UserRepository.create(User);
    }
    read(id: number): Promise<User | null> {
        return this.UserRepository.read(id);
    }
    listAll(): Promise<User[] | null> {
        return this.UserRepository.listAll();
    }
    update(User: Partial<User>): Promise<User> {
        return this.UserRepository.update(User);
    }
    delete(id: number): Promise<User> {
        return this.UserRepository.delete(id);
    }
}

export { IUserRepository, UserRepositoryBDR, UserRepositoryNR, UserCollection };


// Teste de uso da interface
// if (require.main === module) {  
//     const userRepository = new UserRepositoryBDR();
//     const userCollection = new UserCollection(userRepository);

//     const myuser = userCollection.create({
//         name: "Dário",
//         type: "resident",
//         apartment: "302",
//         email: "dgsv@cin.ufpe.br"
//     })
//     console.log(myuser)

// }

