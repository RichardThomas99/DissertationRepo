from flask import Flask
import os
app = Flask(__name__)


@app.route("/")
def cmdRun():

    cmd = r"C:\Users\Richard\AppData\Roaming\SysNucleus\WebHarvy\WebHarvy.exe C:\Users\Richard\Documents\DissertationRepo\DissertationRepo\src\scraperConfig\depopstars5-works.xml 1  C:\Users\Richard\Documents\DissertationRepo\DissertationRepo\src\data\data.json"
    os.system(cmd)
    return "os System Run"
