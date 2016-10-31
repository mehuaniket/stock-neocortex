#### <b>INTRODUCTION</b>
- this is my sem7 mini project.i think in this project has still many things to do but as not having much time i only able finish some of goals.
  - project is able to do crawl website.(you can use any website but need to add crawler that save things in database as defined structure)
  - project shows graph with news event.
  - and also have future prediction algorithm that working on linear regression.


### installation

- To install this project you need scrapy framework.
- also project use tornado framework so you also need to install that.
- project is using mongodb so you need to install pymongo and mongodb server with apt-get.
- after doing that you need to import json project files with command(you can check it on stackoverflow).
- you need to make sure users collection in neocortex db.also make sure that you import in neocortex named db.
- to start server type following command in neointerface dir.

```cmd
python cortexserver.py
```

- then start search server.(make sure that you have nodejs and depedency package installed).

```cmd
nodejs searchserver.js

```
- to start newscrawler.run following command.(in neocrawl dir)

```cmd
scrapy crawl moneynewscrawler
```

- to understand this project structure in more detail.
- contact me:patelaniket165@gmail.com
