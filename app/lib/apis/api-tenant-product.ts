import axios from "axios";
import { PageRequest, Product } from "../models/product";

interface ApiResponse<T> {
  items: T[];
  totalCount: number;
}

export async function fetchProductByTenandId(
  tenandId: string,
  request: PageRequest
): Promise<ApiResponse<Product>> {
  try {
    const params = new URLSearchParams(Object.entries(request)).toString();

    const response = await axios.get(
      `https://api.staging.storims.com/api/v1/TenantProduct/${tenandId}?${params}`
    );

    // Return the paged response data in the same shape
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}
