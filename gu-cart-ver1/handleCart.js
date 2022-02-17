
    let i;
    let AllProduct='';
    let productList = document.querySelector('.product-list');
    let cartProductItem = [];


    

    const productData = fetch('./data/products.json').then(response => {
    return response.json();
    }).then(products => {
        for( i=0; i< products.length; i++){
            AllProduct += 
            `
            <div class="product col-md">
                <div>
                    <div class="product-img">
                        <img src="${products[i].image}" alt="" class="c-img" id="p-img">
                        <div class="like-hart">
                            <img src="../imgs/ic-like.svg" alt="" class="c-img" id="hart-img">
                        </div>
                    </div>
                    <p class='gender'>WOMEN</p>
                    <p id="product-name">${products[i].product}</p>
                </div>
                <div>
                    <p class="new-tag">新作</p>
                    <p class="price-tag">¥${products[i].price}</p>
                    <div class="add-to-cart btn">カートに入れる</div>
                </div>
            </div>
            `
            productList.innerHTML = AllProduct


        }
        //加入購物車
        let addToCart = document.querySelectorAll('.add-to-cart')


        for(i=0; i < addToCart.length ; i++) {

            // console.log(products[0].product);
            // let allProductItem = {
            //   image: products[i].image,
            //   product: products[i].product,
            //   price: products[i].price,
            // };
            // console.log(allProductItem);

            addToCart[i].addEventListener('click', function(e) {
              let addProduct = e.target.parentNode;

              let productName =
                addProduct.parentNode.children[0].children[2].innerText;
              let productPrice = addProduct.children[1].innerText.replace(
                "¥",
                ""
              );

              let productImg =
                addProduct.parentNode.children[0].children[0].children[0].src;

              //   console.log(productName, productPrice, productImg);

              //直接push進localstorage
              
              /* let addProductItem = {
                image: productImg,
                product: productName,
                price: productPrice,
              };

              cartProductItem.push(addProductItem);
              localStorage.setItem("cart", JSON.stringify(cartProductItem));

              let getStorageData = JSON.parse(localStorage.getItem("cart"));

              for (i = 0; i < getStorageData.length; i++) {
                console.log(getStorageData[i].product);
                if(productName ！== getStorageData[i].product){
                    console.log('push')
                }
              }

              */

              //  同頁顯示購物車存進localstorage方法

              addItemToCart(productName, productPrice, productImg);

              let order = document.querySelectorAll(".order");
              console.log("order", order);

              let cartProductItem = [];

              for (let i = 0; i < order.length; i++) {
                // console.log(order[i]);
                let orderItemImg = order[i].children[0].children[0].src;
                let orderItemName = order[i].children[1].children[1].innerText;
                let orderItemPrice = order[
                  i
                ].children[1].children[3].innerText.replace("¥", "");
                let addProductItem = {
                  image: orderItemImg,
                  product: orderItemName,
                  price: orderItemPrice,
                };
                cartProductItem.push(addProductItem);
              }
              console.log(cartProductItem);

              localStorage.setItem("cart", JSON.stringify(cartProductItem));
              // console.log(addProductItem);
            })


        }


        // 加入我的最愛
        let likeHart = document.querySelectorAll('.like-hart')
        for (i = 0; i < addToCart.length; i++) {
            let allLike = likeHart[i]
            handleLikeProducts(allLike);
        }
        // totalCounter();
    }).catch(err => {
        console.log(error);
        
    });

    console.log("cartProductItem", cartProductItem);

      //同頁顯示購物車
    function addItemToCart(productName, productPrice, productImg){
        let cartRow = document.createElement('div');
        cartRow.classList.add(
          "order",
          "col-md-1",
          "col-6",
          "mb-4"
        );
        let cartItem = document.querySelector('.order-bar')
        let cartItemName = cartItem.querySelectorAll('#product-name')

        for(let i = 0; i < cartItemName.length;i++){
            if(cartItemName[i].innerText == productName){
                // console.log('productName', productName)
                alert('商品已加入購物車');
                return
            }
        }


        let cartRowContents = `
            <div class="product-img mr-2">
                <img src="${productImg}" alt="" class="c-img" id="img01">
            </div>
            <div class="order-detail">
                <div class="p-name"></div>
                <p class="bottom-cart-order" id="product-name">${productName}</p>
                <p class="new-tag">入れ済み</p>
                <p class="pc-price" style="display:none">${productPrice}</p>
                <p class="deleteCartItem two" style="display:none">削除</p>
            </div>
        `;
        cartRow.innerHTML = cartRowContents
        cartItem.append(cartRow)
        
        handleDeleteBtn();
        
        totalCounter()

    }


    let counterHart = 0;


    function handleLikeProducts(allLike){                
        allLike.addEventListener('click', function(e){

            let Like = '../imgs/ic-like-full.svg'
            let unLike = '../imgs/ic-like.svg'
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

    function handleDeleteBtn() {
      let deleteBtn = document.querySelectorAll(".deleteCartItem");

      for (let i = 0; i < deleteBtn.length; i++) {
        let deleteBtnAll = deleteBtn[i];
        deleteBtnAll.addEventListener("click", removeCartItem);
      }
    }


function removeCartItem(e){
        const deleteProduct = e.target.parentNode.parentNode

        deleteProduct.remove();

        const deleteProductName = e.target.parentNode.children[1].innerText;
        let getCartdata = JSON.parse(localStorage.getItem("cart"));


        const newProductData = getCartdata.filter(function (element) {
          return element.product !== deleteProductName;
        });
        // console.log("newProductData", newProductData);
        localStorage.setItem("cart", JSON.stringify(newProductData));


        totalCounter()

        
    }

// 購物車計算功能
function totalCounter(){
    // let allTotal = document.querySelector('.allTotal');

    // let price = document.querySelectorAll('.p-price');

    // let total = 0;

    // for(let k = 0; k < price.length; k++){
    //     let allPrice = price[k].innerText.replace('¥','');
    //     total += Number(allPrice);

    // }

    let order = document.querySelectorAll('.order');

    let count = document.querySelector('.count')

    // count.innerHTML = order.length + "件";

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

    // let deliveryFee = document.querySelector('.delivery-fee')
    // deliveryFee.innerHTML = (order.length > 0) ? '¥'+ 600 : '¥'+0

    // let priceTotal = document.querySelector('.p-total')
    // priceTotal.innerHTML = '¥' + total


    // allTotal.innerHTML = '¥' + (Number(order.length > 0 ? 600 : 0) + total)


}