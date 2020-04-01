from flask import Flask
import os
import xml.etree.ElementTree as ET
from flask import request

app = Flask(__name__)


@app.route("/")
def cmdRun():
    filename = r'C:\Users\Richard\Documents\DissertationRepo\DissertationRepo\src\scraperConfig\depopConfig.xml'
    tree = ET.parse(filename)
    root = tree.getroot()
    url = root.find('StartURL').find('url')
    text = request.args.get('url')
    url.text = text
    print(text)
    filename = ""+filename
    print(filename)
    print(tree)
    tree.write(filename)

    cmd = r"C:\Users\Richard\AppData\Roaming\SysNucleus\WebHarvy\WebHarvy.exe C:\Users\Richard\Documents\DissertationRepo\DissertationRepo\src\scraperConfig\depopConfig.xml 1  C:\Users\Richard\Documents\DissertationRepo\DissertationRepo\src\data\data.json overwrite"
    os.system(cmd)

    return "os System Run"
