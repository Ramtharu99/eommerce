import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromLS = (id) => {
    let cartProducts = getCartProductFromLS();
    cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

    localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

    //To remove the div onclick
    let removeDiv = document.getElementById(`card${id}`);
    if(removeDiv){
        removeDiv.remove();
        showToast("delete", id);
    }
    updateCartValue(cartProducts);
};