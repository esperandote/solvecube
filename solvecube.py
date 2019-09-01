
#encoding:utf-8

import cube
import main

from flask import Flask,jsonify,render_template,request
app=Flask(__name__)

@app.route('/_solve')
def solve():
	state=request.args.get('state', 0, type=str)
	result=main.solve((cube.convert(state)))
	return jsonify(result=result)

@app.route("/",methods=["get","post"])
def root():
	return render_template("solvecube.html")

@app.route("/helppage/",methods=["get","post"])
def helppage():
    return render_template("helppage.html")

@app.route("/sitemap/",methods=["get","post"])
def sitemap():
    return render_template("sitemap.xml")

if(__name__=="__main__"):
	app.run(host='0.0.0.0',port=80)
