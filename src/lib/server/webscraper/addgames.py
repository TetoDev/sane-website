from dbhandler import Connection
from dotenv import load_dotenv
import os

load_dotenv("../../../../.env")
game_documents = []

conn = Connection(os.getenv("DB_CONN"))

conn.update_status("updating")

class Game:

    def __init__(self, name: str, recomended_cpus: list, recomended_gpus: list, recomended_ram: int, storage: int, img_url: str):
        self.name = name

        self.requirements = {
            "cpu": recomended_cpus,
            "graphicCards": recomended_gpus,
            "ram": recomended_ram,
        }
        self.storage = storage
        self.img_url = img_url
        game_documents.append(self.to_dict())

    def to_dict(self):
        return {
            "name": self.name,
            "requirements": self.requirements,
            "storage": self.storage,
            "img": self.img_url,
        }
    

dota2 = Game("Dota 2","AMD Athlon 64 X2 Dual Core 5600+","NVIDIA GeForce GTX 650",8,15,"")
apex = Game("Apex Legends", "AMD Ryzen 5 1400", "Nvidia GeForce GTX 1050", 8, 22, "")
pubg = Game("PUBG","AMD Ryzen 5 1600 ","Nvidia GTX 1060 6GB",8,30, "")
warzone2 = Game("Call of Duty: Modern Warfare II", "AMD Ryzen R5 1600X processor", "Nvidia GeForce GTX 1660 6GB", 12, 175, "")
r6s = Game("Rainbow Six Siege","AMD FX-8120","Nvidia GeForce GTX 1050", 8, 47, "")
dayz = Game("DayZ", "AMD Ryzen 5 1400", "NVIDIA GeForce GTX 760", 16, 20, "")
csgo = Game("Counter-Strike: Global Offensive","AMD Phenom™ X3 8750","NVIDIA GeForce 6600 ",2,15, "")
lol = Game("League of Legends","AMD Phenom™ X3 8750","Nvidia GeForce GTX 560",8,16,"")
fortnite = Game("Fortnite","AMD Ryzen 3 3300U,","Nvidia GTX 1050",16,40,"")
valorant = Game("Valorant","AMD Ryzen 5 5600X","Nvidia GTX 1650",8, 4, "")
rocketleague = Game("Rocket League","AMD Ryzen 3 3300U","NVIDIA GeForce GTX 1060",4,7, "")
minecraft = Game("Minecraft", "AMD Phenom™ X3 8750","Nvidia GeForce GTX 560",8,16,"")
overwatch2 = Game("Overwatch 2","AMD Ryzen 5 1600","NVIDIA GeForce GTX 1660",8,30, "")
fifa = Game("FIFA 23", "AMD Ryzen 7 2700", "NVIDIA GeForce GTX 1660", 16, 100, "")
farcry = Game("Far Cry 5","AMD Ryzen 5 1600","NVIDIA GeForce GTX 1060",8,50, "")
assassinscreed = Game("Assassin's Creed Odyssey", "AMD Ryzen 7 1700X", "NVIDIA GeForce GTX 1080", 16, 50, "")
division2 = Game("The Division 2", "AMD Ryzen 5 1500X", "NVIDIA GeForce GTX 970 or GTX 1070 ", 8, 50, "")
destiny2 = Game("Destiny 2","AMD Ryzen 5 1600X","Nvidia GeForce GTX 1060 6GB",8,68, "")
escapefromtarkov = Game("Escape From Tarkov","AMD Ryzen 5 1600","NVIDIA GeForce GTX 1060",16,20, "")
battlefield2042 = Game("Battlefield 2042","AMD Ryzen 7 2700X","Nvidia GeForce RTX 3060",8,100,"")
battlefield1 = Game("Battlefield 1","AMD FX-8350","NVIDIA GeForce GTX 1060",16,"50 GB", "")
gta5 = Game("Grand Theft Auto V","AMD FX-8350","GeForce GTX 660",8,90,"")

conn.remove_docs("games", "gameRequirements")
conn.add_products(game_documents, "games", "gameRequirements")

conn.update_status("operational")