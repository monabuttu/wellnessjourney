# import flask class
from flask import Flask,render_template, redirect, request, jsonify, session
from flask_pymongo import PyMongo
from textblob import TextBlob
from textblob.classifiers import NaiveBayesClassifier
from datetime import datetime
from .config import api_key
from eng import isEnglish
from apiclient.discovery import build
import bcrypt
import nltk
nltk.download('punkt')

# create instance of flask class
app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://heroku_5dsnbzq6:n7n5lhm2511elp2vi6ennpsqh5@ds149998.mlab.com:49998/heroku_5dsnbzq6",retryWrites=False)

date = datetime.now()
date1 = date.month,date.day,date.year
print(date1)
# print(date.month,date.day,date.year)


@app.route("/")
def home():
    if 'username' in session:
        # return 'You are logged in as ' + session['username']
        return render_template("home.html")
    return render_template("index.html")

@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users
    login_user = users.find_one({'name' : request.form['username']})
    print(login_user)

    password = login_user['password']
    hashed = bcrypt.hashpw(password, bcrypt.gensalt())
    # Check if password matches the hashed password
    if bcrypt.checkpw(password, hashed):
        session['username'] = request.form['username']
        return redirect('/')

    return 'Invalid username/password combination'

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'name' : request.form['username']})

        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            users.insert({'name' : request.form['username'], 'password' : hashpass})
            session['username'] = request.form['username']
            return redirect('/')
        
        return 'That username already exists!'

    return render_template('register.html')

@app.route('/logout', methods=['POST','GET'])
def logout():
    session.clear()
    return render_template("index.html")

@app.route("/log")
def log():
    return render_template("log.html")

@app.route("/videos",methods=['POST','GET'])
def videos():
    if request.method == 'POST':
        date = datetime.now()
        selection = request.form["selection"]
        try:
            length = request.form["length"]
        except:
            length = 'any'
        
        youtube = build('youtube','v3',developerKey=api_key)
        video_request = youtube.search().list(q=f'{selection} motivation',part='snippet',type='video',relevanceLanguage='en',
                                        videoCategoryId='27',videoDuration=length,order='viewCount', maxResults=1,
                                        regionCode='US')
        response = video_request.execute()
        for x in response['items']:
            video_id = x['id']['videoId']
            title = x['snippet']['title']
            if isEnglish(title) == True:
                mongo.db.selection.insert({
                "selection": selection,
                "video_id": video_id,
                "title":title,
                "date": date
                })

    return render_template("videos.html")

@app.route("/quotes")
def quotes():
    return render_template("quotes.html")

@app.route("/videoinputs",methods=['POST','GET'])
def videoinputs():
    if request.method == 'POST':
        if request.form['like'] == 'yes':
            # save users input
            quote = request.form['quote']
            like = request.form['like']
            l_video = request.form['l_video']
            date = datetime.now()
        # Update the Mongo database 
            mongo.db.quotes.insert({
                "quote": quote,
                "date": date
                })
            mongo.db.videos.insert({
            "video_id": l_video,
            # "title":title,
            "like": like
            })
        else:
        # save users input
            quote = request.form['quote']
            date = datetime.now()
        # Update the Mongo database 
            mongo.db.quotes.insert({
                "quote": quote,
                "date": date
                })
    return render_template("videos.html")

@app.route("/analysis", methods=["GET","POST"])
def analysis():
    if request.method == "POST":
        date = datetime.now()
        mood = request.form["mood"]
        msg = request.form["message"]
        msg1= request.form["message1"]
        msg2 = request.form["message2"]
        thought = request.form['thought']
        affirmation = request.form['affirmation']

        pos = 0
        neg = 0
        neutral = 0
        sentence = msg
        s = TextBlob(sentence)
        for x in s.sentences:
            print(x)
            print(x.sentiment.polarity)
            if x.sentiment.polarity == 0:
                print("neutral")
                neutral += 1
            elif x.sentiment.polarity > 0:
                print('positive')
                pos += 1
            else:
                print("negative")
                neg +=1

        if pos > neg:
            print('pos post')
            post = "Positive"
        elif pos == neg:
            print('neutral post')
            post = "Neutral"
        else:
            print('neg post')
            post = "Negative"
        
        mongo.db.entries.insert({
        "date": date,
        "mood": mood,
        "today": msg,
        "tomorrow": msg1,
        "gratitude": msg2,
        "post": post,
        "affirmation": affirmation,
        "thought": thought
        })
        
    return render_template("analysis.html")

@app.route("/api/yourquotes")
def yourquotes():
    query = mongo.db.quotes.find()
    query_list=[]
    for x in query:
        query_dict={}
        query_dict['quote'] = x['quote']
        try:
            query_dict['date'] = x['date']
        except:
            query_dict['date'] = ''
        query_list.append(query_dict)
    return jsonify(query_list)

@app.route("/api/yourselection")
def yourselection():
    query = mongo.db.selection.find()
    query_list=[]
    for x in query:
        query_dict={}
        query_dict['selection'] = x['selection']
        query_dict['date'] = x['date']
        query_dict['video_id']= x['video_id']
        query_dict['title']= x['title']
        query_list.append(query_dict)
    return jsonify(query_list)

@app.route("/api/yourvideos")
def yourvideos():
    query = mongo.db.videos.find()
    query_list=[]
    for x in query:
        query_dict={}
        query_dict['video_id'] = x['video_id']
        query_dict['title'] = x['title']
        query_list.append(query_dict)
    return jsonify(query_list)
    
@app.route("/api/yourentries")
def yourentries():
    query = mongo.db.entries.find()
    query_list=[]
    for x in query:
        query_dict={}
        query_dict['date'] = x['date']
        query_dict['mood'] = x['mood']
        query_dict['today'] = x['today']
        query_dict['tomorrow'] = x['tomorrow']
        query_dict['gratitude'] = x['gratitude']
        query_dict['post'] = x['post']
        query_list.append(query_dict)
    return jsonify(query_list)

if __name__ == "__main__":
    app.secret_key = 'mysecret'
    app.run(debug=True)
