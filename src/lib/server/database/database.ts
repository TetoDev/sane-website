import dotenv from 'dotenv';
import { MongoClient, Db } from 'mongodb';

// Load env variables
dotenv.config();

// Defining database document schema
type User = {
    name: string,
    phone: string,
    email: string,
}

type Issue = {
    time: number,
    description: string,
    orderNumber: string,
    user: User,
}

let mongodb: MongoConnection;

// Mongo Connection
class MongoConnection {
    private client: MongoClient | null;
    private db: Map<string,Db>;

    constructor(){
        this.client = null;
        this.db = new Map<string,Db>();
    }

  
    public async connect(): Promise<void> {
      try {
        this.client = await MongoClient.connect(process.env.DB_CONN_TYPESCRIPT ?? "");
        this.db.set("accounts",this.client.db("accounts"));
        this.db.set("coolers",this.client.db("coolers"));
        this.db.set("cpu",this.client.db("cpu"));
        this.db.set("fans",this.client.db("fans"));
        this.db.set("graphicCards",this.client.db("graphicCards"));
        this.db.set("hdd",this.client.db("hdd"));
        this.db.set("issues",this.client.db("issues"));
        this.db.set("motherboards",this.client.db("motherboards"));
        this.db.set("oldListings",this.client.db("oldListings"));
        this.db.set("orders",this.client.db("orders"));
        this.db.set("psu",this.client.db("psu"));
        this.db.set("ram",this.client.db("ram"));
        this.db.set("ssd",this.client.db("ssd"));
        this.db.set("status",this.client.db("status"));
        this.db.set("towers",this.client.db("towers"));
      } catch (error) {
        console.error(error);
      }
    }

    public getDatabase(dbName: string){
        return this.db.get(dbName);
    }
  
    public getCollection(dbName:string, collectionName: string) {
        return this.db.get(dbName)?.collection(collectionName);
    }

    public async writeDocuments(dbName:string, collectionName: string, documents: Object[]) {
        console.log("Writing " + String(documents.length) + " documents to " + dbName + ": " + collectionName)
        const collection = this.getCollection(dbName,collectionName);

        await collection?.insertMany(documents);
    }

    public async writeDocument(dbName:string, collectionName: string, document: Object) {
        console.log("Writing 1 document to " + dbName + ": " + collectionName)
        const collection = this.getCollection(dbName,collectionName);

        await collection?.insertOne(document);
    }
  
    public async disconnect(): Promise<void> {
      try {
        await this.client?.close();
      } catch (error) {
        console.error(error);
      }
    }
}

export async function createConnection(){
    if (mongodb) return;
    
    mongodb = new MongoConnection()
    await mongodb.connect();
}

export function postIssue (name: string, phone: string, email:string, description:string, orderNumber?: string) {
    const user: User = {
        name,
        phone,
        email
    }
    const issue: Issue = {
        time: Date.now(),
        description,
        orderNumber: orderNumber ?? "0",
        user,
    }

    mongodb.writeDocument("issues","unsolved",issue);
}