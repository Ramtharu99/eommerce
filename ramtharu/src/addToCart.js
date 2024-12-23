import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart = (event, id, stock) => {
    let arrLocalStorageProduct = getCartProductFromLS(); // Fetch LocalStorage data

    const currentProductElem = document.querySelector(`#card${id}`);
    if (!currentProductElem) {
        return false;
    }

    console.log(currentProductElem);

    let quantity = currentProductElem.querySelector(".productQuantity")?.innerText;
    let price = currentProductElem.querySelector(".productPrice")?.innerText;

    if (!quantity || !price) {
        return false;
    }

    price = price.replace("₹", "");
    quantity = Number(quantity);
    price = Number(price * quantity);

    let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id);

    if(existingProd && quantity > 1){
        quantity = Number(existingProd.quantity) + Number(quantity);
        price = Number(price * quantity);
        let updatedCart = { id, quantity, price }; 
        updatedCart = arrLocalStorageProduct.map((curProd) => {
            return curProd.id === id ? updatedCart : curProd;
        });
        console.log(updatedCart);
        localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
        showToast("add", id);
    }
    if (existingProd) {
        // alert('This Product Already Existed');
        return false;
    }

    arrLocalStorageProduct.push({ id, quantity, price });
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
    
    updateCartValue(arrLocalStorageProduct);
    showToast("add", id);
};
