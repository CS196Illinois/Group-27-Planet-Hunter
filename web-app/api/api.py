
from flask import Flask
from flask import request
import time
import random
import json

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/light-flux-values')
def get_light_flux_values():
    return {'values': [random.randint(-5000, 5000) for i in range(1598)]}

@app.route('/model', methods=['POST'])
def model():
    # values = request.data
    # model = tensorflow.keras.models.load_model("./model/functional_exo_model")
    # pred = model.predict(values)
    data_raw = str(request.get_data())

    data_unprocessed = data_raw[2:len(data_raw) - 1]

    data = json.loads(data_unprocessed)
    return {"value": data["flux_values"]}
