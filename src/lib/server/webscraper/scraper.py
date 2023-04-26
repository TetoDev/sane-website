import requests
from bs4 import BeautifulSoup
import re


def get_page(category, sorter, page):
        
    if category == "cpu":
        sub_url = "brands=106382" if sorter == "intel" else "brands=106379"
        url = f"https://www.solotodo.cl/processors?{sub_url}&page={page}"
            
    elif category == "gpu":
        sub_url = "gpu_families=106058" if sorter == "nvidia" else "gpu_families=106049"
        url = f"https://www.solotodo.cl/video_cards?{sub_url}&page={page}"

    elif category == "ram":
        sub_url = "types=130774&formats=130758" if sorter == "ddr4" else "types=1490246&formats=130758"
        url = f"https://www.solotodo.cl/rams?{sub_url}&page={page}"
        
    elif category == "psu":
        url = f"https://www.solotodo.cl/power_supplies?certification_start=247992&page={page}"
        
    elif category == "cooler":
        sub_url = "types=276479" if sorter == "air" else "types=276488"
        url = f"https://www.solotodo.cl/cpu_coolers?{sub_url}&page={page}"
        
    elif category == "tower":
        sub_url = "motherboard_formats=251395" if sorter == "mitx" else ("motherboard_formats=251385" if sorter == "matx" else "motherboard_formats=251389")
        url = f"https://www.solotodo.cl/computer_cases?{sub_url}&page={page}"
        
    elif category == "motherboard":
        sub_url = "sockets=1153273" if sorter == "1200" else ("sockets=1490218" if sorter == "1700" else ("sockets=593822" if sorter == "am4" else "sockets=1646832"))
        url = f"https://www.solotodo.cl/motherboards?{sub_url}&page={page}"
        
    elif category == "fan":
        sub_url = "sizes=1545572" if sorter == "120" else "sizes=1545648"
        url = f"https://www.solotodo.cl/case_fans?{sub_url}&page={page}"
        
    elif category == "ssd":
        sub_url = "format_families=1560425&base_buses=1559283" if sorter == "sata" else ("format_families=1560421&base_buses=1559283" if sorter == "m2sata" else "format_families=1560421&base_buses=1559281")
        url = f"https://www.solotodo.cl/solid_state_drives?{sub_url}&page={page}"
        
    else :
        # hdd
        url = f"https://www.solotodo.cl/storage_drives?sizes=204422&page={page}"
        
    print(f"category: {category} | sorter: {sorter} | page: {page}")
    print(f"Going to {url}")
    return BeautifulSoup(requests.get(url).content, "html.parser")


def get_products(category, sorter, page):
    webpage = get_page(category, sorter, page)
    products = []
    for product in webpage.find_all("button", class_="MuiButtonBase-root"): 
        if '$' in product.text:
            
            specs = product.text.split("\n")
            first_line = specs[0].split("$")
        
            name = re.sub(r"\([^)]*\)|\[[^]]*\]", '', first_line[0]).replace("Desktop", '').replace("RGB Programable "
                                                                                                    "(ARGB / 3-pin / "
                                                                                                    "5V)", '').replace("-", " ").strip()
            if category == "gpu" and sorter == "nvidia":
                if name.startswith("ASUS"):
                    sections = name.split(" ")
                    sections[2] = sections[2].replace("S", "SUPER")
                    name = " ".join(sections)
                    
            price = first_line[1].replace(".", "")
            info = {}
            link = "https://www.solotodo.cl" + product.find_all("a")[0]['href']

            if category == "cpu" and sorter == "amd":
                generation = ""

                if name.startswith("AMD Ryzen"):
                    split = name.split(" ")
                    generation = "R" + (split[3] if split[3] != "PRO" else split[4])[0]

                    if "G" in split[3] and (split[3][0] == "3" or split[3][0] == "2"):
                        generation += "G"

                elif name.startswith("AMD A"):
                    generation = "A"

                info.update({"generation": generation})

            if category == "ram":
                info.update({"ddr5": sorter=="ddr5"})

            if category == "cooler":
                info.update({"type": sorter})

            if category == "fan":
                info.update({"size": sorter})

            for spec in specs:
                if spec.startswith("Socket"):
                    if len(spec.split(" ")) > 1:
                        socket = spec.split(" ")[1]
                        info.update({"socket": socket})
                    else:
                        socket = spec.replace("Socket", '')
                        info.update({"socket": socket})
                
                elif spec.startswith("Frecuencia"):
                    if category != "ram":
                        info.update({"speed": spec.replace("Frecuencia", '').replace(" MHz", '')})
                    else:
                        info.update({"speed": int(spec.replace("Frecuencia", '').replace(" MHz", ''))})
                
                elif spec.startswith("Capacidad"):
                    if category != "ram":
                        split = spec.replace("Capacidad", '').split(' ')
                        if split[1] == "GB":
                            info.update({"capacity": int(split[0])})
                        else:
                            info.update({"capacity": int(split[0]) * 1000})
                    else:
                        split = spec.replace("Capacidad", '').split(' ')
                        info.update({"capacity": int(split[2])})
                        info.update({"dims": int(split[0])})

                elif spec.startswith("Bus"):
                    text = spec.replace("Bus", '')
                    if category != "ssd":
                        info.update({"bus": text})
                    else:
                        split = text.split(' ')
                        if split[0] == "SATA":
                            info.update({"bus": split[0]+" "+split[1]})
                        else:
                            info.update({"bus": text})
                
                elif spec.startswith("Potencia"):
                    info.update({"power": spec.replace("Potencia", '').replace(" W", '')})
                
                elif spec.startswith("Certificación"):
                    info.update({"certification": spec.replace("Certificación", '')})
                
                elif spec.startswith("Chipset"):
                    info.update({"chipset": re.sub(r"\([^)]*\)|\[[^]]*\]", '', spec.replace("Chipset", '').replace("Intel", '').replace("AMD", '').replace(" ", '').lower())})
                
                elif spec.startswith("Memorias"):
                    split = spec.replace("Memorias", '').split(' ')
                    info.update({"memoryslots": int(split[0].replace("x",''))})
                    info.update({"ddr5": split[1] == "DDR5"})

                elif spec.startswith("Memoria"):
                    split = re.sub(r"\([^)]*\)|\[[^]]*\]", '', spec.replace("Memoria", '')).strip().split(" ")
                    info.update({"vram": int(split[0])})
                
                elif spec.startswith("Formato"):
                    if category != "ssd":
                        info.update({"format": spec.replace("Formato", '')})
                    else:
                        split = spec.replace("Formato", '').split(' ')
                        info.update({"format": split[0]})
                
                elif spec.startswith("Altura"):
                    info.update({"size": spec.replace("Altura", '')})

                elif spec.startswith("Iluminación"):
                    info.update({"lighting": spec.replace("Iluminación", '') != "No"})

                elif spec.startswith("Panel lateral"):
                    info.update({"panel": spec.replace("Panel lateral", '')})
                
                elif spec.startswith("Ventiladores incluidos"):
                    split = specs[specs.index(spec)+1].replace("\t ", '').strip().split(' ')
                    if split[0] == "No":
                        info.update({"includedfans": 0})
                    else:
                        info.update({"includedfans": int(split[0])})

                elif spec.startswith("Arquitectura") and sorter == "intel":
                    split = spec.replace("Arquitectura", '').split(' ')
                    info.update({"generation": split[1].upper()})

            if category == "cpu" or category == "gpu":
                products.append({"name": name, "price": price, "info": info, "link": link, "category": category, "score": 0})
            else :
                products.append({"name": name, "price": price, "info": info, "link": link, "category": category})
    
    return products
