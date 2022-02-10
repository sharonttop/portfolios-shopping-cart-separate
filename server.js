
// 刪除功能
let deleteBtn = document.querySelectorAll('.delete');

// console.log(deleteBtn)

function removeCartItem(e){
        // console.log('delete');
        // console.log(e.target.parentNode.parentNode);
        const deleteProduct = e.target.parentNode.parentNode

        deleteProduct.remove();
        totalCounter()

        
    }


// for(let i = 0; i < deleteBtn.length; i++){
//     let deleteAllBtn = deleteBtn[i]
//     // console.log(deleteAllBtn);
//     deleteAllBtn.addEventListener('click',removeCartItem)
// }

function totalCounter(){
    let allTotal = document.querySelector('.allTotal');
    // let total = allTotal.innerText.replace('¥','')
    // console.log(total)

    let price = document.querySelectorAll('.p-price');
    // console.log(price)

    let allTotalA = 0;

    for(let k = 0; k < price.length; k++){
        let allPrice = price[k].innerText.replace('¥','');
        // console.log(allPrice)
        allTotalA += Number(allPrice);

    }

    let order = document.querySelectorAll('.order');
    // console.log(order.length);

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
    priceTotal.innerHTML = '¥' + allTotalA


    allTotal.innerHTML = '¥' + (Number(order.length > 0 ? 600 : 0) + allTotalA)


}