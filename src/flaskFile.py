from flask import Flask
import os
app = Flask(__name__)


@app.route("/")
def osStuff():
    cmd = 'date'
    os.system(cmd)

    return "os System Run"
