const cartValue = document.querySelector("#cartValue");

export const updateCartValue = (CartProducts) => {
    return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"> ${CartProducts.length} </i>`);
};