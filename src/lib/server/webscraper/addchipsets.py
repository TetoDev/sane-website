from dbhandler import Connection

chipset_documents = []

conn = Connection()

conn.update_status("updating")

class Chipset:
    
        def __init__(self, name: str, brand: str, supportedgenerations: [], ddr4: int, ddr5: int, score: int, socketid: int ):
            self.name = name
            self.brand = brand
            self.supportedgenerations = supportedgenerations
            self.ddr4 = ddr4
            self.ddr5 = ddr5
            self.score = score
            self.socketid = socketid
            chipset_documents.append(self.to_dict())
    
        def to_dict(self):
            return {
                "name": self.name,
                "brand": self.brand,
                "supportedgenerations": self.supportedgenerations,
                "ddr4": self.ddr4,
                "ddr5": self.ddr5,
                "score": self.score,
                "socketid": self.socketid
            }

## LGA 1200
h410 = Chipset("H410", "Intel", ["COMET"], 1, 0, 1, 1)
b460 = Chipset("B460", "Intel", ["COMET"], 1, 0, 2, 1)
h470 = Chipset("H470", "Intel", ["COMET","ROCKET"], 1, 0, 3, 1)
z490 = Chipset("Z490", "Intel", ["COMET","ROCKET"], 1, 0, 4, 1)
h510 = Chipset("H510", "Intel", ["COMET","ROCKET"], 1, 0, 5,1)
b560 = Chipset("B560", "Intel", ["COMET","ROCKET"], 1, 0, 6, 1)
h570 = Chipset("H570", "Intel", ["COMET","ROCKET"], 1, 0, 7, 1)
z590 = Chipset("Z590", "Intel", ["COMET","ROCKET"], 1, 0, 8, 1)

## LGA 1700
z690 = Chipset("Z690", "Intel", ["ALDER","RAPTOR"], 1, 1, 4, 2)
h670 = Chipset("H670", "Intel", ["ALDER","RAPTOR"], 1, 1, 3, 2)
b660 = Chipset("B660", "Intel", ["ALDER","RAPTOR"], 1, 1, 2, 2)
h610= Chipset("H610", "Intel", ["ALDER","RAPTOR"], 1, 1, 1, 2)
z790 = Chipset("Z790", "Intel", ["ALDER","RAPTOR"], 0, 1, 6, 2)
b760 = Chipset("B760", "Intel", ["ALDER","RAPTOR"], 0, 1, 5, 2)


## AM4
x570 = Chipset("X570", "AMD", ["R2","R3G","R3","R4","R5"], 1, 0, 7, 3)
b550 = Chipset("B550", "AMD", ["R3","R4","R5"], 1, 0, 6, 3)
a520 = Chipset("A520", "AMD", ["R3","R4","R5"], 1, 0, 5, 3)
x470 = Chipset("X470", "AMD", ["A","R1","R2G","R2","R3G","R3","R4","R5"], 1, 0, 4, 3)
b450 = Chipset("B450", "AMD", ["R2","R3G","R3","R4","R5"], 1, 0, 3, 3)
x370 = Chipset("X370", "AMD", ["R1","R2G","R2","R3G","R3","R4","R5"], 1, 0, 2, 3)
b350 = Chipset("B350", "AMD", ["R1","R2G","R2","R3G","R3","R4","R5"], 1, 0, 1, 3)

## AM5
x670e = Chipset("X670E", "AMD", ["R7"], 0, 1, 5, 4)
x670 = Chipset("X670", "AMD", ["R7"], 0, 1, 4, 4)
x650e = Chipset("X650E", "AMD", ["R7"], 0, 1, 3, 4)
x650 = Chipset("X650", "AMD", ["R7"], 0, 1, 2, 4)
a620 = Chipset("a620", "AMD", ["R7"], 0, 1, 1, 4)


conn.add_entries(chipset_documents,"chipset")

conn.update_status("operational")