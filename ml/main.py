from flask import Flask,render_template,request,url_for

import pandas as pd
import numpy as np 




from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

app = Flask(__name__)

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/",methods=['POST'])
def predict():


	df = pd.read_csv('yorumlar.csv', encoding ='iso-8859-9', sep='|')
	df_data = df[["COMMENT","CLASS"]]
	
	df_x = df_data['COMMENT']
	df_y = df_data.CLASS
   
	corpus = df_x
	cv = CountVectorizer()
	X = cv.fit_transform(corpus)
	from sklearn.model_selection import train_test_split
	X_train, X_test, y_train, y_test = train_test_split(X, df_y, test_size=0.10, random_state=0)
	
	from sklearn.naive_bayes import MultinomialNB
	clf = MultinomialNB()
	clf.fit(X_train,y_train)
	clf.score(X_test,y_test)

	y_pred = clf.predict(X_test)
	from sklearn.metrics import accuracy_score
	acc=accuracy_score(y_test, y_pred)
	print("ACC",acc)


	

	if request.method == 'POST':
		comment = request.form['comment']
		data = [comment]
		vect = cv.transform(data).toarray()
		my_prediction = clf.predict(vect)
	return render_template('results.html',prediction = my_prediction,comment = comment)

	

if __name__ == '__main__':
	app.run(host="127.0.0.1",port=8080,debug=True)