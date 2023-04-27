from dbhandler import Connection

game_documents = []

conn = Connection()

conn.update_status("updating")


class Game:

    def __init__(self, name: str, cpu_id: int, gpu_id: int, recommended_ram: int, storage: int,
                 img_url: str):
        self.name = name
        self.cpu_id = cpu_id
        self.gpu_id = gpu_id
        self.recommended_ram = recommended_ram
        self.storage = storage
        self.img_url = img_url
        game_documents.append(self.to_dict())

    def to_dict(self):
        return {
            "name": self.name,
            "cpu_id": self.cpu_id,
            "gpu_id": self.gpu_id,
            "recommended_ram": self.recommended_ram,
            "storage": self.storage,
            "img": self.img_url,
        }


dota2 = Game("Dota 2", 417788, 351, 8, 15, "")
apex = Game("Apex Legends", 416359, 174, 8, 22, "")
pubg = Game("PUBG", 416204, 90, 8, 30, "")
warzone2 = Game("Call of Duty: Modern Warfare II", 416186, 84, 12,
                175, "")
r6s = Game("Rainbow Six Siege", 416606, 174, 8, 47, "")
dayz = Game("DayZ", 416359, 179, 16, 20, "")
csgo = Game("Counter-Strike: Global Offensive", 417483, 351, 2, 15, "")
lol = Game("League of Legends", 417483, 351, 8, 16, "")
fortnite = Game("Fortnite", 416516, 174, 16, 40, "")
valorant = Game("Valorant", 415999, 122, 8, 4, "")
rocketleague = Game("Rocket League", 416516, 90, 4, 7, "")
minecraft = Game("Minecraft", 417483, 265, 8, 16, "")
overwatch2 = Game("Overwatch 2", 416204, 84, 8, 30, "")
fifa = Game("FIFA 23", 416121, 84, 16, 100, "")
farcry = Game("Far Cry 5", 416204, 90, 8, 50, "")
assassinscreed = Game("Assassin's Creed Odyssey", 416124, 54, 16, 50, "")
division2 = Game("The Division 2", 416304, 67, 8, 50, "")
destiny2 = Game("Destiny 2", 416186, 90, 8, 68, "")
escapefromtarkov = Game("Escape From Tarkov", 416204, 90, 16, 20, "")
battlefield2042 = Game("Battlefield 2042", 416078, 42, 8, 100, "")
battlefield1 = Game("Battlefield 1", 416204, 90, 16, 50, "")
gta5 = Game("Grand Theft Auto V", 416204, 203, 8, 90, "")

# conn.drop_rows("game")
conn.add_entries(game_documents, "game")

conn.update_status("operational")
