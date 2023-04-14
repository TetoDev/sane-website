import dotenv from 'dotenv';
import { MongoClient, Db} from 'mongodb';

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
        this.db.set("accounts",this.client.db("accounts") as Db);
        this.db.set("coolers",this.client.db("coolers") as Db);
        this.db.set("cpu",this.client.db("cpu") as Db);
        this.db.set("fans",this.client.db("fans") as Db);
        this.db.set("graphicCards",this.client.db("graphicCards") as Db);
        this.db.set("hdd",this.client.db("hdd") as Db);
        this.db.set("issues",this.client.db("issues") as Db);
        this.db.set("motherboards",this.client.db("motherboards") as Db);
        this.db.set("oldListings",this.client.db("oldListings") as Db);
        this.db.set("orders",this.client.db("orders") as Db);
        this.db.set("psu",this.client.db("psu") as Db);
        this.db.set("ram",this.client.db("ram") as Db);
        this.db.set("ssd",this.client.db("ssd") as Db);
        this.db.set("status",this.client.db("status") as Db);
        this.db.set("towers",this.client.db("towers") as Db);
        this.db.set("rankings",this.client.db("rankings") as Db);
        this.db.set("games",this.client.db("games") as Db);
      } catch (error) {
        console.error(error);
      }
    }

    public getDatabase(dbName: string){
        return this.db.get(dbName) as Db;
    }
  
    public getCollection(dbName:string, collectionName: string) {
        return this.getDatabase(dbName).collection(collectionName);
    }

    public async writeDocuments(dbName:string, collectionName: string, documents: Object[]) {
        console.log("Writing " + String(documents.length) + " documents to " + dbName + ": " + collectionName)
        const collection = this.getCollection(dbName,collectionName);

        await collection.insertMany(documents);
    }

    public async writeDocument(dbName:string, collectionName: string, document: Object) {
        console.log("Writing 1 document to " + dbName + ": " + collectionName)
        const collection = this.getCollection(dbName,collectionName);

        await collection.insertOne(document);
    }

    public async getCpuFromRanking(score: number){
        const cpuRanking = this.getCollection("rankings","cpu");
        const amdcpus = await cpuRanking.find({name:{$regex: "AMD"},score: {$gte: score-5000, $lte: score+5000}}).toArray();
        const intelcpus = await cpuRanking?.find({name:{$regex: "Intel"},score: {$gte: score-1000, $lte: score+1000}}).toArray();
        
        const sortedAmdCpus = amdcpus.sort((cpu1,cpu2) => Math.abs(cpu1.score - score) - Math.abs(cpu2.score - score));
        const sortedIntelCpus = intelcpus.sort((cpu1,cpu2) => Math.abs(cpu1.score - score) - Math.abs(cpu2.score - score));

        const cpu = Math.abs(sortedAmdCpus[0].score - score) < Math.abs(sortedIntelCpus[0].score - score) ? sortedAmdCpus[0] : sortedIntelCpus[0];
        return cpu;
    }

    public async getGpuFromRanking(score: number){
      const gpuRanking = this.getCollection("rankings","gpu");
      const amdgpus = await gpuRanking.find({name:{$regex: "Radeon"},score: {$gte: score-5000, $lte: score+5000}}).toArray();
      const nvidiagpus = await gpuRanking.find({name:{$regex: "GeForce"},score: {$gte: score-1000, $lte: score+1000}}).toArray();
      
      const sortedAmdGpus = amdgpus.sort((gpu1,gpu2) => Math.abs(gpu1.score - score) - Math.abs(gpu2.score - score));
      const sortedNvidiaGpus = nvidiagpus.sort((gpu1,gpu2) => Math.abs(gpu1.score - score) - Math.abs(gpu2.score - score));

      const gpu = Math.abs(sortedAmdGpus[0].score - score) < Math.abs(sortedNvidiaGpus[0].score - score) ? sortedAmdGpus[0] : sortedNvidiaGpus[0];
      return gpu;
  }

  public async getCpuFromStore(name: string){
    const isAmd = name.includes("AMD");
    const cpuStore = this.getCollection("cpu",isAmd ? "amd" : "intel");

    let searchName: string;
    if (!isAmd){
      searchName = name.replace("Intel Core ","");
      const arrobaIndex = searchName.indexOf("@");

      searchName = searchName.substring(0,arrobaIndex-1);
    } else {
      searchName = name
    }
    const cpu = await cpuStore.findOne({name: searchName});
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

    mongodb.writeDocument("issues", "unsolved", issue).then(() => {console.log("New issue added to db: " + email + " for order " + orderNumber)});
}

export async function getCpuFromRanking(score: number){
    return await mongodb.getCpuFromRanking(score);
}

export async function getGpuFromRanking(score: number){
    return await mongodb.getGpuFromRanking(score);
}