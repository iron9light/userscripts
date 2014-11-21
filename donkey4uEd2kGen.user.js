/*
 * ==UserScript==
 * @name       donkey4u ed2k generator
 * @namespace  https://github.com/iron9light
 * @version    0.1
 * @author     iron9light
 * @description  Generate ed2k for donkey4u detail page
 * @match      http://donkey4u.com/detail/*
 * @copyright  2014+, You
 * ==/UserScript==
 */
var elem, getVal, hash, hashPattern, link, linkText, name, namePattern, s, size, sizePattern, strings;

namePattern = /文件名:\s*(.+)/;

sizePattern = /大小:.+\(\s*(\d+).*/;

hashPattern = /Hash:\s*(\w+)/;

elem = $('body > div:nth-of-type(2)').contents();

strings = (function() {
  var _i, _len, _results;
  _results = [];
  for (_i = 0, _len = elem.length; _i < _len; _i++) {
    s = elem[_i];
    if (s.nodeType === 3 && s.data.trim()) {
      _results.push(s.data.trim());
    }
  }
  return _results;
})();

getVal = function(pattern) {
  return ((function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = strings.length; _i < _len; _i++) {
      s = strings[_i];
      if (pattern.test(s)) {
        _results.push(pattern.exec(s)[1].trim());
      }
    }
    return _results;
  })())[0];
};

name = getVal(namePattern);

size = getVal(sizePattern);

hash = getVal(hashPattern);

linkText = "ed2k://|file|" + name + "|" + size + "|" + hash + "|/";

link = "ed2k://|file|" + (encodeURIComponent(name)) + "|" + size + "|" + hash + "|/";

elem.filter('br').eq(1).after("<a href=\"" + link + "\">" + linkText + "</a><br>");
