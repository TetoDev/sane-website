import scraper
from rankingscraper import get_rankings
from dbhandler import Connection

# Defining product categories
categories = {"gpu": ["nvidia", "amd"],
              "cpu": ["intel", "amd"],
              "hdd": ["fullSize"],
              "ssd": ["sata", "m2sata", "m2nvme"],
              "ram": ["ddr4", "ddr5"],
              "psu": ["certified"],
              "cooler": ["air", "water"],
              "tower": ["mitx", "matx", "atx"],
              "motherboard": ["1200", "1700", "am4", "am5"],
              "fan": ["120", "140"]}

# Searching for products

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

# Scrape cpu/gpu rankings
print("Scraping rankings...")
rankings = {"cpu": get_rankings("cpu"), "gpu": get_rankings("gpu")}

for component, ranking in rankings.items():
    for ls in ranking:
        # Adding scores to cpu/gpu entries
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
                            if ("super" in product_name and "super" not in ranking_name) or (
                                    "ti" in product_name and "ti" not in ranking_name):
                                continue
                            print("Found match: {} in {} with score {}".format(item.get("name"), product.get("name"),
                                                                               item.get("score")))
                            product.update({"score": item.get("score")})


def db_init():
    db.drop_all_rows()

    # Writing new rankings to database
    print("Adding rankings to database:")
    for comp, rank in rankings.items():
        for items in rank:
            db.add_entries(items, comp + "_ranking")

    # Writing products to database
    print("Writing products to database:")
    for cat, prod in db_dump.items():
        target = cat.split(" ")

        print(f"Write: {target[0]} {target[1]}")
        db.add_entries(prod, target[0])
        print("Completed")


def db_update(update_rankings: bool = False):
    if update_rankings:
        # Updating rankings
        print("Updating rankings:")
        for comp, rank in rankings.items():
            for items in rank:
                db.update_entries(items, comp + "_ranking")

    # Updating products
    print("Updating products:")
    for cat, prod in db_dump.items():
        target = cat.split(" ")

        print(f"Update: {target[0]} {target[1]}")
        db.update_entries(prod, target[0])
        print("Completed")


# Connecting to database
print("Connecting to database...")
db = Connection()
print("Connected to Postgresql successfully!")

# Marking the status as updating
print("Updating database status: Updating")
db.update_status("updating")

try:
    # db_init()
    db_update()
except:
    db.disconnect()

# Updating the status to operational
print("Updating database status: Operational")
db.update_status("operational")

db.disconnect()
