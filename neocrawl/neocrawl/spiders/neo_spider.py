from scrapy import Spider
from scrapy.selector import Selector

from neocrawl.items import NeocrawlItem

class MoneynewsSpider(Spider):
    name = "moneynews"
    allowed_domains = ["moneycontrol.com"]
    start_urls = [
        "http://www.moneycontrol.com/news/economy/rbi-to-infuse-rs-10k-cr-via-bond-purchasethursday_7414841.html",
    ]
    def parse(self,response):
        item=NeocrawlItem()
        item['title']=Selector(response).xpath('//*[@id="mc_content"]/section/section/div[1]/div/h1//text()').extract()
        item['url']=response.url
        item['date']=Selector(response).xpath('//*[@id="mc_content"]/section/section/div[1]/div/p[1]//text()').extract()
        item['meta']=Selector(response).xpath('//*[@id="mc_content"]/section/section/div[1]/div/p[2]//text()').extract()
        item['newsdesc']=Selector(response).xpath('//*[@id="mc_content"]/section/section/div[1]/div/div[4]/div[1]//text()').extract()
        yield item