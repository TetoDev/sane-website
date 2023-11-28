from dbhandler import Connection

socket_documents = []

conn = Connection()
conn.update_status("updating")

class Socket:

    def __init__(self, name: str, chipsets: []):
        self.name = name
        self.chipsets = chipsets
        socket_documents.append(self.to_dict())

    def to_dict(self):
        return {
            "name": self.name,
            "chipsets": self.chipsets,
            }

lga1700 = Socket("1700", ["LGA1700"])
lga1200 = Socket("1200", ["LGA1200"])
am4 = Socket("AM4", ["AM4"])
am5 = Socket("AM5", ["AM5"])