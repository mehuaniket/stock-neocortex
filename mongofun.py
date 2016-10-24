import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId

import json
import random
import string

class MongoFun:

    def __init__(self):
        """this function making connection to database"""

        try:
            self.conn = MongoClient('mongodb://localhost:27017/')
        except ConnectionFailure,e:
            sys.stderr.write("could not connect to MongoDb:%s"%e)
            sys.exit(1)
        self.db = self.conn['neocortex']


    def FetchDbNames(self):
        """this function giving you all database name"""

        return self.conn.database_names()

    def SwitchDb(self,database):
        """this function is switching connection of database one-to other"""

        self.db=self.conn[database]
        print "you are currently on ",database

    def GetCollection(self):
        """this database give you database collection names and that is really important"""

        return self.db.collection_names()

    def addUser(self,userData):
        """this function is used when we have to insert new user"""

	self.db['users'].insert(userData,safe=True)
        print "user is successfully inserted"


    def verifyUser(self,uname,pword):
        """ verify thae user with two parameter 1.username 2.password
        and if password is correct for username than return id if wrong retrun 0"""

        userinfo=self.db['users'].find({"email":uname})
        for document in userinfo:
            if document['email']==uname and document['pass']==pword:
                return document['_id']
            else:
                return "nid"






if __name__ == '__main__':
    """this is for testing function and all 'coz i hate unit testing """
    #test class __init__
    mongofun=MongoFun()

    #test FetchDbNames function
    print mongofun.FetchDbNames()

    #test GetCollection function
    print mongofun.GetCollection()

    #test add user in users database
    userData={ "name":"aniket patel",
              "email":"patelaniket165@gmail.com",
              "password":"!!@@##apAP90",
              "devices":[]
             }
    mongofun.addUser(userData)

    #test addDevice Function that add new device in users after
