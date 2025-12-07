import { PageTitleProps } from "@/Partials/PageTitle";
import { PaginationData } from "./global";

export type Testimonial = {
    id: number;
    customer_name: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
};

export type TestimonialIndexProps = PageTitleProps & {
    testimonials: PaginationData<Testimonial>;
    search?: string;
    rating?: number;
};
