import pymongo

class Connection () :

    def __init__(self, url):
        self.client = pymongo.MongoClient(url)

    def addProducts(self, products, database_name, collection_name):
        db = self.client[database_name]
        collection = db[collection_name]

        collection.insert_many(products)