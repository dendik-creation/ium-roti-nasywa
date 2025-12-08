import { ErrorInput, SelectSearchInput } from "@/components/custom/FormElement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AppLayout from "@/partials/AppLayout";
import { PageTitle } from "@/Partials/PageTitle";
import { AppSettingIndexProps, SocialMedia } from "@/types/app_setting";
import { useForm } from "@inertiajs/react";
import { Loader, Plus, Save, Trash2 } from "lucide-react";

const AVAILABLE_SOCIAL_MEDIA = [
    { value: "YOUTUBE", label: "YouTube" },
    { value: "FACEBOOK", label: "Facebook" },
    { value: "INSTAGRAM", label: "Instagram" },
    { value: "TWITTER", label: "Twitter" },
    { value: "TIKTOK", label: "TikTok" },
];

const AppSettingIndex = ({
    title,
    description,
    app_setting,
}: AppSettingIndexProps) => {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
        clearErrors,
        setError,
    } = useForm({
        id: app_setting?.id ?? "",
        whatsapp_number: app_setting?.whatsapp_number ?? "",
        social_media:
            (app_setting?.social_media as {
                platform: SocialMedia["platform"] | string;
                url: string;
            }[]) ?? [],
        time_operational: app_setting?.time_operational ?? "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const validateForm = (): boolean => {
        clearErrors();
        let valid = true;

        if (!data.whatsapp_number && data.whatsapp_number.trim() === "") {
            setError("whatsapp_number", "Nomor WhatsApp wajib diisi");
            valid = false;
        }

        if (!data.time_operational && data.time_operational.trim() === "") {
            setError("time_operational", "Jam operasional wajib diisi");
            valid = false;
        }

        if (data.social_media.length == 0) {
            setError("social_media", "Media sosial wajib diisi");
            valid = false;
        }
        data.social_media.forEach((item, index) => {
            if (!item.platform || item.platform.trim() === "") {
                setError(
                    `social_media.${index}.platform`,
                    `Platform wajib diisi`,
                );
                valid = false;
            }
            if (!item.url || item.url.trim() === "") {
                setError(`social_media.${index}.url`, `Link wajib diisi`);
                valid = false;
            }
        });
        return valid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        put("/admin/app-setting/update", {
            preserveScroll: true,
            replace: true,
        });
    };
    const addNewSocialMedia = () => {
        const updatedSocialMedia = [...data.social_media];
        updatedSocialMedia.push({ platform: "", url: "" });
        setData("social_media", updatedSocialMedia);
    };

    const removeSocialMedia = (index: number) => {
        const updatedSocialMedia = [...data.social_media];
        updatedSocialMedia.splice(index, 1);
        setData("social_media", updatedSocialMedia);
    };
    return (
        <AppLayout>
            <PageTitle title={title} description={description} />

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="whatsapp_number"
                            className="text-base mb-1 after:content-['*'] after:text-red-500 after:ml-1"
                        >
                            Nomor WhatsApp (Sebagai target pesan otomatis dari
                            sistem)
                        </label>
                        <Input
                            type="tel"
                            name="whatsapp_number"
                            id="whatsapp_number"
                            placeholder="Masukkan nomor WhatsApp"
                            value={data.whatsapp_number ?? ""}
                            onChange={handleChange}
                            className={cn(
                                errors.whatsapp_number && "border-red-500",
                            )}
                        />
                        {errors.whatsapp_number && (
                            <ErrorInput error={errors.whatsapp_number} />
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="time_operational"
                            className="text-base mb-1 after:content-['*'] after:text-red-500 after:ml-1"
                        >
                            Jam Operasional
                        </label>
                        <Input
                            type="text"
                            name="time_operational"
                            id="time_operational"
                            placeholder="Masukkan jam operasional"
                            value={data.time_operational ?? ""}
                            onChange={handleChange}
                            className={cn(
                                errors.time_operational && "border-red-500",
                            )}
                        />
                        {errors.time_operational && (
                            <ErrorInput error={errors.time_operational} />
                        )}
                    </div>
                    <div className="flex flex-col w-full md:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <label
                                htmlFor="social_media"
                                className="text-base after:content-['*'] after:text-red-500 after:ml-1"
                            >
                                Media Sosial
                            </label>
                            <Button
                                onClick={addNewSocialMedia}
                                type="button"
                                variant={"yellow"}
                                size={"sm"}
                            >
                                <Plus />
                                <span>Tambah Media Sosial</span>
                            </Button>
                        </div>
                        {data.social_media.length > 0 ? (
                            data.social_media.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex flex-col lg:flex-row items-start gap-3">
                                        <div className="w-full">
                                            <SelectSearchInput
                                                options={AVAILABLE_SOCIAL_MEDIA}
                                                value={item.platform}
                                                onChange={(value) => {
                                                    const updatedSocialMedia = [
                                                        ...data.social_media,
                                                    ];
                                                    updatedSocialMedia[
                                                        index
                                                    ].platform =
                                                        value as SocialMedia["platform"];
                                                    setData(
                                                        "social_media",
                                                        updatedSocialMedia,
                                                    );
                                                }}
                                                placeholder="Pilih platform"
                                                className={cn(
                                                    errors[
                                                        `social_media.${index}.platform`
                                                    ] && "border-red-500",
                                                )}
                                            />
                                            {errors[
                                                `social_media.${index}.platform`
                                            ] && (
                                                <ErrorInput
                                                    error={
                                                        errors[
                                                            `social_media.${index}.platform`
                                                        ]
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <Input
                                                type="url"
                                                placeholder="Masukkan URL"
                                                value={item.url}
                                                onChange={(e) => {
                                                    const updatedSocialMedia = [
                                                        ...data.social_media,
                                                    ];
                                                    updatedSocialMedia[
                                                        index
                                                    ].url = e.target.value;
                                                    setData(
                                                        "social_media",
                                                        updatedSocialMedia,
                                                    );
                                                }}
                                                className={cn(
                                                    errors[
                                                        `social_media.${index}.url`
                                                    ] && "border-red-500",
                                                )}
                                            />
                                            {errors[
                                                `social_media.${index}.url`
                                            ] && (
                                                <ErrorInput
                                                    error={
                                                        errors[
                                                            `social_media.${index}.url`
                                                        ]
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div className="w-full lg:w-32 flex lg:items-start lg:pt-0">
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    removeSocialMedia(index)
                                                }
                                                variant={"red"}
                                                size={"icon"}
                                                className="w-full"
                                            >
                                                <Trash2 />
                                                <span className="lg:hidden">
                                                    Hapus{" "}
                                                    {item.platform
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        item.platform
                                                            .slice(1)
                                                            .toLowerCase()}
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="rounded-full h-[0.4px] mt-3 w-full bg-slate-500"></div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                Belum ada media sosial yang ditambahkan.
                            </p>
                        )}
                        {errors.social_media && (
                            <ErrorInput error={errors.social_media} />
                        )}
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full mt-6 p-3 bg-green-500 hover:bg-green-600"
                    disabled={processing}
                >
                    {processing ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <span className="flex items-center gap-2">
                            <Save />
                            <span>Simpan</span>
                        </span>
                    )}
                </Button>
            </form>
        </AppLayout>
    );
};

export default AppSettingIndex;
