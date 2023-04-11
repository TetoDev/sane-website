import pymongo
from datetime import datetime
import time

class Connection () :

    def __init__(self, url):
        self.client = pymongo.MongoClient(url)
        self.status_collection = self.client["status"]["statusData"]

    def addProducts(self, products, database_name, collection_name):
        db = self.client[database_name]
        collection = db[collection_name]

        collection.insert_many(products)

    def updateStatus(self,status):
        self.status_collection.insert_one({"status":status,"time":time.time()})
    
    def archiveOldProducts(self, categories) :
        ## Marking the status as updating
        print("Updating database status: Updating")
        self.updateStatus("updating")

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

        ## Updating the status to operational
        print("Updating database status: Operational")
        self.updateStatus("operational")