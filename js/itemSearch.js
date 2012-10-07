////////////////////////////////////////////////////////////////////////
// Rakuten API ItemSearch
// Update: 2012/10/07 11:30 << tuki0918
////////////////////////////////////////////////////////////////////////

function ItemSearch(id, options) {
  // Element ID Name
  this.elementId = id;
  // Default Options
  this.option = { keyword: '送料無料', page: 1, hits: 10, sort: '%2DreviewCount', affiliateId: '0de0ff0b.0791e09a.0de0ff0c.ba95632c' };
  // Array applicationId / developerId
  this.applicationId = [
    '4157e4f27453c452f3d6c7aa17365633'
  ];
  // Option Overwrite
  this.setOptions(options);
}

ItemSearch.prototype = {

  // Use ID
  id: function () {
    return this.applicationId[Math.floor(Math.random() * this.applicationId.length)];
  },

  // API URL Generater
  generateURL: function (options, version) {
    var url, key;

    if (version === 1) {
    // Rakuten API ItemSearch v1 URL
      url = 'http://api.rakuten.co.jp/rws/3.0/json?operation=ItemSearch&version=2010-09-15&callBack=?';
      url += '&developerId=' + this.id();
    } else {
    // Rakuten API ItemSearch v2 URL
      url = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20120723?format=json';
      url += '&applicationId=' + this.id();
    }

    for (key in options) {
      // Skip => '' and 'undefined'
      if (options[key] === '' || typeof options[key] === 'undefined') continue;
      // URL Encode
      if (key === 'keyword' || key === 'NGKeyword') {
        url += '&' + key + '=' + encodeURIComponent(options[key]);
      } else {
        url += '&' + key + '=' + options[key];
      }
    }

    return url;
  },

  // Option Overwrite
  setOptions: function (options) {
    this.option = $.extend(this.option, options);
  },

  // Get Item DATA
  getItems: function (test, version) {
    var self = this, url;
    url = self.generateURL(self.option, version);
    $.getJSON(url, function (data) {
      if (test === 'test' && version === 1) {
        // Rakuten API ItemSearch v1 TEST
        self.viewTest1(data);
      } else if (test === 'test') {
        // Rakuten API ItemSearch v2 TEST
        self.viewTest(data);
      } else {
        // User Custom HTML
        self.customHTML(data);
      }

    });
  },

  // User Customize HTML
  customHTML: function (data) {
    // Please be defined later
  },

  // View TEST => Rakuten API ItemSearch v2
  viewTest: function (data) {
    var items = data.Items, html, item, i, j;

    html = '<ul>';
    for (i = 0, j = items.length; i < j; i++) {
      item = items[i].Item;

      html += '<li>';
      html += '<a href="' + item.affiliateUrl + '" title="' + item.itemName + '"">';
      html += '<img src="' + item.mediumImageUrls[0].imageUrl + '">';
      html += '</a>';
      html += ' 感想：' + item.reviewCount + '件';
      html += ' 価格：' + item.itemPrice + '円';
      html += '</li>';

    }
    html += '</ul>';

    $('#' + this.elementId).html(html);
  },

  // View TEST => Rakuten API ItemSearch v1
  viewTest1: function (data) {
    var items = data.Body.ItemSearch.Items.Item, html, item, i, j;

    html = '<ul>';
    for (i = 0, j = items.length; i < j; i++) {
      item = items[i];

      html += '<li>';
      html += '<a href="' + item.itemUrl + '" title="' + item.itemName + '"">';
      html += '<img src="' + item.mediumImageUrl + '">';
      html += '</a>';
      html += ' 感想：' + item.reviewCount + '件';
      html += ' 価格：' + item.itemPrice + '円';
      html += '</li>';

    }
    html += '</ul>';

    $('#' + this.elementId).html(html);
  }

};