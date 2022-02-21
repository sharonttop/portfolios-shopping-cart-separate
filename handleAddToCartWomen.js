let AllProduct = "";
let productList = document.querySelector(".product-list");

let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));

const productData = fetch("./data/products-women.json")
  .then((response) => {
    return response.json();
  })
  .then((products) => {

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
    }
    productList.innerHTML = AllProduct;

    //加入購物車
    let addToCart = document.querySelectorAll(".add-to-cart");

    for (let i = 0; i < addToCart.length; i++) {
      addToCart[i].addEventListener("click", function (e) {
        let getDataId = e.target.getAttribute("data-id");
        let dataIndex = getDataId - 1;

        let getProductData = products[dataIndex];

        getProductData["qty"] = 1;
        //中括號表示法可以代變數或字串，但點表示法不行。

        //幫物件data加上id
        let productDataObj = {};
        productDataObj[getDataId] = getProductData;

        addItemToCart(
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
  })
  .catch((err) => {
    console.log(error);
  });

function addItemToCart(getDataId, productDataObj) {
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
    addToLocalstorage = { ...cartLocalstorageData, ...productDataObj};
  }

  localStorage.setItem("cart", JSON.stringify(addToLocalstorage));
  totalCounter();
}

let counterHart = 0;

function handleLikeProducts(allLike) {
  allLike.addEventListener("click", function (e) {
    let Like = "./imgs/ic-like-full.svg";
    let unLike = "./imgs/ic-like.svg";

    if (e.target.src.indexOf("ic-like-full.svg") === -1) {
      e.target.src = Like;
    } else {
      e.target.src = unLike;
    }
  });
}

// 購物車計算功能
function totalCounter() {
  let cartCount = document.querySelector("#cart-count");
  let iconCount = document.querySelector("#icon-count");
  let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));
  let cartLocalstorageKeys = Object.keys(cartLocalstorageData);

  if (cartLocalstorageData && cartLocalstorageKeys.length > 0) {
    cartCount.classList.add("cart-count");
    iconCount.classList.add("icon-count");
    iconCount.innerHTML = cartLocalstorageKeys.length;
  } else {
    cartCount.classList.remove("cart-count");
    iconCount.classList.remove("icon-count");
    iconCount.innerHTML = "";
  }
}
totalCounter();
