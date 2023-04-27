import dotenv from 'dotenv';
import { PrismaClient} from '@prisma/client';
import type { cpu } from "@prisma/client";

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

// Mongo Connection
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

    public async getCpusByScore(score: number) {
        return this.client?.cpu.findMany({
            where: {
                score: {
                    gte: score,
                }
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getGpusByScore(score: number) {
        return this.client?.gpu.findMany({
            where: {
                score: {
                    gte: score,
                }
            },
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

    public async getMotherboards(cpu: cpu, ddr5: boolean, ramSlots: number, size: string, exceptions: number[]) {
        const chipsets = await this.client?.chipset.findMany({
            where: {
                supportedgenerations: {
                    has: cpu.generation,
                }
            }
        });

        const chipsetIds = chipsets?.map(chipset => chipset.id);

        return this.client?.motherboard.findMany({
            where: {
                socketid: cpu.socketid,
                chipsetid: {
                    in: chipsetIds,
                },
                memoryslots: ramSlots,
                format: size,
                ddr5: ddr5,
                id: {
                    notIn: exceptions,
                }
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

    public async getRams(ddr5: boolean, capacity:number, ramSpeed: number, ramSlots: number, exceptions: number[]) {
        return this.client?.ram.findMany({
            where: {
                ddr5: ddr5,
                dims: ramSlots,
                speed: {
                    gte: ramSpeed,
                },
                capacity: {
                    gte: capacity,
                },
                id: {
                    notIn: exceptions,
                }
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getTowers(size: string, looks: boolean, exceptions: number[]) {
        return this.client?.tower.findMany({
            where: {
                size: size,
                lighting: looks,
                id: {
                    notIn: exceptions,
                }
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getPsus(wattage: number, exceptions: number[]) {
        return this.client?.psu.findMany({
            where: {
                power: {
                    gte: wattage,
                },
                id: {
                    notIn: exceptions,
                }
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getHdds(capacity: number, exceptions: number[]) {
        return this.client?.hdd.findMany({
            where: {
                capacity: {
                    gte: capacity,
                },
                id: {
                    notIn: exceptions,
                }
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getSsds(capacity: number, format: string, bus: string, exceptions: number[]) {
        return this.client?.ssd.findMany({
            where: {
                capacity: {
                    gte: capacity,
                },
                format: format,
                bus: {
                    contains: bus,
                },
                id: {
                    notIn: exceptions,
                }
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getCoolers(water: boolean, exceptions: number[]) {
        return this.client?.cooler.findMany({
            where: {
                type: water ? "water" : "air",
                id: {
                    notIn: exceptions,
                }
            },
            orderBy: {
                price: 'asc',
            }
        });
    }

    public async getFans(size: string, exceptions: number[]){
        return this.client?.fan.findMany({
            where: {
                size: size,
                id: {
                    notIn: exceptions,
                }
            },
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

export async function getCpusByScore(score: number) {
    return await db.getCpusByScore(score);
}

export async function getGpusByScore(score: number) {
    return await db.getGpusByScore(score);
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

export async function getMotherboards(cpu: cpu, ddr5: boolean, ramSlots: number, size: string, exceptions: number[]) {
    return await db.getMotherboards(cpu, ddr5, ramSlots, size, exceptions);
}

export async function getRams(ddr5: boolean, capacity:number, ramSpeed: number, ramSlots: number, exceptions: number[]) {
    return await db.getRams(ddr5, capacity, ramSpeed, ramSlots, exceptions);
}

export async function getTowers(size: string, looks: boolean, exceptions: number[]) {
    return await db.getTowers(size, looks, exceptions);
}

export async function getPsus(wattage: number, exceptions: number[]) {
    return await db.getPsus(wattage, exceptions);
}

export async function getHdds(capacity: number, exceptions: number[]) {
    return await db.getHdds(capacity, exceptions);
}

export async function getSsds(capacity: number, format: string, bus: string, exceptions: number[]) {
    return await db.getSsds(capacity, format, bus, exceptions);
}

export async function getCoolers(water: boolean, exceptions: number[]) {
    return await db.getCoolers(water, exceptions);
}

export async function getFans(size: string, exceptions: number[]) {
    return await db.getFans(size, exceptions);
}

export async function getChipset(id: number){
    return await db.getChipset(id);
}