(function(global){
  let dc = {};

  let productsDbUrl = "https://still-plateau-02404.herokuapp.com/products";
  let singleProductHtmlUrl = 'single-product.html';

  insertHtml = (querySelector, htmlToInsert) => {
    let tmp = document.querySelector(querySelector);
    tmp.innerHTML = htmlToInsert;
  }

  insertProperty = (snippet, key, value) => {
    var pattern = "{{" + key + "}}";
    snippet = snippet.replace(new RegExp(pattern, "g"), value);
    return snippet;
  }

  dc.showProducts = function(){
    ajaxUtils.sendGetRequest(productsDbUrl, buildProductsView, true);
  }

  buildProductsView = (productsJSON) => {
    ajaxUtils.sendGetRequest(singleProductHtmlUrl, (singleProductHtml) => {
      let finalHtml = "";

      for(let i = 0; i<productsJSON.length && productsJSON[i].price <= 600; i++){
        let s = singleProductHtml;

        s = insertProperty(s, "name", productsJSON[i].name);
        s = insertProperty(s, "price", productsJSON[i].price);
        s = insertProperty(s, "img", productsJSON[i].img);

        if(productsJSON[i].isOnSaledOff == true){
          s = insertProperty(s, "sale", "ON SALE");
        }
        else{
          s = s.replace(new RegExp('<div class="tag-sale">{{sale}}</div>', "g"), "");
        }

        finalHtml += s;
        finalHtml += '\n';
      }

      insertHtml("#single-products-section", finalHtml);
    }, false);
  }

  global.dc = dc;
})(window);