import { PageTitleProps } from "@/partials/PageTitle copy";
import { PaginationData } from "./global";

export type ProductCategory = {
    id: number;
    name: string;
    description?: string;
};

export type ProductCategoryIndexProps = PageTitleProps & {
    categories: PaginationData<ProductCategory>;
    search?: string;
};
