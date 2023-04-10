import scraper
from dbhandler import Connection
from dotenv import load_dotenv
import os

## Loading env variable
cf = load_dotenv("../../../../.env")

## Connecting to database
print("Connecting to database...")
mongodb = Connection(os.getenv("DB_CONN"))
print("Connected to mongodb successfully!")

## Defining product categories
categories = {"graphicCards":["nvidia","amd"],
              "cpu":["intel","amd"],
              "hdd":["fullSize"],
              "ssd":["sata","m2sata","m2nvme"],
              "ram":["ddr4","ddr5"],
              "psu":["certified"],
              "coolers":["air","water"],
              "towers":["mitx","matx","atx"],
              "motherboards":["1200","1700","am4","am5"],
              "fans":["120","140"]}

## Archive old listings
mongodb.archiveOldProducts(categories)

## Searching for products

db_dump = {}
for category, sorters in categories.items():
    for sorter in sorters:
        last_products = [""]
        page = 1
        while (True):
            products = scraper.getProducts(category,sorter,str(page))

            if len(products) == 0:
                print("LAST PAGE FOUND, JUMPING TO NEXT ITEM")
                break

            db_dump.update({f"{category} {sorter} {str(page)}":products})
            last_products = products
            page = page + 1


print("Writing products to database:")
for category, products in db_dump.items():
    target = category.split(" ")

    print(f"Write: {target[0]} {target[1]} {target[2]}")
    mongodb.addProducts(products,target[0],target[1])
    print("Completed")
