#### <b>INTRODUCTION</b>

  - This is 7th semester project. There are many things still need to be done but not having much time I only able finish some of goals I had.
  - Project can crawl news website.You can add any website to crawl, you will just need to provide xpath for 5 important things. (Title, description, author etc).
  - Project shows graph with news events mapped on it.
  - It does linear rigression module to predict future prices. prices are being fetched from quandl servers.


### installation

- Install scrapy framework.
- Install tornado framework.
- Install pymongo and mongodb.
- You will need to import json files to mongodb(you can check it on stackoverflow).
- Following is a command to start the server.

```cmd
python cortexserver.py
```

- You will also need to start the search server.Make sure that you have nodejs and depedency packages already installed.

```cmd
nodejs searchserver.js

```
- Start news crawling.

```cmd
scrapy crawl moneynewscrawler
```
- contact me:patelaniket165@gmail.com
