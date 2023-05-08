from dbhandler import Connection

game_documents = []

conn = Connection()

conn.update_status("updating")


class Game:

    def __init__(self, name: str, cpuscore: int, gpuscore: int, recommended_ram: int, storage: int,
                 img_url: str):
        self.name = name
        self.cpuscore = cpuscore
        self.gpuscore = gpuscore
        self.recommended_ram = recommended_ram
        self.storage = storage
        self.img_url = img_url
        game_documents.append(self.to_dict())

    def to_dict(self):
        return {
            "name": self.name,
            "cpuscore": self.cpuscore,
            "gpuscore": self.gpuscore,
            "recommended_ram": self.recommended_ram,
            "storage": self.storage,
            "img": self.img_url,
        }


dota2 = Game("Dota 2", 921, 2531, 8, 15, "https://cdn.mobygames.com/covers/3562112-dota-2-linux-front-cover.jpg")
apex = Game("Apex Legends", 7763, 5044, 8, 22, "https://cdn.mobygames.com/covers/7477029-apex-legends-playstation-4-front-cover.jpg")
pubg = Game("PUBG", 12302, 10072, 8, 30, "https://cdn.mobygames.com/covers/7421093-playerunknowns-battlegrounds-windows-front-cover.jpg")
warzone2 = Game("Call of Duty: Modern Warfare II", 15745, 11745, 12,
                175, "https://cdn.mobygames.com/covers/11179296-call-of-duty-warzone-20-xbox-one-front-cover.jpg")
r6s = Game("Rainbow Six Siege", 7763, 5044, 8, 47, "https://cdn.mobygames.com/covers/8859373-tom-clancys-rainbow-six-siege-windows-front-cover.jpg")
dayz = Game("DayZ", 7763, 5044, 16, 20, "https://cdn.mobygames.com/covers/3445695-dayz-xbox-one-front-cover.png")
csgo = Game("Counter-Strike: Global Offensive", 1396, 4771, 2, 15, "https://cdn.mobygames.com/covers/8832709-counter-strike-global-offensive-windows-front-cover.jpg")
lol = Game("League of Legends", 1396, 2713, 8, 16, "https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg")
fortnite = Game("Fortnite", 5682, 174, 16, 40, "https://cdn.mobygames.com/covers/8572823-fortnite-battle-royale-playstation-4-front-cover.jpg")
valorant = Game("Valorant", 7763, 5044, 8, 4, "https://www.gamerfocus.co/wp-content/uploads/2020/06/valorant.jpg")
rocketleague = Game("Rocket League", 5682, 5044, 4, 7, "https://cdn.mobygames.com/covers/9146912-rocket-league-xbox-one-front-cover.jpg")
minecraft = Game("Minecraft", 5682, 4771, 8, 16, "https://cdn.mobygames.com/covers/9261167-minecraft-playstation-4-front-cover.jpg")
overwatch2 = Game("Overwatch 2", 12302, 11745, 8, 30, "https://cdn.mobygames.com/covers/11037275-overwatch-2-xbox-one-front-cover.png")
fifa = Game("FIFA 23", 15745, 11745, 16, 100, "https://cdn.mobygames.com/covers/10958763-fifa-23-windows-front-cover.jpg")
farcry = Game("Far Cry 5", 12302, 10072, 8, 50, "https://cdn.mobygames.com/covers/2047631-far-cry-5-playstation-4-front-cover.jpg")
assassinscreed = Game("Assassin's Creed Odyssey", 15685, 15476, 16, 50, "https://cdn.mobygames.com/covers/7474732-assassins-creed-odyssey-playstation-4-inside-cover.jpg")
division2 = Game("The Division 2", 9109, 9642, 8, 50, "https://cdn.mobygames.com/covers/8892568-tom-clancys-the-division-2-warlords-of-new-york-expansion-xbox-o.jpg")
destiny2 = Game("Destiny 2", 13063, 10072, 8, 68, "https://cdn.mobygames.com/covers/2769138-destiny-2-playstation-4-front-cover.jpg")
escapefromtarkov = Game("Escape From Tarkov", 15685, 10072, 16, 20, "https://upload.wikimedia.org/wikipedia/en/2/20/Escape_from_Tarkov.jpg")
battlefield2042 = Game("Battlefield 2042", 17584, 17207, 8, 100, "https://cdn.mobygames.com/covers/10451622-battlefield-2042-windows-front-cover.jpg")
battlefield1 = Game("Battlefield 1", 9109, 10072, 16, 50, "https://cdn.mobygames.com/covers/9352866-battlefield-1-playstation-4-front-cover.jpg")
gta5 = Game("Grand Theft Auto V", 7763, 3992, 8, 90, "https://cdn.mobygames.com/covers/7124455-grand-theft-auto-v-playstation-4-front-cover.jpg")

# conn.drop_rows("game")
conn.add_entries(game_documents, "game")

conn.update_status("operational")
