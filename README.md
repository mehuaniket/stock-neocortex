### Overview
 
 - This project is a 7th-semester assignment that aims to crawl news websites and analyze news events and stock prices. Due to time constraints, I could only complete some of the planned objectives.

- The project can crawl any news website if you provide the xpath for 5 essential elements (Title, description, author, etc.).

- The project displays a graph with news events plotted on it.

- It uses a linear regression model to predict future prices. The prices are obtained from quandl servers.

### Setup
- Install scrapy, tornado, pymongo, and mongodb.
- You will need to import json files to mongodb (you can find instructions on stackoverflow).
- You can use the following command to start the server.
```
python cortexserver.py
```

- You will also need to start the search server. Make sure that you have nodejs and the required packages installed.
```
nodejs searchserver.js
```

- Start news crawling.
```
scrapy crawl moneynewscrawler
```

For any queries, email me at patelaniket165@gmail.com
