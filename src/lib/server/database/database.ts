import dotenv from 'dotenv';
import {MongoClient, Db, ObjectId} from 'mongodb';
import type { WithId } from "mongodb";

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
        this.db.set("gpu",this.client.db("gpu") as Db);
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

    public async getCpuFromStoreByScore(score: number, scoreDiff: number, except: ObjectId[]){
        const intelCpuStore = this.getCollection("cpu","intel");
        const intelCpus = await intelCpuStore.find({score: {$gte: score-scoreDiff, $lte: score+scoreDiff}}).toArray();
        const sortedIntelCpus = intelCpus.sort((cpu1,cpu2) => Math.abs(cpu1.score - score) - Math.abs(cpu2.score - score));

        const amdCpuStore = this.getCollection("cpu","amd");
        const amdCpus = await amdCpuStore.find({score: {$gte: score-scoreDiff, $lte: score+scoreDiff}}).toArray();
        const sortedAmdCpus = amdCpus.sort((cpu1,cpu2) => Math.abs(cpu1.score - score) - Math.abs(cpu2.score - score));

        sortedIntelCpus.forEach(cpu => {
            if(except.includes(cpu._id) && sortedIntelCpus.length > 1){
                sortedIntelCpus.splice(sortedIntelCpus.indexOf(cpu),1);
            }
        })
        sortedAmdCpus.forEach(cpu => {
            if(except.includes(cpu._id) && sortedAmdCpus.length > 1){
                sortedAmdCpus.splice(sortedAmdCpus.indexOf(cpu),1);
            }
        })


        const cpus = [sortedAmdCpus[0],sortedIntelCpus[0]]

        return cpus.sort((cpu1,cpu2) => Math.abs(cpu1.score - score) - Math.abs(cpu2.score - score))[0];
    }

    public async getGpuFromStoreByScore(score: number, scoreDiff: number, except: ObjectId[]){
        const nvidiaGpuStore = this.getCollection("gpu","nvidia");
        const nvidiaGpus = await nvidiaGpuStore.find({score: {$gte: score-scoreDiff, $lte: score+scoreDiff}}).toArray();
        const sortedNvidiaGpus = nvidiaGpus.sort((gpu1,gpu2) => Math.abs(gpu1.score - score) - Math.abs(gpu2.score - score));

        const amdGpuStore = this.getCollection("gpu","amd");
        const amdGpus = await amdGpuStore.find({score: {$gte: score-scoreDiff, $lte: score+scoreDiff}}).toArray();
        const sortedAmdGpus = amdGpus.sort((gpu1,gpu2) => Math.abs(gpu1.score - score) - Math.abs(gpu2.score - score));

        sortedNvidiaGpus.forEach(gpu => {
            if(except.includes(gpu._id) && sortedNvidiaGpus.length > 1){
                sortedNvidiaGpus.splice(sortedNvidiaGpus.indexOf(gpu),1);
            }
        });
        sortedAmdGpus.forEach(gpu => {
            if(except.includes(gpu._id) && sortedAmdGpus.length > 1){
                sortedAmdGpus.splice(sortedAmdGpus.indexOf(gpu),1);
            }
        });

        const gpus = [sortedAmdGpus[0],sortedNvidiaGpus[0]]

        return gpus.sort((gpu1,gpu2) => Math.abs(gpu1.score - score) - Math.abs(gpu2.score - score))[0];
    }

    public async getMotherboard(socket: string, chipset: string, ramSlots: number, format: string, except: ObjectId[]){ // Take into consideration motherboard format and ram slots
        const motherboardStore = this.getCollection("motherboards",socket);
        const motherboards = await motherboardStore.find({info: {chipset: chipset}}).toArray();

        motherboards.forEach(motherboard => {
            if(except.includes(motherboard._id) && motherboards.length > 1){
                motherboards.splice(motherboards.indexOf(motherboard),1);
            }
        });

        return motherboards[0];
    }

    public async getRam(gen: string, slots: number, capacity: number, frequency: number, except: ObjectId[]){
        const ramStore = this.getCollection("ram",gen);

        const capacityQuery = slots.toString() + " x " + capacity.toString() + " GB";
        const frequencyQuery = frequency.toString() + " MHz";
        const rams = await ramStore.find({info: {frequency: frequencyQuery, capacity: capacityQuery}}).toArray();

        rams.forEach(ram => {
            if(except.includes(ram._id) && rams.length > 1){
                rams.splice(rams.indexOf(ram),1);
            }
        });

        return rams[0];
    }

    public async getPsu(wattage: number, except: ObjectId[]){
        const psuStore = this.getCollection("psu","certified");
        const psus = await psuStore.find({wattage: wattage}).toArray();

        psus.forEach(psu => {
            if(except.includes(psu._id) && psus.length > 1){
                psus.splice(psus.indexOf(psu),1);
            }
        });

        return psus[0];
    }

    public async getSsd(bus: string, capacity: number, except: ObjectId[]){
        const ssdStore = this.getCollection("ssd",bus);
        const ssds = await ssdStore.find({info: {capacity: {$regex: capacity.toString()}}}).toArray();

        ssds.forEach(ssd => {
            if(except.includes(ssd._id) && ssds.length > 1){
                ssds.splice(ssds.indexOf(ssd),1);
            }
        });

        return ssds[0];
    }

    public async getHdd(capacity: number, except: ObjectId[]){
        const hddStore = this.getCollection("hdd","fullSize");
        const hdds = await hddStore.find({info: {capacity: {$regex: capacity.toString()}}}).toArray();

        hdds.forEach(hdd => {
           if (except.includes(hdd._id) && hdds.length > 1){
               hdds.splice(hdds.indexOf(hdd),1);
           }
        });

        return hdds[0];
    }

    public async getCase(tier: string, size: string, looks: boolean, except: ObjectId[]){
        const caseStore = this.getCollection("cases",size);

        let cases = await caseStore.find({info: {lighting: {$ne: "No"}, includedFans: {$ne: "No posee"}, panel: "Vidrio templado"}}).toArray();
        if (looks) {
            if (tier == "low") {
                cases = await caseStore.find({info: {lighting: {$ne: "No"}}}).toArray();
            } else if (tier == "mid"){
                cases = await caseStore.find({info: {lighting: {$ne: "No"}, includedFans: {$ne: "No posee"}}}).toArray();
            }
        } else {
            if (tier == "low") {
                cases = await caseStore.find().toArray() as WithId<Document>[];
            } else if (tier == "mid"){
                cases = await caseStore.find({info: {includedFans: {$ne: "No posee"}}}).toArray();
            } else if (tier == "high"){
                cases = await caseStore.find({info: {includedFans: {$ne: "No posee"}}}).toArray();
            }
        }

        cases.forEach(casee => {
            if(except.includes(casee._id) && cases.length > 1){
                cases.splice(cases.indexOf(casee),1);
            }
        })

        return cases[0];
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

export async function getCpuFromStoreByScore(score: number, scoreDiff: number, except: ObjectId[]){
    return await mongodb.getCpuFromStoreByScore(score,scoreDiff,except);
}

export async function getGpuFromStoreByScore(score: number, scoreDiff: number, except: ObjectId[]){
    return await mongodb.getGpuFromStoreByScore(score,scoreDiff,except);
}

export async function getMotherboard(socket: string, chipset: string, ramSlots: number, format: string, except: ObjectId[]){
    return await mongodb.getMotherboard(socket,chipset, ramSlots, format, except);
}

export async function getRam(gen: string, slots: number, capacity: number, frequency: number, except: ObjectId[]){
    return await mongodb.getRam(gen,slots, capacity, frequency, except);
}

export async function getPsu(wattage: number, except: ObjectId[]){
    return await mongodb.getPsu(wattage, except);
}

export async function getSsd(bus: string, capacity: number, except: ObjectId[]){
    return await mongodb.getSsd(bus,capacity, except);
}

export async function getHdd(capacity: number, except: ObjectId[]){
    return await mongodb.getHdd(capacity, except);
}

export async function getCase(tier: string, size: string, looks: boolean, except: ObjectId[]){
    return await mongodb.getCase(tier,size,looks, except);
}