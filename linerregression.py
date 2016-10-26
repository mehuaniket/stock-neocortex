import pandas as pd
import quandl, math, datetime
import numpy as np
from sklearn import preprocessing, cross_validation, svm
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from matplotlib import style
import pickle
import time

import pymongo
from pymongo import MongoClient

client=MongoClient('localhost',27017)
db=client.neocortex

nifty=db.nifty.find({},{"_id":0})
quandl.ApiConfig.api_key = 'agh3EisozxmzwjdutDMA'
for st in nifty:
    df = quandl.get('NSE/'+st['symbol'])
    df = df[['Open', 'High', 'Low', 'Close', 'Total Trade Quantity',]]
    df['HL_PCT'] = (df['High'] - df['Close']) / df['Close'] * 100.0
    df['PCT_change'] = (df['Close'] - df['Open']) / df['Open'] * 100.0

    df=df[['Close','HL_PCT','PCT_change','Total Trade Quantity']]

    forecast_col='Close'
    df.fillna(-99999, inplace=True)
    forecast_out=int(math.ceil(0.1*len(df)))
    df['label']=df[forecast_col].shift(-forecast_out)

    X=np.array(df.drop(['label'],1))
    X=preprocessing.scale(X)
    X_lately=X[-forecast_out:]
    X=X[:-forecast_out]


    df.dropna(inplace=True)
    y=np.array(df['label'])

    X_train, X_test, y_train, y_test=cross_validation.train_test_split(X, y, test_size=0.2)

    clf=LinearRegression()
    clf.fit(X_train, y_train)
    with open('linearregression.pickle','wb') as f:
        pickle.dump(clf, f)

    pickle_in=open('linearregression.pickle','rb')
    clf=pickle.load(pickle_in)

    accuracy=clf.score(X_test, y_test)
    print(accuracy)
    forecast_set=clf.predict(X_lately)
    print(forecast_set, accuracy, forecast_out)
    db.predicate.insert({st["symbol"]:[forecast_set.tolist(), accuracy, forecast_out]})
    df['Forecast']=np.nan

    last_date=df.iloc[-1].name
    #last_unix=last_date.timestamp()
    last_unix = time.mktime(datetime.date(last_date.year, last_date.month, last_date.day).timetuple())
    one_day=86400
    next_unix=last_unix+one_day

    # for i in forecast_set:
    #     next_date=datetime.datetime.fromtimestamp(next_unix)
    #     next_unix+=one_day
    #     df.loc[next_date]=[np.nan for _ in range(len(df.columns)-1)]+[i]
