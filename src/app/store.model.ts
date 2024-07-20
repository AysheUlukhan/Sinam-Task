export interface Product {
  id: number;
  productName: string;
  category: string;
  price: number;
  img: string;
  storeId: number; 
  quantity?: number;
}

export interface Store {
  id: number;
  storeName: string;
  img: string;
  products: Product[];
}
