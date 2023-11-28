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

chipset1 = Chipset("B560", "Intel", ["10th", "11th"], 4, 0, 0, 1)
chipset2 = Chipset("H510", "Intel", ["10th", "11th"], 4, 0, 0, 1)
chipset3 = Chipset("H570", "Intel", ["10th", "11th"], 4, 0, 0, 1)
chipset4 = Chipset("Z590", "Intel", ["10th", "11th"], 4, 0, 0, 1)
chipset5 = Chipset("X570", "AMD", ["3rd", "4th"], 0, 4, 0, 2)
chipset6 = Chipset("B550", "AMD", ["3rd", "4th"], 0, 4, 0, 2)
chipset7 = Chipset("A520", "AMD", ["3rd", "4th"], 0, 4, 0, 2)
chipset8 = Chipset("X470", "AMD", ["2nd", "3rd"], 0, 4, 0, 2)
chipset9 = Chipset("B450", "AMD", ["2nd", "3rd"], 0, 4, 0, 2)
chipset10 = Chipset("A320", "AMD", ["1st", "2nd", "3rd"], 0, 4, 0, 2)
chipset11 = Chipset("X299", "Intel", ["7th", "8th", "9th"], 4, 0, 0, 3)
chipset12 = Chipset("Z490", "Intel", ["10th"], 4, 0, 0, 3)