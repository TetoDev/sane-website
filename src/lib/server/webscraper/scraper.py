import requests
from bs4 import BeautifulSoup
import re


def getPage(category, sorter, page):
        
    if category == "cpu":
        sub_url = "brands=106382" if sorter == "intel" else "brands=106379"
        url = f"https://www.solotodo.cl/processors?{sub_url}&page={page}"
            
        
    elif category == "graphicCards":
        sub_url = "gpu_families=106058" if sorter == "nvidia" else "gpu_families=106049"
        url = f"https://www.solotodo.cl/video_cards?{sub_url}&page={page}"

    elif category == "ram":
        sub_url = "types=130774&formats=130758" if sorter == "ddr4" else "types=1490246&formats=130758"
        url = f"https://www.solotodo.cl/rams?{sub_url}&page={page}"
        
    elif category == "psu":
        url = f"https://www.solotodo.cl/power_supplies?certification_start=247992&page={page}"
        
    elif category == "coolers":
        sub_url = "types=276479" if sorter == "air" else "types=276488"
        url = f"https://www.solotodo.cl/cpu_coolers?{sub_url}&page={page}"
        
    elif category == "towers":
        sub_url = "motherboard_formats=251395" if sorter == "mitx" else ("motherboard_formats=251385" if sorter == "matx" else "motherboard_formats=251389")
        url = f"https://www.solotodo.cl/computer_cases?{sub_url}&page={page}"
        
    elif category == "motherboards":
        sub_url = "sockets=1153273" if sorter == "1200" else ("sockets=1490218" if sorter == "1700" else ("sockets=593822" if sorter == "am4" else "sockets=1646832"))
        url = f"https://www.solotodo.cl/motherboards?{sub_url}&page={page}"
        
    elif category == "fans":
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

def getProducts (category, sorter, page):
    webpage = getPage(category, sorter, page)
    products = []
    for product in webpage.find_all("button", class_="MuiButtonBase-root"): 
        if '$' in product.text:
            
        
            specs = product.text.split("\n")
            first_line = specs[0].split("$")
        
            name = re.sub(r"\([^)]*\)|\[[^]]*\]",'',first_line[0]).replace("Desktop",'').replace("RGB Programable (ARGB / 3-pin / 5V)",'').strip()
            price = first_line[1].replace(".","")
            info = {}
            link = "https://www.solotodo.cl" + product.find_all("a")[0]['href']

            for spec in specs:
                if spec.startswith("Socket"):
                    if len(spec.split(" ")) > 1:
                        info.update({"socket":spec.split(" ")[1]})
                    else :
                        info.update({"socket":spec.replace("Socket", '')})
                
                elif spec.startswith("Frecuencia"):
                    info.update({"frequency":spec.replace("Frecuencia",'')})
                
                elif spec.startswith("Capacidad"):
                    info.update({"capacity":spec.replace("Capacidad",'')})

                elif spec.startswith("Bus"):
                    info.update({"bus":spec.replace("Bus",'')})\
                
                elif spec.startswith("Memoria"):
                    info.update({"vram":re.sub(r"\([^)]*\)|\[[^]]*\]",'',spec.replace("Memoria",''))})
                
                elif spec.startswith("Potencia"):
                    info.update({"power":spec.replace("Potencia",'')})
                
                elif spec.startswith("Certificación"):
                    info.update({"certification":spec.replace("Certificación",'')})
                
                elif spec.startswith("Chipset"):
                    info.update({"chipset":re.sub(r"\([^)]*\)|\[[^]]*\]",'',spec.replace("Chipset",''))})
                
                elif spec.startswith("Memorias"):
                    info.update({"memorySlots":spec.replace("Memorias",'')})
                
                elif spec.startswith("Formato"):
                    info.update({"format":spec.replace("Formato",'')})
                
                elif spec.startswith("Altura"):
                    info.update({"height":spec.replace("Altura",'')})

                elif spec.startswith("Iluminación"):
                    info.update({"lighting":spec.replace("Iluminación",'')})

                elif spec.startswith("Panel lateral"):
                    info.update({"panel":spec.replace("Panel lateral",'')})
                
                elif spec.startswith("Ventiladores incluidos"):
                    info.update({"includedFans":specs[specs.index(spec)+1].replace("\t ",'')})


            products.append({"name":name,"price":price,"info":info,"link":link})
    
    

    return products
        
                
            

        