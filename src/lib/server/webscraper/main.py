import scraper
from rankingscraper import get_rankings
from dbhandler import Connection
from dotenv import load_dotenv
import os

## Loading env variable
load_dotenv("../../../../.env")

## Connecting to database
print("Connecting to database...")
mongodb = Connection(os.getenv("DB_CONN"))
print("Connected to mongodb successfully!")

## Defining product categories
categories = {"graphicCards": ["nvidia", "amd"],
              "cpu": ["intel", "amd"],
              "hdd": ["fullSize"],
              "ssd": ["sata", "m2sata", "m2nvme"],
              "ram": ["ddr4", "ddr5"],
              "psu": ["certified"],
              "coolers": ["air", "water"],
              "towers": ["mitx", "matx", "atx"],
              "motherboards": ["1200", "1700", "am4", "am5"],
              "fans": ["120", "140"]}

## Marking the status as updating
print("Updating database status: Updating")
mongodb.update_status("updating")

## Archive old listings
mongodb.archive_old_products(categories)

## Searching for products

db_dump = {}
for category, sorters in categories.items():
    for sorter in sorters:

        page = 1
        while True:
            products = scraper.get_products(category, sorter, str(page))

            if len(products) == 0:
                print("LAST PAGE FOUND, JUMPING TO NEXT ITEM")
                break

            if (category == "cpu" or category == "graphicCards"):
                for product in products:
                    product.update({"score":mongodb.getProductFromRanking("gpu" if category == "graphicCards" else "cpu", product.get("name")).get("score")}) ## FIX THIS

            db_dump.update({f"{category} {sorter} {str(page)}": products})
            page = page + 1

print("Writing products to database:")
for category, products in db_dump.items():
    target = category.split(" ")

    print(f"Write: {target[0]} {target[1]} {target[2]}")
    mongodb.add_products(products, target[0], target[1])
    print("Completed")

## Scrape cpu/gpu rankings
print("Scraping rankings...")
for component in ["cpu","gpu"]:
    mongodb.remove_docs("rankings", component)
    rankings = get_rankings(component)
    for ranking in rankings:
        mongodb.add_products(ranking, "rankings",component)


## Updating the status to operational
print("Updating database status: Operational")
mongodb.update_status("operational")