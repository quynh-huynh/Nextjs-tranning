import axios from "axios";
import { PageRequest, Product, ProductDetail } from "../models/product";
import { tenantId } from "../constants/constants";

interface ApiResponse<T> {
  items: T[];
  totalCount: number;
}

export async function fetchProductsByTenandId(
  request: PageRequest
): Promise<ApiResponse<Product>> {
  try {
    const params = new URLSearchParams(
      Object.entries(request).map(([key, value]) => [key, String(value)])
    ).toString();

    const response = await axios.get(
      `https://api.staging.storims.com/api/v1/TenantProduct/${tenantId}?${params}`
    );

    // Return the paged response data in the same shape
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

export async function fetchProductById(
  id: string
): Promise<ProductDetail> {
  try {
    const response = await axios.get(
      `https://api.staging.storims.com/api/v1/TenantProduct/${tenantId}/${id}`
    );

    // Return the paged response data in the same shape
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

