export default interface Product {
  id?: string;
  productName: string;
  productDetail: string;
  brandId: string;
  features: { name: string }[];
  purchasePrice: number;
  salePrice: number | null;
  availableQty: number;
}
