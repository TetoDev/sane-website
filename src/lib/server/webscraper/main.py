import scraper
from rankingscraper import get_rankings
from dbhandler import Connection
from dotenv import load_dotenv
import os

## Loading env variable
load_dotenv(".env")

## Defining product categories
categories = {"gpu": ["nvidia", "amd"],
              "cpu": ["intel", "amd"],
              "hdd": ["fullSize"],
              "ssd": ["sata", "m2sata", "m2nvme"],
              "ram": ["ddr4", "ddr5"],
              "psu": ["certified"],
              "coolers": ["air", "water"],
              "towers": ["mitx", "matx", "atx"],
              "motherboards": ["1200", "1700", "am4", "am5"],
              "fans": ["120", "140"]}


## Searching for products

db_dump = {}
for category, sorters in categories.items():
    for sorter in sorters:
        db_dump.update({f"{category} {sorter}": []})

        page = 1
        while True:
            products = scraper.get_products(category, sorter, str(page))

            if len(products) == 0:
                print("LAST PAGE FOUND, JUMPING TO NEXT ITEM")
                break

            db_dump.get(f"{category} {sorter}").extend(products)
            page = page + 1

## Scrape cpu/gpu rankings
print("Scraping rankings...")
rankings = {"cpu": get_rankings("cpu"), "gpu": get_rankings("gpu")}

for component, ranking in rankings.items():
    for ls in ranking:
        ## Adding scores to cpu/gpu entries
        for item in ls:
            item_name = item.get("name")
            if item_name == "VE" or item_name == "R6" or item_name == "R2" or item_name == "550" or item_name == "Pro" or item_name == "A16" or item_name == "6700" or item_name == "550" or item_name == "630" or item_name == "310" or item_name == "6800" or item_name == "210" or item_name == "6600" or item_name == "6500":
                continue
            for key, value in db_dump.items():
                if key.split(" ")[0] == component:
                    for product in value:
                        if product.get("score") != 0:
                            continue
                        ranking_name = item_name.replace(" ", "").lower()
                        product_name = product.get("name").replace(" ", "").lower()
                        if ranking_name in product_name:
                            if ("super" in product_name and not "super" in ranking_name) or ("ti" in product_name and not "ti" in ranking_name):
                                continue
                            print("Found match: {} in {} with score {}".format(item.get("name"), product.get("name"), item.get("score")))
                            product.update({"score": item.get("score")})
        

## Connecting to database
print("Connecting to database...")
mongodb = Connection(os.getenv("DB_CONN"))
print("Connected to mongodb successfully!")

## Marking the status as updating
print("Updating database status: Updating")
mongodb.update_status("updating")

## Archive old listings
mongodb.archive_old_products(categories)

## Removing and writing new rankings to database
mongodb.remove_docs("rankings", component)
for component, ranking in rankings.items():
    for ls in ranking:
        mongodb.add_products(ls, "rankings", component)


## Writing products to database
print("Writing products to database:")
for category, products in db_dump.items():
    target = category.split(" ")

    print(f"Write: {target[0]} {target[1]}")
    mongodb.add_products(products, target[0], target[1])
    print("Completed")

## Updating the status to operational
print("Updating database status: Operational")
mongodb.update_status("operational")

mongodb.disconnect()
