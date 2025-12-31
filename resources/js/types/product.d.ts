import { PageTitleProps } from "@/partials/PageTitle copy";
import { PaginationData, SelectOption } from "./global";
import { ProductCategory } from "./product_category";

export type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
    order_number: number;
    images: string[];
    category_id?: number | null;
    category?: ProductCategory;
};

export type ProductIndexProps = PageTitleProps & {
    products: PaginationData<Product>;
    categories: SelectOption[];
    search?: string | null;
    category?: string | null;
};

export type ProductFormData = {
    name: string;
    description?: string;
    price: number;
    category_id?: number | null;
};
