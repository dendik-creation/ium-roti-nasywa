import { ProductCategory } from "@/types/product_category";
import { useForm } from "@inertiajs/react";
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
import { CircleFadingPlus, CircleX, Loader, Pencil, Save } from "lucide-react";
import { ErrorInput } from "@/components/custom/FormElement";
import { Textarea } from "@/components/ui/textarea";

const ModalCategoryEdit = ({ category }: { category: ProductCategory }) => {
    const {
        data,
        setData,
        errors,
        clearErrors,
        setError,
        reset,
        put,
        processing,
    } = useForm({
        name: category.name || "",
        description: category.description || "",
    });
    const validateForm = (): boolean => {
        let isValid = true;
        clearErrors();
        if (!data.name || data.name.trim() === "") {
            setError("name", "Nama kategori wajib diisi.");
            isValid = false;
        }
        return isValid;
    };
    const handleChange = (key: keyof typeof data, value: string) => {
        setData(key, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        put(`/admin/category/${category.id}`, {
            preserveScroll: true,
            onSuccess: () => reset(),
            replace: true,
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={"blue"}>
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Edit Kategori</DialogTitle>
                    <DialogDescription className="mb-3">
                        Silakan perbarui data kategori produk
                    </DialogDescription>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div className="flex flex-col w-full">
                            <label className="text-base mb-1 after:content-['*'] after:text-red-500 after:ml-1">
                                Nama Kategori
                            </label>
                            <Input
                                type="text"
                                placeholder="Masukkan Nama Kategori"
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
                            <label className="text-base mb-1">Deskripsi</label>
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
                    </div>
                </DialogHeader>
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
export default ModalCategoryEdit;
