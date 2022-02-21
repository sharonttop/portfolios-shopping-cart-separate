// 取出存在localstorage的資料
let cartItem = document.querySelector(".checkout-order-bar");


let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));

let clientName = localStorage.getItem("name");
let clientEmail = localStorage.getItem("email");
let clientPhone = localStorage.getItem("phone");
let clientaddress = localStorage.getItem("address");

let confirmClientInfo = document.querySelector(".confirm-client-info");

  console.log(clientName, clientEmail, clientPhone, clientaddress);
  let getClientInfo = `
          <div class="d-flex flex-column">
            <p class="client-info-title">お届け方法 - 宅配便着払い</p>
            <p class="client-info-title">配送先</p>
            <div class="d-flex  m-1">
                <label for="name">名前</label>
                <div class="col-10">${clientName}</div>
            </div>
            <div class="d-flex m-1">
                <label for="email">メール</label>
                <div class="col-10">${clientEmail}</div>
            </div>
            <div class="d-flex m-1">
                <label for="phone">電話</label>
                <div class="col-10">${clientPhone}</div>
            </div>
            <div class="d-flex m-1">
                <label for="address">住所</label>
                <div class="col-10">${clientaddress}</div>
            </div>
          </div>
        `;

confirmClientInfo.innerHTML = getClientInfo;

const completeOrder = () => {
  alert('已完成訂單，感謝您的購買!');
  localStorage.removeItem("cart");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("phone");
  localStorage.removeItem("address");
  location.href = "./women-category.html";

}

const getCartProductItem = () => {
  let cartRowContents = "";
  for (let i = 0; i < Object.keys(cartLocalstorageData).length; i++) {
    const localstorageDataKey =
      cartLocalstorageData[Object.keys(cartLocalstorageData)[i]];

    let cartImg = localstorageDataKey.image;
    let cartProduct = localstorageDataKey.product;
    let cartPrice = localstorageDataKey.price;
    let cartId = localstorageDataKey.id;
    let cartQty = localstorageDataKey.qty;
    let productTotal = cartQty * cartPrice;
    cartRowContents += `
        <div class="order-checkout d-flex mb-4">
            <div class="product-img col-md-1 mr-2">
                <img src="${cartImg}" alt="" class="c-img" id="img01">
            </div>
            <div class="order-detail-checkout col-md-11">
                <div class="">
                  <p id="product-name">${cartProduct}</p>
                  <p class="new-tag">新作</p>
                </div>
                <div class="price-box">
                  <p class="po-price pr-3">価格: ¥${cartPrice}</p>
                  <p class="p-qty pr-3">数量: ${cartQty}件</p>
                  <p class="p-price">小計: ¥${productTotal}</p>
                </div>
              </div>
        </div>
        `;
  }
  cartItem.innerHTML = cartRowContents;

  totalCounter();
};



getCartProductItem();



// 購物車計算功能
function totalCounter() {
    let cartCount = document.querySelector("#cart-count");
    let iconCount = document.querySelector("#icon-count");

    if (Object.keys(cartLocalstorageData).length > 0) {
      // console.log(Object.keys(cartLocalstorageData).length);
      cartCount.classList.add("cart-count");
      iconCount.classList.add("icon-count");
      iconCount.innerHTML = Object.keys(cartLocalstorageData).length;
    } else {
      cartCount.classList.remove("cart-count");
      iconCount.classList.remove("icon-count");
      iconCount.innerHTML = "";
    }


  let allTotal = document.querySelector(".allTotal");

  const localstorageDataValues = Object.values(cartLocalstorageData);
  const cartProductCount = Object.keys(cartLocalstorageData);

  let allTotalPrice = 0;
  for (let i = 0; i < localstorageDataValues.length;i++){
    const total = (localstorageDataValues[i].price) * (localstorageDataValues[i].qty)
    allTotalPrice += total;
  }

    let count = document.querySelector(".count");
    count.innerHTML = cartProductCount.length + "件";
  
    let cartProductsTotal = document.querySelector(".p-total");
    cartProductsTotal.innerHTML = "¥" + allTotalPrice;
  
  let deliveryFee = document.querySelector(".delivery-fee");
  deliveryFee.innerHTML = cartProductCount.length > 0 ? "¥" + 600 : "¥" + 0;
      
  allTotal.innerHTML =
    "¥" + ((cartProductCount.length > 0 ? 600 : 0) + allTotalPrice);
}