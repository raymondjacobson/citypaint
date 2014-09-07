from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash, _app_ctx_stack
from flask.ext.triangle import Triangle
from twilio.rest import TwilioRestClient
import twilio.twiml
from firebase import firebase
import gen
import numpy as np

firebase = firebase.FirebaseApplication('https://sentencesoup.firebaseio.com', None)

account_sid = "ACec64a5b0feb7121fd6a33718d1fc4390"
auth_token = "0a4ecac03a0cb832a0cbfd221c329b20"
client = TwilioRestClient(account_sid, auth_token)


app = Flask(__name__, static_path='/static')
Triangle(app)

@app.route("/")
def index():
  return_vals = {
    'title': 'Pivot'
  }
  return render_template('index.html', return_vals=return_vals)

@app.route("/twil", methods=['GET', 'POST'])
def twil():
  phone_num = request.values.get('From', None)
  word = request.values.get('Body', None)
  shape_id = 0
  result = firebase.get('/texts/' +phone_num, None)
  if result is not None:
    shape_id = len(result)
  for coord in gen.getCoords(word):
    rando = np.random.random_sample();
    coordz = coord + (rando,)
    result = firebase.post('/texts/'+phone_num+"/"+str(shape_id), {'coord': coordz})
  return "OK"

if __name__ == "__main__":
    app.run()