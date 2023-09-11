import os
import pymongo

dbhost = os.environ.get("MONGOHOST")
dbname = os.environ.get("MONGODATABASE")
dbuser = os.environ.get("MONGOUSER")
dbpass = os.environ.get("MONGOPASSWORD")
mongo_string = f"mongodb://{dbuser}:{dbpass}@{dbhost}"

client = pymongo.MongoClient(mongo_string)
