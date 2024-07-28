export type Product ={
    _id: string;
    title: string;
    price: number;
    discount: number;
    description: string;
    total: number,
    category: Category;
    image: string;
    image2: string;

}
export type Category = {
    _id: string;
    name: string;
    description: string;
  };
  
  export type ProductFormParams = {
    title: string;
    price: number;
    discount: number;
    description: string;
    total: number,
    category: string;
    image: string;
    image2: string;
  };
  export type CartItem = {
    product: Product;
    quantity: number;
  };
  
  export type Cart = {
    _id: string;
    user: string;
    products: CartItem[];
  };
  