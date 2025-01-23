export type Product = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    itemUrl: string;
    customId: number;
    regularPrice: number;
    storeSettings: string;
    isFromOtherTenant: boolean;
    totalReviews: number;
    reviewStatFiveScale: number;
    brandName: string;
    updatedDate: string;
    attributeGroups: AttributeGroup[];
    variants: any[];
  };
  

 export type AttributeGroup = {
  id: string;
  customId: number;
  name: string;
  attributes: Attribute[];
};

export type Attribute = {
  id: string;
  customId: number;
  name: string;
  value: any;
};



export type PageRequest = {
  pageIndex: number;
  pageSize: number;
  sortExpression: string; //Name_asc
  searchTerm?: string;
}

type Image = {
  small: string;
  medium: string;
  origin: string;
};

 export type Variant = {
  id: string;
  customId: number;
  price: number;
  regularPrice: number;
  title: string;
  tagName: string;
  tagColor: string;
  attributeGroups: AttributeGroup[];
};

export type ProductDetail = {
  images: Image[];
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  metaCanonical: string;
  metaCrawlMode: number;
  additionalType: string | null;
  sameAs: string | null;
  isBasedOn: string | null;
  wordCount: number | null;
  about: string | null;
  mention: string | null;
  author: string | null;
  status: number;
  id: string;
  title: string;
  imageUrl: string;
  itemUrl: string;
  customId: number;
  price: number;
  regularPrice: number;
  storeSettings: string;
  isFromOtherTenant: boolean;
  totalReviews: number;
  reviewStatFiveScale: number;
  brandName: string;
  updatedDate: string;
  attributeGroups: AttributeGroup[];
  variants: Variant[];
}

