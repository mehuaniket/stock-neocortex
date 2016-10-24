import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web

import socket
import time
import json
import os

from bson import BSON
from bson import json_util
from bson.json_util import dumps


import pymongo
from pymongo import MongoClient
from mongofun import MongoFun
from bson.objectid import ObjectId

import thread
import time
clients=[]
eventinject={}

'''
This is a file that handle is main in IOT communicate project
'''
mongo=MongoFun()
class BaseHandler(tornado.web.RequestHandler):
    """base handler no more use than fetch current user"""
    def set_default_headers(self):
        print "setting headers!!!"
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def options(self):
        # no body
        self.set_status(204)
        self.finish()
    def get_current_user(self):
        return self.get_secure_cookie("user")

class LogoutHandler(BaseHandler):
    '''for logout'''
    def get(self):
        self.clear_cookie("user")
        self.redirect("/login")

class LoginHandler(BaseHandler):
    '''login handler'''

    def get(self):
        if self.current_user:
            self.redirect("/")
            return
        self.render("login.html")

    def post(self):
        global mongo
        self.uname=self.get_argument('uname',True)
        self.pword=self.get_argument('pword',True)
        print "[notify]login from",self.uname
        id=str(mongo.verifyUser(self.uname,self.pword))
        print "[info]user loggedin",id

        if id is not "nid":
            self.set_secure_cookie("user",id)
            self.redirect("/")
        else:
            self.redirect("/login")


class  signUpHandler(tornado.web.RequestHandler):


    def get(self):
        self.render('signup.html')

    def post(self):
        global mongo
        self.name=self.get_argument('name',True)
        self.email=self.get_argument('email',True)
        self.pword=self.get_argument('pword',True)
        userData={"name":self.name,"email":self.email,"pass":self.pword,"devices":[]}
        mongo.addUser(userData)
        self.redirect("/login")

class  HomeHandler(BaseHandler):

    @tornado.web.authenticated
    def get(self):
        self.render('home.html')

class MainHandler(BaseHandler):
    '''main handler check cookie if not valid than redirect to login'''
    @tornado.web.authenticated
    def get(self):
        if not self.current_user:
            self.redirect("/login")
            return
        self.redirect('/home')

class LatestNewsHandler(BaseHandler):
    def get(self,news_value):
        value=int(news_value)
        client=MongoClient('localhost',27017)
        db=client.neocortex
        news=db.moneystocknews.find({},{"title":1,"url":1,"newsdesc":1,"date":1}).limit(value)
        self.write(dumps(news))




settings = {
"template_path": os.path.join(os.path.dirname(__file__), "templates"),
"static_path":os.path.join(os.path.dirname(__file__), "static"),
"cookie_secret": "djbffdjgbkfdjsbgrkgkjtbrgbbfiurbt",
"xsrf_cookies": False,
"login_url": "/login",
"debug":True
}

application = tornado.web.Application(handlers=[
    (r'/(favicon.ico)', tornado.web.StaticFileHandler, {"path": ""}),
    (r'/home',HomeHandler),
    (r'/',MainHandler),
    (r'/login',LoginHandler),
    (r'/logout', LogoutHandler),
    (r'/signup', signUpHandler),
     (r"/news/([0-9]+)", LatestNewsHandler),
],**settings)

if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8080)
    myIP = socket.gethostbyname(socket.gethostname())
    print '*** Websocket Server Started at %s***' % myIP
    tornado.ioloop.IOLoop.instance().start()
