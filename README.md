楽天商品検索API 支援コード（API2 / API 対応）
======================
> Javascript / jQueryやプログラミングがよくわからない人でも比較的簡単に導入できるよう、記述をシンプルしました。  
> コードは自由に変更・修正して下さい。
　


# リファレンス
----------------
+ どんなデータが所得できるのか調べたい場合は [APIテストフォーム](https://webservice.rakuten.co.jp/explorer/api/IchibaItem/Search/) がオススメです
+ 「入力パラメーター」と「出力パラメーター」の詳しい情報は [楽天商品検索API2：API一覧](http://webservice.rakuten.co.jp/api/ichibaitemsearch/)  をご確認下さい
　


# 機能
----------------

+ リクエストURLの発行
+ パラメーターの追加 / 上書き
+ テストプレビュー
+ 表示のカスタマイズ
+ その他：現在の状態を保持しているため、特定のパラメータのみ変更や `次の30件` や `前の30件` などが容易
　

# 準備（ itemSearch.js 側 ）
----------------
### パラメーターの初期値
基本的には `既存のパラメータを上書き` しながら商品データを所得していきます。  
よく使いそうな値を `初期値` として設定しておくと全体のコードがスッキリとします。

※ 必須パラメーターに注意
設定できる値は [楽天商品検索API2：API一覧](http://webservice.rakuten.co.jp/api/ichibaitemsearch/)  をご確認下さい


▼ 初期値

    this.option = { keyword: '送料無料', page: 1, hits: 10, sort: '%2DreviewCount', affiliateId: '0de0ff0b.0791e09a.0de0ff0c.ba95632c' };

▼ 記述ルール　

    this.option =  { key1: value1, key2: value2, key3: value3, ... };


### applicationId / developerId の設定
▼ お持ちの applicationId / developerId の設定をして下さい

    this.applicationId = [
      '【 applicationId / developerId 】を設定して下さい'
    ];


▼ 複数のIDのお持ちの場合は以下の様に設定して下さい

    this.applicationId = [
      '【 applicationId / developerId  １ 】を設定して下さい',
      '【 applicationId / developerId  ２ 】を設定して下さい',
      '【 applicationId / developerId  ３ 】を設定して下さい',
      '【 applicationId / developerId  ４ 】を設定して下さい'
    ];
　
　

# 使い方
----------------
▼ jQuery と itemSearch.js を読み込みます

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="js/itemSearch.js"></script>

▼ 商品情報を表示する要素とサンプルデータの読み込み  
例）■キーワード：`javascript`　■並び替え：`楽天標準ソート順`

    <div id="books"></div>
    <script>
    $(function(){

      var books = new ItemSearch('books', { keyword: 'javascript', sort: 'standard' });
      books.getItems('test');

    });
    </script>
　
　

パラメーターの解説
----------------
###new ItemSearch()　データの初期化

    var instanceName = new ItemSearch('elementId', { key1: value1, key2: value2, ... });

+    第１引数 : `elementId `
    商品情報を表示する要素のID

+    第２引数 : `{ key1: value1, key2: value2, ... }`  
    省略可、設定できる値は [楽天商品検索API2：API一覧](http://webservice.rakuten.co.jp/api/ichibaitemsearch/)  をご確認下さい

　
###getItems()　商品データの所得・表示する

    instanceName.getItems();

+    getItems() : `customHTML` が呼び出される（カスタマイズする時に使う）

+    getItems('test') : `viewTest` が呼び出される（テスト表示：楽天商品検索API2用）

+    getItems('test', 1) : `viewTest1` が呼び出される（テスト表示：楽天商品検索API用）

　
###setOptions()　商品データの追加・上書き

    instanceName.setOptions({ key1: value1, key2: value2, ... });

+    引数 : `{ key1: value1, key2: value2, ... }`
    設定できる値は [楽天商品検索API2：API一覧](http://webservice.rakuten.co.jp/api/ichibaitemsearch/)  をご確認下さい
　

　

表示をカスタマイズ
----------------
▼ `...` を記述する。　商品データは引数の `data` に格納されています。  

    instanceName.customHTML = function (data) { ... };  

###カスタマイズサンプル  

    instanceName.customHTML = function (data) {
      var items = data.Items, html, item, i, j;

      html = '<ul>';
      for (i = 0, j = items.length; i < j; i++) {
        item = items[i].Item;

        html += '<li>';
        html += '<a href="' + item.itemUrl + '" title="' + item.itemName + '"">';
        html += '<img src="' + item.mediumImageUrls[0].imageUrl + '">';
        html += '</a>';
        html += ' 感想：' + item.reviewCount + '件';
        html += ' 評価：' + item.reviewAverage;
        html += ' 価格：' + item.itemPrice + '円';
        html += '</li>';
      }
      html += '</ul>';

      $('#' + this.elementId).html(html);
    };
    instanceName.getItems(); // 商品データの所得  
　

その他
----------------
Publicな値なため容易に変更が出来る、出来てしまう  
applicationId / developerId が丸見え  
エラーチェックしてない  
