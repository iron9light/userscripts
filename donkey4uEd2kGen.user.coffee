###
# ==UserScript==
# @name       donkey4u ed2k generator
# @namespace  https://github.com/iron9light
# @version    0.1
# @author     iron9light
# @description  Generate ed2k for donkey4u detail page
# @match      http://donkey4u.com/detail/*
# @copyright  2014+, You
# ==/UserScript==
###


namePattern = /文件名:\s*(.+)/
sizePattern = /大小:.+\(\s*(\d+).*/
hashPattern = /Hash:\s*(\w+)/

elem = $('body > div:nth-of-type(2)').contents()

strings = (s.data.trim() for s in elem when s.nodeType is 3 and s.data.trim())

getVal = (pattern) -> (pattern.exec(s)[1].trim() for s in strings when pattern.test(s))[0]

name = getVal namePattern
size = getVal sizePattern
hash = getVal hashPattern

linkText = """ed2k://|file|#{name}|#{size}|#{hash}|/"""
link = """ed2k://|file|#{encodeURIComponent(name)}|#{size}|#{hash}|/"""

elem.filter('br').eq(1).after """<a href="#{link}">#{linkText}</a><br>"""
