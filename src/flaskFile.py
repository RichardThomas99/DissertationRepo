from flask import Flask
from flask import request
import os
import xml.etree.ElementTree as ET
app = Flask(__name__)

#Accepts any XMLHttpRequest
@app.route("/")
def cmdRun():
    #File name of the scrape configuration
    filename = r'C:\Users\Richard\Documents\DissertationRepo\DissertationRepo\src\scraperConfig\depopConfig.xml'
    #Parses xml file to a tree format
    tree = ET.parse(filename)

    #Locates the url tag in the document
    root = tree.getroot()
    url = root.find('StartURL').find('url')

    #Gets the text from the XMLHttpRequest
    text = request.args.get('url')

    #Sets the text of the xml file to the new search name
    url.text = text

    #Overwrites old xml file
    filename = ""+filename
    tree.write(filename)

    cmd = r"C:\Users\Richard\AppData\Roaming\SysNucleus\WebHarvy\WebHarvy.exe C:\Users\Richard\Documents\DissertationRepo\DissertationRepo\src\scraperConfig\depopConfig.xml 1 C:\Users\Richard\Documents\DissertationRepo\DissertationRepo\src\data\data.json overwrite"
    os.system(cmd)

    return "os System Run"
