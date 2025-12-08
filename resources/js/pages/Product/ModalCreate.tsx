import { useForm, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CircleFadingPlus, CircleX, Loader, Save } from "lucide-react";
import { ErrorInput, SelectSearchInput } from "@/components/custom/FormElement";
import { Textarea } from "@/components/ui/textarea";
import { SelectOption } from "@/types/global";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginImagePreview);

type PageProps = {
    categories: SelectOption[];
};

const ModalProductCreate = () => {
    const { props } = usePage<PageProps>();
    const categories = props.categories || [];

    const {
        data,
        setData,
        errors,
        clearErrors,
        setError,
        reset,
        post,
        processing,
    } = useForm({
        name: "",
        description: "",
        price: "",
        category_id: "" as string | number,
        images: null as File[] | null,
    });

    const validateForm = (): boolean => {
        let isValid = true;
        clearErrors();

        if (!data.name || data.name.trim() === "") {
            setError("name", "Nama produk wajib diisi.");
            isValid = false;
        }

        if (!data.description || data.description.trim() === "") {
            setError("description", "Deskripsi produk wajib diisi.");
            isValid = false;
        }

        if (!data.category_id) {
            setError("category_id", "Kategori produk wajib diisi.");
            isValid = false;
        }

        if (data.price === "" || data.price === null) {
            setError("price", "Harga produk wajib diisi.");
            isValid = false;
        } else {
            const priceNum = Number(data.price);
            if (Number.isNaN(priceNum) || priceNum <= 0) {
                setError("price", "Harga harus berupa angka lebih dari 0.");
                isValid = false;
            }
        }
        if (!data.images || data.images.length === 0) {
            setError("images", "Gambar produk wajib diisi.");
            isValid = false;
        }
        return isValid;
    };
    const handleChange = (
        key: "name" | "description" | "price" | "category_id",
        value: string,
    ) => {
        setData(key, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        post("/admin/product", {
            preserveScroll: true,
            onSuccess: () => reset(),
            replace: true,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="w-full lg:w-fit">
                    <Button variant={"yellow"} className="w-full lg:w-fit">
                        <CircleFadingPlus />
                        <span>Tambah Produk</span>
                    </Button>
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-7xl">
                <DialogHeader className="sticky top-0 bg-white pb-3 border-b">
                    <DialogTitle>Tambah Produk</DialogTitle>
                    <DialogDescription className="mb-3">
                        Silakan isi data produk baru
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-96 overflow-y-auto px-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="flex flex-col w-full">
                            <label className="text-base mb-1 after:content-['*'] after:text-red-500 after:ml-1">
                                Nama Produk
                            </label>
                            <Input
                                type="text"
                                placeholder="Masukkan Nama Produk"
                                className="w-full"
                                disabled={processing}
                                value={data.name || ""}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                            />
                            {errors.name && <ErrorInput error={errors.name} />}
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-base mb-1 after:content-['*'] after:text-red-500 after:ml-1">
                                Harga
                            </label>
                            <Input
                                type="number"
                                inputMode="numeric"
                                placeholder="Masukkan Harga"
                                className="w-full"
                                disabled={processing}
                                value={data.price || ""}
                                onChange={(e) =>
                                    handleChange("price", e.target.value)
                                }
                            />
                            {errors.price && (
                                <ErrorInput error={errors.price} />
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-base mb-1 after:content-['*'] after:text-red-500 after:ml-1">
                                Kategori
                            </label>
                            <SelectSearchInput
                                options={categories}
                                value={data.category_id.toString() || ""}
                                onChange={(value) =>
                                    handleChange(
                                        "category_id",
                                        value.toString(),
                                    )
                                }
                                placeholder="Pilih Kategori"
                                removeValue={() =>
                                    handleChange("category_id", "")
                                }
                            />

                            {errors.category_id && (
                                <ErrorInput error={errors.category_id} />
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-base mb-1 after:content-['*'] after:text-red-500 after:ml-1">
                                Deskripsi
                            </label>
                            <Textarea
                                placeholder="Masukkan deskripsi"
                                className="w-full"
                                disabled={processing}
                                value={data.description || ""}
                                onChange={(e) =>
                                    handleChange("description", e.target.value)
                                }
                            ></Textarea>
                            {errors.description && (
                                <ErrorInput error={errors.description} />
                            )}
                        </div>
                        <div className="flex flex-col w-full md:col-span-2">
                            <label className="text-base mb-1 after:content-['*'] after:text-red-500 after:ml-1">
                                Gambar Produk
                            </label>
                            <FilePond
                                allowProcess={false}
                                allowMultiple={true}
                                allowImagePreview={true}
                                allowPaste={true}
                                files={data.images || []}
                                allowReorder={true}
                                onupdatefiles={(fileItems) => {
                                    const selectedFiles = fileItems.map(
                                        (item) => item.file as File,
                                    );
                                    setData(
                                        "images",
                                        selectedFiles.length > 0
                                            ? selectedFiles
                                            : null,
                                    );
                                }}
                                acceptedFileTypes={[
                                    "image/jpeg",
                                    "image/jpg",
                                    "image/png",
                                    "image/gif",
                                    "image/webp",
                                ]}
                                labelIdle='<span class="filepond--label-action">Pilih Gambar Produk</span>'
                            />
                            {errors.images && (
                                <ErrorInput error={errors.images} />
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-9">
                    <DialogClose asChild disabled={processing}>
                        <Button
                            variant="red"
                            disabled={processing}
                            className="flex items-center gap-2"
                        >
                            <CircleX /> Batalkan
                        </Button>
                    </DialogClose>
                    <Button
                        variant="yellow"
                        disabled={processing}
                        onClick={handleSubmit}
                        className="flex items-center gap-2"
                    >
                        {processing ? (
                            <Loader />
                        ) : (
                            <span className="flex items-center gap-2">
                                <Save /> Simpan
                            </span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalProductCreate;
