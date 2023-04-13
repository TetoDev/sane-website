import requests
from bs4 import BeautifulSoup

def scrape_items(page: BeautifulSoup, component: str):
    components = []
    chart = page.find("ul", class_="chartlist")

    for item in chart.find_all("li"):
        name = item.find("span", class_="prdname").text
        if component == "cpu":
            if ("Xeon" in name) or ("Opteron" in name) or ("Threadripper" in name) or ("EPYC" in name) or ("ARM" in name) or ("Snapdragon" in name) or ("Mediatek" in name) or ("Embedded" in name) or ("Hygon" in name) or (not "intel" in name.lower() and not "amd" in name.lower()):
                continue
        elif component == "gpu":
            if ("Vega" in name) or ("TITAN" in name) or ("Tesla" in name) or ("Quadro" in name) or ("Max-Q" in name) or ("Mobile" in name) or ("Ryzen" in name) or ("Arc" in name) or ("Intel" in name) or ("GRID" in name) or ("FirePro" in name) or ("laptop" in name.lower()):
                continue
        score = item.find("span", class_="count").text
        score = score.replace(",", "").replace(".", "")
        score = int(score)
        components.append({"name": name, "score": score})

    return components

def get_rankings(component: str):
    pages = []
    if component == "cpu":
        pages = [requests.get("https://www.cpubenchmark.net/high_end_cpus.html").content,requests.get("https://www.cpubenchmark.net/mid_range_cpus.html").content,requests.get("https://www.cpubenchmark.net/midlow_range_cpus.html").content,requests.get("https://www.cpubenchmark.net/low_end_cpus.html").content]
    elif component == "gpu":
        pages = [requests.get("https://www.videocardbenchmark.net/high_end_gpus.html").content,requests.get("https://www.videocardbenchmark.net/mid_range_gpus.html").content,requests.get("https://www.videocardbenchmark.net/midlow_range_gpus.html").content,requests.get("https://www.videocardbenchmark.net/low_end_gpus.html").content]
    
    components = []
    for page in pages:
        soup = BeautifulSoup(page, "html.parser")
        components.append(scrape_items(soup, component))
    
    return components


get_rankings("cpu")
