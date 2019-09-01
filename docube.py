
#encoding:utf-8

import cube

from flask import Flask,render_template,request
app=Flask(__name__)

@app.route("/")
def root():
	return render_template("docube.html",statestr='')

@app.route("/docube/",methods=["get","post"])
def docube():
	a=request.form["operation"]
	state=[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	cube.do(state,a)
	statestr=''
	for i in state:
		statestr+=str(i)+' '
	return render_template("docube.html",statestr=statestr)

if(__name__=="__main__"):
	app.run()

	
	
