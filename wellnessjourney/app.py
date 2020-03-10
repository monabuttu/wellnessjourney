# import flask class
from flask import Flask,render_template, redirect, request, jsonify
from flask_pymongo import PyMongo
from textblob import TextBlob
from textblob.classifiers import NaiveBayesClassifier
from datetime import datetime
# from bson import binary,code

# create instance of flask class
app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/quotes")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/log")
def log():
    return render_template("log.html")

@app.route("/videos")
def videos():
    return render_template("videos.html")

@app.route("/quotes",methods=['POST','GET'])
def quotes():
    if request.method == 'POST':
        # save users input
        affirmation = request.form['affirmation']
        quote = request.form['quote']
        thought = request.form['thought']
        date = datetime.now()
        print(affirmation)
        print(quote)
        print(thought)
    # Update the Mongo database 
        mongo.db.quotes.insert({
            "affirmation": affirmation,
            "quote": quote,
            "thought": thought,
            "date": date
            })
    return render_template("quotes.html")

@app.route("/faith")
def faith():
    return render_template("faith.html")

@app.route("/analysis")
def analysis():
    return render_template("analysis.html")

@app.route("/entrysubmitted", methods=["GET","POST"])
def entry():
    if request.method == "POST":
        entry_date = request.form["entrydate"]

    print(entry_date)    
    return render_template("entry.html")

@app.route("/api/yourquotes")
def yourquotes():
    query = mongo.db.quotes.find()
    query_list=[]
    for x in query:
        query_dict={}
        query_dict['affirmation'] = x['affirmation']
        query_dict['quote'] = x['quote']
        query_dict['thought'] = x['thought']
        try:
            query_dict['date'] = x['date']
        except:
            query_dict['date'] = ''
        query_list.append(query_dict)
    return jsonify(query_list)
    
if __name__ == "__main__":
    app.run(debug=True)