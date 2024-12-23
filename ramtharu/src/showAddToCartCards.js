import products from "../api/products.json";
import { fetchQuantityFromCartLS } from "../fetchquantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { inCrementDecrement } from "./inCrementDecrement";
import { removeProdFromLS } from "./removeProdFromLS";
import { updateCartProductTOtal } from "./updateCartProductTOtal";

let cartProducts = getCartProductFromLS();
let filterProducts = products.filter((curProd)=>{
    return cartProducts.some((curElem) => curElem.id === curProd.id);
});

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProducts = () => {
    filterProducts.forEach((curProd) => {
        const { category, id, image, name, stock, price } = curProd;
        let productClone = document.importNode(templateContainer.content, true);

        const lSActualData = fetchQuantityFromCartLS(id, price);

        productClone.querySelector(".category").textContent = category;
        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;

        productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = lSActualData.price;

        productClone.querySelector(".stockElement").addEventListener("click", (event) => {
            inCrementDecrement(event, id, stock, price);
        });

        productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => {
            removeProdFromLS(id);
        });


        cartElement.appendChild(productClone);
    });
};

showCartProducts();

updateCartProductTOtal();