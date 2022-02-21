let i;
let AllProduct = "";
let productList = document.querySelector(".product-list");
let cartProductItem = [];

let allProductData = null;
let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));

const productData = fetch("./data/products-women.json")
  .then((response) => {
    return response.json();
  })
  .then((products) => {
    allProductData = products;
    // console.log(allProductData);

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
        let dataIndex = getDataId - 1;

        // console.log(idName);
        // console.log(products[idName]);

        let getProductData = products[dataIndex];

        let productImg = getProductData.image;

        let productName = getProductData.product;
        let productPrice = getProductData.price;

        getProductData["qty"] = 1;
        //中括號表示法可以代變數或字串，但點表示法不行。

        //幫物件data加上id
        let productDataObj = {};
        productDataObj[getDataId] = getProductData;
        console.log('productDataObj', productDataObj);

        //  同頁顯示購物車存進localstorage方法

        addItemToCart(
          productName,
          productPrice,
          productImg,
          getDataId,
          productDataObj
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

//同頁顯示購物車
function addItemToCart(
  productName,
  productPrice,
  productImg,
  getDataId,
  getProductData
) {
  let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));
  let addToLocalstorage = {};

  if (
    cartLocalstorageData &&
    Object.keys(cartLocalstorageData).length != 0 &&
    cartLocalstorageData[getDataId]
  ) {
    alert("購物車商品已為您新增數量。");
    cartLocalstorageData[getDataId].qty += 1;
    addToLocalstorage = { ...cartLocalstorageData };
  } else {
    addToLocalstorage = { ...cartLocalstorageData, ...getProductData };
  }

  localStorage.setItem("cart", JSON.stringify(addToLocalstorage));
  totalCounter();
}

let counterHart = 0;

function handleLikeProducts(allLike) {
  allLike.addEventListener("click", function (e) {
    let Like = "./imgs/ic-like-full.svg";
    let unLike = "./imgs/ic-like.svg";
    let likeCount = document.querySelector("#like-count");
    let fullLikeCount = document.querySelector("#full-like-count");

    if (e.target.src.indexOf("ic-like-full.svg") === -1) {
      likeCount.classList.add("like-count");
      fullLikeCount.classList.add("full-like-count");
      e.target.src = Like;
      counterHart++;
      fullLikeCount.innerHTML = counterHart;
    } else {
      e.target.src = unLike;
      counterHart--;
      fullLikeCount.innerHTML = counterHart;
      if (counterHart === 0) {
        likeCount.classList.remove("like-count");
        fullLikeCount.classList.remove("full-like-count");
        fullLikeCount.innerHTML = "";
      }
    }
  });
}

// 購物車計算功能
function totalCounter() {
  let cartCount = document.querySelector("#cart-count");
  let iconCount = document.querySelector("#icon-count");
  let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));
  if (cartLocalstorageData && Object.keys(cartLocalstorageData).length > 0) {
    // console.log(cartLocalstorageData.length);
    cartCount.classList.add("cart-count");
    iconCount.classList.add("icon-count");
    iconCount.innerHTML = Object.keys(cartLocalstorageData).length;
  } else {
    cartCount.classList.remove("cart-count");
    iconCount.classList.remove("icon-count");
    iconCount.innerHTML = "";
  }
}
totalCounter();
