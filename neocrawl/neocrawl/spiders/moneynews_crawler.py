# -*- coding: utf-8 -*-
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from neocrawl.items import NeocrawlItem
from scrapy.selector import Selector
import articleDateExtractor
from goose import Goose
import nltk
class MoneynewsCrawlerSpider(CrawlSpider):
    name = 'moneynews_crawler'
    allowed_domains = ['moneycontrol.com']
    start_urls = ['http://www.moneycontrol.com/news/']
    nltk.download('punkt')
    rules = [
        Rule(LinkExtractor(allow=["/news/", "/stocks/"]), callback='parse_item', follow=True),
    ]

    def parse_item(self, response):
        try:
            g=Goose()
            article=g.extract(raw_html=response.body)
            item=NeocrawlItem()
            item['totalnews']=response.body
            item['title']=article.title
            item['url']=response.url
            item['date']=articleDateExtractor.extractArticlePublishedDate(response.body)
            item['meta']=article.meta_description
            item['newsdesc']=article.cleaned_text
            item['tokens']=nltk.word_tokenize(article.cleaned_text)
            yield item
        except Exception:
            pass
