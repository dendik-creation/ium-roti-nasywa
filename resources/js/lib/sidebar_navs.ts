import {
    Bubbles,
    Grid2X2,
    LucideProps,
    Package,
    PackageSearch,
    Settings,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type NavItems = {
    type: "item" | "splitter";
    title: string;
    url: string;
    icon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
}[];

const sidebarNavs: NavItems = [
    {
        type: "item",
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Grid2X2,
    },
    {
        type: "splitter",
        title: "Data Master",
        url: "#",
    },
    {
        type: "item",
        title: "Kategori Produk",
        url: "/admin/category",
        icon: PackageSearch,
    },
    {
        type: "item",
        title: "Produk",
        url: "/admin/product",
        icon: Package,
    },
    {
        type: "splitter",
        title: "Lain-lain",
        url: "#",
    },
    {
        type: "item",
        title: "Testimoni Pelanggan",
        url: "/admin/testimonial",
        icon: Bubbles,
    },
    {
        type: "item",
        title: "Pengaturan Sistem",
        url: "/admin/setting",
        icon: Settings,
    },
];

export default sidebarNavs;
