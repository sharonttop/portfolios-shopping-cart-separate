// 取出存在localstorage的資料

let cartItem = document.querySelector(".order-bar");

let cartLocalstorageData = JSON.parse(localStorage.getItem("cart"));

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
        <div class="order d-flex mb-4">
            <div class="product-img col-5 mr-2">
                <img src="${cartImg}" alt="" class="c-img" id="img01">
            </div>
            <div class="order-detail col-7"> 
                <p id="product-name">${cartProduct}</p>
                <p class="new-tag">新作</p>
                <p class="p-price">¥${cartPrice}</p>
                 <div class="d-flex flex-wrap">
                     <div class="minus-btn" data-id="${cartId}" onclick="handleMinusBtn(event)">-</div>
                      <p class="p-qty">${cartQty}</p>
                     <div class="add-btn" data-id="${cartId}" onclick="handleAddBtn(event)">+</div>
                    <p class="subtotal">小計: ¥${productTotal}</p>
                   </div>
                <p class="deleteCartItem two" data-id="${cartId}">削除</p>
            </div>
        </div>
        `;
  }

  cartItem.innerHTML = cartRowContents;

  handleDeleteBtn();
  totalCounter();
};

function handleMinusBtn(event) {
  console.log("Minus");
  const id = event.target.getAttribute("data-id");
 if (cartLocalstorageData[id].qty > 1){
  cartLocalstorageData[id].qty -= 1;
 }else{
   const deleteConfirm = confirm("你確定要刪除此商品嗎？");
   if (deleteConfirm) {
     delete cartLocalstorageData[id];
     handleCartUpdate();
   } else {
     return;
   };

 }
  localStorage.setItem("cart", JSON.stringify(cartLocalstorageData));

  getCartProductItem();

}

function handleAddBtn(e) {
  console.log("Add");
  const id = e.target.getAttribute("data-id");
  cartLocalstorageData[id].qty += 1;
  localStorage.setItem("cart", JSON.stringify(cartLocalstorageData));

  getCartProductItem();
}


function handleDeleteBtn() {
  let deleteBtn = document.querySelectorAll(".deleteCartItem");

  for (let i = 0; i < deleteBtn.length; i++) {
    let deleteBtnAll = deleteBtn[i];
    deleteBtnAll.addEventListener("click", removeCartItem);
  }
}

function removeCartItem(e) {
  const deleteProduct = e.target.parentNode.parentNode;

  const id = e.target.getAttribute("data-id");
  console.log("id", id);

  delete cartLocalstorageData[id];

  deleteProduct.remove();

  localStorage.setItem("cart", JSON.stringify(cartLocalstorageData));
  handleCartUpdate();
  totalCounter();
}

function handleCartUpdate() {
  const cartNoProduct = document.querySelector(".cart-no-product");
  const cartTitle = document.querySelector(".cart-text-box");
  const cartDetail = document.querySelector(".cart-detail");
  if (cartLocalstorageData && Object.keys(cartLocalstorageData).length != 0) {
    getCartProductItem();
  } else {
    cartDetail.classList.remove("d-flex");
    cartDetail.classList.add("d-none");
    cartTitle.classList.add("d-none");
    cartNoProduct.classList.remove("d-none");
  }

}
handleCartUpdate();

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
