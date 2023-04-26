import psycopg2
from psycopg2.extras import execute_batch
from dotenv import load_dotenv
import os

# Loading env variable
load_dotenv("../../../../.env")


class Connection:

    def __init__(self):
        self.connection = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.cursor = self.connection.cursor()
        self.chipset_ids = {}
        self.socket_ids = {}

        self.cursor.execute("SELECT * FROM chipset")
        for row in self.cursor.fetchall():
            self.chipset_ids.update({row[1]: row[0]})

        self.cursor.execute("SELECT * FROM socket")
        for row in self.cursor.fetchall():
            self.socket_ids.update({row[1]: row[0]})

        self.insert_queries = {
            "cpu":
                "INSERT INTO cpu (name, price, socketid, score, generation, link) VALUES (%s, %s, %s, %s, %s, %s)",
            "gpu":
                "INSERT INTO gpu (name, price, bus, vram, score, link) VALUES (%s, %s, %s, %s, %s, %s)",
            "motherboard":
                "INSERT INTO motherboard (name, price, chipsetid, socketid, format, link, memoryslots, ddr5) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            "ram":
                "INSERT INTO ram (name, price, speed, dims, capacity, link, ddr5) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            "psu":
                "INSERT INTO psu (name, price, power, link) VALUES (%s, %s, %s, %s)",
            "tower":
                "INSERT INTO tower (name, price, size, panel, lighting, includedfans, link) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            "hdd":
                "INSERT INTO hdd (name, price, capacity, link) VALUES (%s, %s, %s, %s)",
            "ssd":
                "INSERT INTO ssd (name, price, capacity, bus, link, format) VALUES (%s, %s, %s, %s, %s, %s)",
            "fan":
                "INSERT INTO fan (name, price, size, link) VALUES (%s, %s, %s, %s)",
            "game":
                "INSERT INTO game (name, reqcpuid, rqgpuid, reqram, storage, imglink) VALUES (%s, %s, %s, %s, %s, %s)",
            "cpu_ranking":
                "INSERT INTO cpu_ranking (score, name) VALUES (%s, %s)",
            "gpu_ranking":
                "INSERT INTO gpu_ranking (score, name) VALUES (%s, %s)",
            "cooler":
                "INSERT INTO cooler (name, price, type, size, link) VALUES (%s, %s, %s, %s, %s)",
        }

        self.delete_queries = {
            "cpu":
                "INSERT INTO cpu (name, price, socketid, score, generation, link) VALUES (%s, %s, %s, %s, %s, %s)",
            "gpu":
                "INSERT INTO gpu (name, price, bus, vram, score, link) VALUES (%s, %s, %s, %s, %s, %s)",
            "motherboard":
                "INSERT INTO motherboard (name, price, chipsetid, socketid, format, link, memoryslots, ddr5) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            "ram":
                "INSERT INTO ram (name, price, speed, dims, capacity, link, ddr5) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            "psu":
                "INSERT INTO psu (name, price, power, link) VALUES (%s, %s, %s, %s)",
            "tower":
                "INSERT INTO tower (name, price, size, panel, lighting, includedfans, link) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            "hdd":
                "INSERT INTO hdd (name, price, capacity, link) VALUES (%s, %s, %s, %s)",
            "ssd":
                "INSERT INTO ssd (name, price, capacity, bus, link, format) VALUES (%s, %s, %s, %s, %s, %s)",
            "fan":
                "INSERT INTO fan (name, price, size, link) VALUES (%s, %s, %s, %s)",
            "game":
                "INSERT INTO game (name, reqcpuid, rqgpuid, reqram, storage, imglink) VALUES (%s, %s, %s, %s, %s, %s)",
            "cpu_ranking":
                "INSERT INTO cpu_ranking (score, name) VALUES (%s, %s)",
            "gpu_ranking":
                "INSERT INTO gpu_ranking (score, name) VALUES (%s, %s)",
            "cooler":
                "INSERT INTO cooler (name, price, type, size, link) VALUES (%s, %s, %s, %s, %s)",
        }
    
    def is_operational(self):
        query = "SELECT status FROM status ORDER BY id DESC LIMIT 1"
        self.cursor.execute(query)
        current_status = self.cursor.fetchone()[0]

        if current_status == "operational":
            return True
        else:
            return False

    def write_to_database(self, entry_type, inputs):
        execute_batch(self.cursor, self.insert_queries.get(entry_type), inputs)

    def add_entries(self, entries, entry_type):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to add products")

        inputs = []
        if entry_type == "cpu":
            for entry in entries:
                info = entry.get("info")
                socket_id = self.socket_ids.get(info.get("socket").upper()) if self.socket_ids.get(info.get("socket").upper()) is not None else 0
                inputs.append((entry.get("name"), entry.get("price"), socket_id, entry.get("score"), info.get("generation"), entry.get("link")))
                self.write_to_database("cpu", inputs)

        elif entry_type == "gpu":
            for entry in entries:
                info = entry.get("info")
                inputs.append((entry.get("name"), entry.get("price"), info.get("bus"), info.get("vram"), entry.get("score"), entry.get("link")))
                self.write_to_database("gpu", inputs)

        elif entry_type == "motherboard":
            for entry in entries:
                info = entry.get("info")
                socket_id = self.socket_ids.get(info.get("socket").upper()) if self.socket_ids.get(
                    info.get("socket").upper()) is not None else 0
                chipset_id = self.chipset_ids.get(info.get("chipset").lower()) if self.chipset_ids.get(info.get("chipset").lower()) is not None else 0
                inputs.append((entry.get("name"), entry.get("price"), chipset_id, socket_id, info.get("format"), entry.get("link"), info.get("memoryslots"), info.get("ddr5")))
                self.write_to_database("motherboard", inputs)

        elif entry_type == "ram":
            for entry in entries:
                info = entry.get("info")
                inputs.append((entry.get("name"), entry.get("price"), info.get("speed"), info.get("dims"), info.get("capacity"), entry.get("link"), info.get("ddr5")))
                self.write_to_database("ram", inputs)

        elif entry_type == "psu":
            for entry in entries:
                info = entry.get("info")
                inputs.append((entry.get("name"), entry.get("price"), info.get("power"), entry.get("link")))
                self.write_to_database("psu", inputs)

        elif entry_type == "tower":
            for entry in entries:
                info = entry.get("info")
                inputs.append((entry.get("name"), entry.get("price"), info.get("format"), info.get("panel"), info.get("lighting"), info.get("includedfans"), entry.get("link")))
                self.write_to_database("tower", inputs)

        elif entry_type == "hdd":
            for entry in entries:
                info = entry.get("info")
                inputs.append((entry.get("name"), entry.get("price"), info.get("capacity"), entry.get("link")))
                self.write_to_database("hdd", inputs)

        elif entry_type == "ssd":
            for entry in entries:
                info = entry.get("info")
                inputs.append((entry.get("name"), entry.get("price"), info.get("capacity"), info.get("bus"), entry.get("link"), info.get("format")))
                self.write_to_database("ssd", inputs)

        elif entry_type == "fan":
            for entry in entries:
                info = entry.get("info")
                inputs.append((entry.get("name"), entry.get("price"), info.get("size"), entry.get("link")))
                self.write_to_database("fan", inputs)

        elif entry_type == "game":
            for entry in entries:
                inputs.append((entry.get("name"), entry.get("reqcpuid"), entry.get("reqgpuid"), entry.get("reqram"), entry.get("storage"), entry.get("imglink")))
                self.write_to_database("game", inputs)

        elif entry_type == "cpu_ranking":
            for entry in entries:
                inputs.append((entry.get("score"), entry.get("name")))
                self.write_to_database("cpu_ranking", inputs)

        elif entry_type == "gpu_ranking":
            for entry in entries:
                inputs.append((entry.get("score"), entry.get("name")))
                self.write_to_database("gpu_ranking", inputs)

        elif entry_type == "cooler":
            for entry in entries:
                info = entry.get("info")
                inputs.append((entry.get("name"), entry.get("price"), info.get("type"), info.get("size"), entry.get("link")))
                self.write_to_database("cooler", inputs)

        self.connection.commit()

    def drop_rows(self, table):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to remove rows")

        self.cursor.execute("DELETE FROM " + table)
        self.connection.commit()

    def update_status(self, status):
        self.cursor.execute("INSERT INTO status (status) VALUES (%s)", (status,))
        self.connection.commit()
    
    def drop_all_rows(self):
        if self.is_operational():
            raise Exception("Database is currently operational, unable to delete rows")

        for table in self.insert_queries.keys():
            self.cursor.execute("DELETE FROM " + table)

        self.connection.commit()

    def disconnect(self):
        self.cursor.close()
        self.connection.close()
