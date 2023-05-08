import dotenv from 'dotenv';
import { PrismaClient} from '@prisma/client';

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

let db: Database;

// Postgresql Connection
class Database {
    private client: PrismaClient | null;

    constructor(){
        this.client = null;
    }

  
    public async connect(): Promise<void> {
      try {
        this.client = new PrismaClient();
      } catch (error) {
        console.error(error);
      }
    }

    public async postIssue(issue: Issue) {
        console.log("Posting issue to database: " + issue.user.email + " for order " + issue.orderNumber)
        await this.client?.issue.create({
           data: {
               name: issue.user.name,
               email: issue.user.email,
               phone: issue.user.phone,
               issue: issue.description,
           }
        });
    }

    public async getCpus() {
        return this.client?.cpu.findMany({
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getGpus() {
        return this.client?.gpu.findMany({
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getCpuRanking(id: number) {
        return this.client?.cpu_ranking.findUnique({
            where: {
                id: id,
            }
        })
    }

    public async getGpuRanking(id: number) {
        return this.client?.gpu_ranking.findUnique({
            where: {
                id: id,
            }
        })
    }

    public async getGames() {
        return this.client?.game.findMany();
    }

    public async getMotherboards(size: string) {
        return this.client?.motherboard.findMany({
            where: {
                format: size,
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getChipset(id: number){
        return this.client?.chipset.findUnique({
            where: {
                id: id,
            }
        });
    }

    public async getRams() {
        return this.client?.ram.findMany({
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getTowers(size: string) {
        return this.client?.tower.findMany({
            where: {
                size: size,
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getPsus() {
        return this.client?.psu.findMany({
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getHdds() {
        return this.client?.hdd.findMany({
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getSsds() {
        return this.client?.ssd.findMany({
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getCoolers() {
        return this.client?.cooler.findMany({
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getFans(){
        return this.client?.fan.findMany({
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async disconnect(): Promise<void> {
      try {
        await this.client?.$disconnect();
      } catch (error) {
        console.error(error);
      }
    }
}

export async function createConnection(){
    if (db) return;
    
    db = new Database()
    await db.connect();
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

    db.postIssue(issue).then(() => {console.log("New issue added to db: " + email + " for order " + orderNumber)});
}

export async function getCpus() {
    return await db.getCpus();
}

export async function getGpus() {
    return await db.getGpus();
}

export async function getCpuRanking(id: number) {
    return await db.getCpuRanking(id);
}

export async function getGpuRanking(id: number) {
    return await db.getGpuRanking(id);
}

export async function getGames() {
    return await db.getGames();
}

export async function getMotherboards(size: string) {
    return await db.getMotherboards(size);
}

export async function getRams() {
    return await db.getRams();
}

export async function getTowers(size: string) {
    return await db.getTowers(size);
}

export async function getPsus() {
    return await db.getPsus();
}

export async function getHdds() {
    return await db.getHdds();
}

export async function getSsds() {
    return await db.getSsds();
}

export async function getCoolers() {
    return await db.getCoolers();
}

export async function getFans() {
    return await db.getFans();
}

export async function getChipset(id: number){
    return await db.getChipset(id);
}