// 取出存在localstorage的資料
let cartRowContents='';
let cartItem = document.querySelector(".order-bar");


let data = JSON.parse(localStorage.getItem("cart"));


const getCartProductItem = () => {

  for (let i = 0; i < data.length; i++){
      let cartImg = data[i].image;
      let cartProduct = data[i].product;
      let cartPrice = data[i].price;
      
       cartRowContents += 
       `
        <div class="order d-flex mb-4">
            <div class="product-img col-5 mr-2">
                <img src="${cartImg}" alt="" class="c-img" id="img01">
            </div>
            <div class="order-detail col-7">
                <p id="product-name">${cartProduct}</p>
                <p class="new-tag">新作</p>
                <p class="p-price">¥${cartPrice}</p>
                <p class="deleteCartItem two">削除</p>
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
  const deleteProduct = e.target.parentNode.parentNode;

  deleteProduct.remove();
  const deleteProductName = e.target.parentNode.children[0].innerText;

  const newProductData = data.filter(function (element) {
    return element.product !== deleteProductName;
    });
    console.log(newProductData);
    localStorage.setItem("cart", JSON.stringify(newProductData));

  totalCounter();
}


getCartProductItem();



// 購物車計算功能
function totalCounter(){
    let allTotal = document.querySelector('.allTotal');

    let price = document.querySelectorAll('.p-price');

    let total = 0;

    for(let k = 0; k < price.length; k++){
        let allPrice = price[k].innerText.replace('¥','');
        total += Number(allPrice);

    }

    let order = document.querySelectorAll('.order');

    let count = document.querySelector('.count')
    count.innerHTML = order.length + '件'

    let cartCount = document.querySelector('#cart-count');
    let iconCount = document.querySelector('#icon-count');
    if(order.length > 0){
        cartCount.classList.add('cart-count');
        iconCount.classList.add('icon-count');
        iconCount.innerHTML = order.length
    }else{
        cartCount.classList.remove('cart-count');
        iconCount.classList.remove('icon-count');
        iconCount.innerHTML = '';

    }

    let deliveryFee = document.querySelector('.delivery-fee')
    deliveryFee.innerHTML = (order.length > 0) ? '¥'+ 600 : '¥'+0

    let priceTotal = document.querySelector('.p-total')
    priceTotal.innerHTML = '¥' + total


    allTotal.innerHTML = '¥' + (Number(order.length > 0 ? 600 : 0) + total)


}

