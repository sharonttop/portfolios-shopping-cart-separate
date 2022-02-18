// 取出存在localstorage的資料
let cartRowContents='';
let cartItem = document.querySelector(".checkout-order-bar");


let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));


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
                  <p class="deleteCartItem two">削除</p>
                </div>
            </div>
        </div>
        `;
    cartItem.innerHTML = cartRowContents;
  }

    handleDeleteBtn();
    totalCounter();
};



function handleDeleteBtn(){
        let deleteBtn = document.querySelectorAll(".deleteCartItem");

        for (let i = 0; i < deleteBtn.length; i++) {
          let deleteBtnAll = deleteBtn[i];
          deleteBtnAll.addEventListener("click", removeCartItem);
        }



}


function removeCartItem(e) {
  const deleteProduct = e.target.parentNode.parentNode.parentNode;

  deleteProduct.remove();
  const deleteProductName =
    e.target.parentNode.parentNode.children[0].children[0].innerText;
    console.log(
      e.target.parentNode.parentNode.children[0].children[0].innerText
    );


  const newProductData = cartLocalstorageData.filter(function (element) {
    return element.product !== deleteProductName;
  });
    console.log(newProductData);
    localStorage.setItem("cart", JSON.stringify(newProductData));
    cartLocalstorageData = newProductData;

  totalCounter();
}


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

const saveClientInfo = () => {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let phone = document.querySelector("#phone").value;
  let address = document.querySelector("#address").value;
  console.log(name, email, phone, address);
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
  localStorage.setItem("address", address);

  location.href = "./order-confirmation-page.html";
}