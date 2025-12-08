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
import { CircleX } from "lucide-react";

const ModalDetailImage = ({
    images,
    product_name,
    isOpen,
    onOpenChange,
}: {
    images: string[];
    product_name: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const storage_images = Array.isArray(images)
        ? images.map((image) => `/storage/${image}`)
        : [];
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-7xl">
                <DialogHeader className="sticky top-0 bg-white pb-3 border-b">
                    <DialogTitle>Gambar dari {product_name}</DialogTitle>
                    <DialogDescription className="mb-3">
                        Gambar produk bisa lebih dari satu
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {storage_images.map((image, index) => (
                        <div
                            key={index}
                            className="border rounded-md p-2 flex flex-col justify-center items-center"
                        >
                            <img
                                src={image}
                                alt={`Gambar ${index + 1}`}
                                className="w-full h-48 object-cover rounded"
                            />
                            <p className="text-sm text-gray-600 mt-2">
                                Gambar {index + 1}
                            </p>
                        </div>
                    ))}
                </div>
                <DialogFooter className="mt-9">
                    <DialogClose asChild>
                        <Button
                            variant="red"
                            className="flex items-center gap-2"
                        >
                            <CircleX /> Tutup
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalDetailImage;
