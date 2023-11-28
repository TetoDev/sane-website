from dbhandler import Connection

socket_documents = []

conn = Connection()
conn.update_status("updating")

class Socket:

    def __init__(self, name: str):
        self.name = name
        socket_documents.append(self.to_dict())

    def to_dict(self):
        return {
            "name": self.name,
            }

nosocket = Socket("DEFAULT")
lga1200 = Socket("1200")
lga1700 = Socket("1700")
am4 = Socket("AM4")
am5 = Socket("AM5")

conn.add_entries(socket_documents,"socket")

conn.update_status("operational")