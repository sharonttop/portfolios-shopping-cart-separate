
    let i;
    let AllProduct='';
    let productName = document.querySelector('#product-name');

    let productList = document.querySelector('.product-list')
    

    const productData = fetch('./data/products.json').then(response => {
    return response.json();
    }).then(products => {
        for( i=0; i< products.length; i++){
            AllProduct += 
            `
            <div class="product col-md">
                <div class="">
                        <div class="product-img">
                            <img src="${products[i].image}" alt="" class="c-img" id="img04">
                            <div class="like-hart">
                                <img src="./imgs/ic-like.svg" alt="" class="c-img" id="img04">
                            </div>
                        </div>
                    <p class='gender'>WOMEN</p>
                        <p id="product-name">${products[i].product}</p>
                    <p class="new-tag">新作</p>
                    <p class="price-tag">¥${products[i].price}</p>
                </div>
                <div class="add-to-cart btn">カートに入れる</div>
            </div>
            `
            productList.innerHTML = AllProduct


        }
        //加入購物車
        let addToCart = document.querySelectorAll('.add-to-cart')

        for(i=0; i < addToCart.length ; i++) {

            addToCart[i].addEventListener('click', function(e) {

                let productName = e.target.parentNode.children[0].children[2].innerText

                let productPrice = e.target.parentNode.children[0].children[4].innerText

                let productImg = e.target.parentNode.children[0].children[0].children[0].src
                addItemToCart(productName, productPrice, productImg);
            })

        }

        // 加入我的最愛
        let likeHart = document.querySelectorAll('.like-hart')
        for (i = 0; i < addToCart.length; i++) {
            let allLike = likeHart[i]
            productsLike(allLike);
        }
        
    }).catch(err => {
        console.log(error);
        
    });

    function addItemToCart(productName, productPrice, productImg){
        let cartRow = document.createElement('div');
        cartRow.classList.add('order','d-flex','mb-4')
        let cartItem = document.querySelector('.oder-bar')
        let cartItemName = cartItem.querySelectorAll('#product-name')

        for(let i = 0; i < cartItemName.length;i++){
            console.log(cartItemName[i].innerText)
            if(cartItemName[i].innerText == productName){
                console.log('productName', productName)
                alert('商品已加入購物車');
                return
            }
        }


        let cartRowContents = 
        `
            <div class="product-img col-5 mr-2">
                <img src="${productImg}" alt="" class="c-img" id="img01">
            </div>
            <div class="oder-detail col-7">
                <div class="p-name"></div>
                <p id="product-name">${productName}</p>
                <p class="new-tag">新作</p>
                <p class="p-price">${productPrice}</p>
                <p class="delete two">削除</p>
            </div>
        `
        cartRow.innerHTML = cartRowContents
        cartItem.append(cartRow)
        let deleteBtn = document.querySelectorAll('.delete');

        for (let i = 0; i < deleteBtn.length; i++) {
            let deleteAllBtn = deleteBtn[i]
            deleteAllBtn.addEventListener('click', removeCartItem)
        }
        

        totalCounter()

    }

    let counterHart = 0;


    function productsLike(allLike){                
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


            
// 刪除功能
let deleteBtn = document.querySelectorAll('.delete');

function removeCartItem(e){
        const deleteProduct = e.target.parentNode.parentNode

        deleteProduct.remove();
        totalCounter()

        
    }

// 購物車計算功能
function totalCounter(){
    let allTotal = document.querySelector('.allTotal');

    let price = document.querySelectorAll('.p-price');

    let allTotalA = 0;

    for(let k = 0; k < price.length; k++){
        let allPrice = price[k].innerText.replace('¥','');
        allTotalA += Number(allPrice);

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
    priceTotal.innerHTML = '¥' + allTotalA


    allTotal.innerHTML = '¥' + (Number(order.length > 0 ? 600 : 0) + allTotalA)


}