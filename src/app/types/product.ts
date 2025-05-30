export default interface Product {
  customFilterDetailList: any;
  reference: any;
  date: any;
  invoice: any;
  id?: string;
  productName: string;
  productDetail: string;
  brandId: string;
  features: { name: string }[];
  purchasePrice: number;
  salePrice: number | null;
  availableQty: number;
}
