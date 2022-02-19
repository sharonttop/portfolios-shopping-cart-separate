
    let i;
    let AllProduct='';
    let productList = document.querySelector('.product-list');
    let cartProductItem = [];

  let allProductData = null;
  let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));

    
    const productData = fetch("./data/products-kids.json")
      .then((response) => {
        return response.json();
      })
      .then((products) => {
        allProductData = products;
        console.log(allProductData);

        for (i = 0; i < products.length; i++) {
          AllProduct += `
            <div class="product col-md">
                <div>
                    <div class="product-img">
                        <img src="${products[i].image}" alt="" class="c-img" id="p-img">
                        <div class="like-hart">
                            <img src="./imgs/ic-like.svg" alt="" class="c-img" id="hart-img">
                        </div>
                    </div>
                    <p class='gender'>${products[i].category}</p>
                    <p id="product-name">${products[i].product}</p>
                </div>
                <div>
                    <p class="new-tag">新作</p>
                    <p class="price-tag">¥${products[i].price}</p>
                    <div class="add-to-cart btn" data-id="${products[i].id}">カートに入れる</div>
                </div>
            </div>
            `;
          productList.innerHTML = AllProduct;
        }
        //加入購物車
        let addToCart = document.querySelectorAll(".add-to-cart");

        for (i = 0; i < addToCart.length; i++) {
          addToCart[i].addEventListener("click", function (e) {
            let getDataId = e.target.getAttribute("data-id");
            let idName = getDataId < 0 ? 0 : getDataId - 11;

            console.log(getDataId);

            console.log(getDataId);
            console.log(idName);
            console.log(products[0]);

            let getProductData = products[idName];
            let productImg = getProductData.image;

            let productName = getProductData.product;
            let productPrice = getProductData.price;

            //  同頁顯示購物車存進localstorage方法

            addItemToCart(
              productName,
              productPrice,
              productImg,
              idName,
              getProductData
            );
          });
        }

        // 加入我的最愛
        let likeHart = document.querySelectorAll(".like-hart");
        for (i = 0; i < addToCart.length; i++) {
          let allLike = likeHart[i];
          handleLikeProducts(allLike);
        }
        // totalCounter();
      })
      .catch((err) => {
        console.log(error);
      });
   

    let allCartProductItem =[];

      //同頁顯示購物車
    function addItemToCart(
      productName,
      productPrice,
      productImg,
      idName,
      getProductData
    ) {
      let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));
      if (cartLocalstorageData !== null && allCartProductItem.length == 0){
        allCartProductItem.push(...cartLocalstorageData);
      }

      allCartProductItem.push(getProductData);

      var repeatLocalstorage = allCartProductItem.filter(function (
        element,
        index,
        arr
      ) {
        return arr.indexOf(element) !== index;
      });

      if (repeatLocalstorage.length > 0) {
        // repeatLocalstorage = [];
        alert("商品已加入購物車");
      }

      let addToLocalstorage = allCartProductItem.filter(function (
        element,
        index,
        arr
      ) {
        return arr.indexOf(element) === index;
      });
      localStorage.setItem("cart", JSON.stringify(addToLocalstorage));
      allCartProductItem = addToLocalstorage;

      totalCounter();
    }


    let counterHart = 0;


    function handleLikeProducts(allLike){                
        allLike.addEventListener('click', function(e){

            let Like = './imgs/ic-like-full.svg'
            let unLike = './imgs/ic-like.svg'
            let likeCount = document.querySelector('#like-count');
            let fullLikeCount = document.querySelector('#full-like-count');

            if(e.target.src.indexOf('ic-like-full.svg') === -1){
                likeCount.classList.add('like-count');
                fullLikeCount.classList.add('full-like-count');
                e.target.src = Like
                counterHart++;
                fullLikeCount.innerHTML = counterHart;

            }else{

                e.target.src = unLike
                counterHart--;
                fullLikeCount.innerHTML = counterHart;
                if(counterHart === 0){
                    likeCount.classList.remove('like-count');
                    fullLikeCount.classList.remove('full-like-count');
                    fullLikeCount.innerHTML = '';

                }
            }

        })

    }


// 購物車計算功能
function totalCounter(){

    let cartCount = document.querySelector("#cart-count");
    let iconCount = document.querySelector("#icon-count");
    let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));
    if (cartLocalstorageData.length > 0) {
      // console.log(cartLocalstorageData.length);
      cartCount.classList.add("cart-count");
      iconCount.classList.add("icon-count");
      iconCount.innerHTML = cartLocalstorageData.length;
    } else {
      cartCount.classList.remove("cart-count");
      iconCount.classList.remove("icon-count");
      iconCount.innerHTML = "";
    }
}
totalCounter();