export type Product = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
  };
  

export type PageRequest = {
  pageIndex: number;
  pageSize: number;
  sortExpression: string; //Name_asc
  searchTerm?: string;
}
