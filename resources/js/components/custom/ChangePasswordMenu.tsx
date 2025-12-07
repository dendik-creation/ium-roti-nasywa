import { Lock } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChangePasswordMenu = () => {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/auth/change-password", {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    const handleClick = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpen(true);
    };

    return (
        <>
            <DropdownMenuItem
                key={"change-password"}
                className="flex w-full cursor-pointer items-center gap-2"
                onSelect={handleClick}
            >
                <Lock size={16} />
                Ubah Password
            </DropdownMenuItem>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ubah Password</DialogTitle>
                        <DialogDescription>
                            Masukkan password saat ini dan password baru Anda.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="current_password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Password Saat Ini
                            </label>
                            <Input
                                id="current_password"
                                type="password"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                placeholder="Password Saat Ini"
                            />
                            {errors.current_password && (
                                <span className="text-sm text-red-500">
                                    {errors.current_password}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="new_password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Password Baru
                            </label>
                            <Input
                                id="new_password"
                                type="password"
                                value={data.new_password}
                                onChange={(e) =>
                                    setData("new_password", e.target.value)
                                }
                                placeholder="Password Baru"
                            />
                            {errors.new_password && (
                                <span className="text-sm text-red-500">
                                    {errors.new_password}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="new_password_confirmation"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Konfirmasi Password Baru
                            </label>
                            <Input
                                id="new_password_confirmation"
                                type="password"
                                value={data.new_password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "new_password_confirmation",
                                        e.target.value
                                    )
                                }
                                placeholder="Konfirmasi Password Baru"
                            />
                            {errors.new_password_confirmation && (
                                <span className="text-sm text-red-500">
                                    {errors.new_password_confirmation}
                                </span>
                            )}
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setOpen(false);
                                    reset();
                                }}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                variant={"red"}
                                disabled={processing}
                            >
                                Ganti Password
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ChangePasswordMenu;
