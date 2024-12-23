import './style.css'
import products from "../api/products.json";
import { showProductContainer } from './homeProductCards';


//calling the function to dispay all the products
showProductContainer(products);