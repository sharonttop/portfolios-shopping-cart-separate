// 取出存在localstorage的資料
let cartRowContents='';
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

  for (let i = 0; i < cartLocalstorageData.length; i++) {
    let cartImg = cartLocalstorageData[i].image;
    let cartProduct = cartLocalstorageData[i].product;
    let cartPrice = cartLocalstorageData[i].price;

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
                <div class="">
                  <p class="p-price">¥${cartPrice}</p>
                </div>
            </div>
        </div>
        `;
    cartItem.innerHTML = cartRowContents;
  }

    totalCounter();
};




getCartProductItem();



// 購物車計算功能
function totalCounter(){
  let allTotal = document.querySelector(".allTotal");

  let price = document.querySelectorAll(".p-price");

  let total = 0;

  for (let k = 0; k < price.length; k++) {
    let allPrice = price[k].innerText.replace("¥", "");
    total += Number(allPrice);
  }

  let count = document.querySelector('.count')
  count.innerHTML = cartLocalstorageData.length + '件'

  let cartCount = document.querySelector("#cart-count");
  let iconCount = document.querySelector("#icon-count");
  // let cartLocalstorage = JSON.parse(localStorage.getItem("cart"));
  if (cartLocalstorageData.length > 0) {
    console.log(cartLocalstorageData.length);
    cartCount.classList.add("cart-count");
    iconCount.classList.add("icon-count");
    iconCount.innerHTML = cartLocalstorageData.length;
  } else {
    cartCount.classList.remove("cart-count");
    iconCount.classList.remove("icon-count");
    iconCount.innerHTML = "";
  }

  let deliveryFee = document.querySelector(".delivery-fee");
  deliveryFee.innerHTML = cartLocalstorageData.length > 0 ? "¥" + 600 : "¥" + 0;

  let priceTotal = document.querySelector(".p-total");
  priceTotal.innerHTML = "¥" + total;

  allTotal.innerHTML =
    "¥" + (Number(cartLocalstorageData.length > 0 ? 600 : 0) + total);
}