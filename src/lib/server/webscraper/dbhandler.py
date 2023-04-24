import psycopg2
from datetime import datetime
import time
from dotenv import load_dotenv
import os

## Loading env variable
load_dotenv("../../../../.env")



class Connection:

    def __init__(self):
        self.connection = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.cursor = self.connection.cursor()
        self.chipset_ids = {}

        self.cursor.execute("SELECT * FROM chipset")
        for row in self.cursor.fetchall():
            self.chipset_ids.update({row[1]: row[0]})

        self.queries = {
            "cpu":
                "INSERT INTO cpu (name, price, socketid, score, generation, link) VALUES (%s, %s, %s, %s, %s, %s)",
            "gpu":
                "INSERT INTO gpu (name, price, bus, vram, score, link) VALUES (%s, %s, %s, %s, %s, %s)",
            "motherboard":
                "INSERT INTO motherboard (name, price, chipsetid, socketid, format, link, memoryslots) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            "ram":
                "INSERT INTO ram (name, price, type, speed, dims, capacity, link) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            "psu":
                "INSERT INTO psu (name, price, power, link) VALUES (%s, %s, %s, %s)",
            "tower":
                "INSERT INTO tower (name, price, size, panel, lighting, includedfans, link) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            "hdd":
                "INSERT INTO hdd (name, price, capacity, link) VALUES (%s, %s, %s, %s)",
            "ssd":
                "INSERT INTO ssd (name, price, capacity, bus, link) VALUES (%s, %s, %s, %s, %s)",
            "fan":
                "INSERT INTO fan (name, price, size, link) VALUES (%s, %s, %s, %s)",
            "game":
                "INSERT INTO game (name, reqcpuid, rqgpuid, reqram, storage, imglink) VALUES (%s, %s, %s, %s, %s, %s)",
            "cpu_ranking":
                "INSERT INTO cpu_ranking (score, name) VALUES (%s, %s)",
            "gpu_ranking":
                "INSERT INTO gpu_ranking (score, name) VALUES (%s, %s)",
        }
    
    def is_operational(self):
        query = "SELECT status FROM status ORDER BY id DESC LIMIT 1"
        self.cursor.execute(query)
        current_status = self.cursor.fetchone()[0]

        print(current_status)
        if current_status == "operational":
            return True
        else:
            return False

    def writeToDatabase(self, entries, entry_type, *args):
        for entry in entries:
            self.cursor.execute(self.queries.get(entry_type), *args)
        self.connection.commit()

    def add_entries(self, entries, entry_type):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to add products")

        if entry_type == "cpu":
            self.writeToDatabase(entries, "cpu", ) ## Figure out how to pass arguments and write entries to db with only one method





    def remove_docs(self, database_name, collection_name):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to remove docs")
        db = self.client[database_name]
        collection = db[collection_name]

        collection.delete_many({})
    
    def getProductFromRanking(self, component, name):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to remove docs")
        db = self.client["rankings"]
        collection = db[component]

        return collection.find_one({"name": name})
    
    def get_rankings(self, component):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to remove docs")
        db = self.client["rankings"]
        collection = db[component]

        return list(collection.find())
    
    def get_products_by_regex(self, category, sorter, regex):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to remove docs")
        db = self.client[category]
        collection = db[sorter]

        return list(collection.find({"name": {"$regex": regex}}))

    def update_status(self, status):
        self.status_collection.insert_one({"status": status, "time": time.time()})
    
    def archive_old_products(self, categories):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to archive old listings")

        ## Creating archive collection in oldListings
        print("Creating new archive collection")
        now = datetime.now()
        archive_collection_name = now.strftime("%H%M-%d_%m_%Y")
        archive_collection = self.client["oldListings"].create_collection(archive_collection_name)
        
        ## Moving items from all dbs
        print("Moving items")
        for category, sorters in categories.items():
            db = self.client[category]
            for sorter in sorters:
                print(f"Copying elements from {category}-{sorter} to {archive_collection_name}")
                collection = db[sorter]
                documents = list(collection.find())

                if len(documents) == 0:
                    break

                archive_collection.insert_many(documents)

                ## Deleting listings
                print("Deleting old entries")
                collection.delete_many({})

    def disconnect (self):
        self.client.close()

conn = Connection()
print(conn.is_operational())
