import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;

    this.dbHost = DB_HOST;
    this.dbPort = DB_PORT;
    this.dbDatabase = DB_DATABASE;
    this.client = new MongoClient(`mongodb://${this.dbHost}:${this.dbPort}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.isAlive();
  }

  async isAlive() {
    try {
      await this.client.connect();
      console.log('DBClient: MongoDB connection established');
      return true;
    } catch (error) {
      console.error('DBClient: MongoDB connection failed');
      return false;
    } finally {
      await this.client.close();
    }
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const usersCount = await this.client
        .db(this.dbDatabase)
        .collection('users')
        .countDocuments();
      return usersCount;
    } finally {
      await this.client.close();
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const filesCount = await this.client
        .db(this.dbDatabase)
        .collection('files')
        .countDocuments();
      return filesCount;
    } finally {
      await this.client.close();
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
