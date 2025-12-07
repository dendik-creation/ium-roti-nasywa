import { PageTitleProps } from "@/Partials/PageTitle";

export type AppSetting = {
    id: number;
    whatsapp_number: string;
    google_maps_url: string;
    social_media: SocialMedia[];
    time_operational: string;
};

export type SocialMedia = {
    platform: "YOUTUBE" | "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "TIKTOK";
    url: string;
};

export type AppSettingIndexProps = PageTitleProps & {
    app_setting: AppSetting;
};
