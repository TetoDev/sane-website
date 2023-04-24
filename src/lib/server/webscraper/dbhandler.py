import pymongo
from datetime import datetime
import time


class Connection:

    def __init__(self, key):
        self.client = pymongo.MongoClient(key)
    
    def is_operational(self):

        current_status = self.client["status"].find().sort("time", -1).limit(1)[0].get("status")

        if current_status == "operational":
            return True
        else:
            return False

    def add_products(self, products, database_name, collection_name):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to add products")
        db = self.client[database_name]
        collection = db[collection_name]

        collection.insert_many(products)

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

        
