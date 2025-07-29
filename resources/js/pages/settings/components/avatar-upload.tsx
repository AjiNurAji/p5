import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useInitials } from "@/hooks/use-initials";
import { cn } from "@/lib/utils";
import { SharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Camera, Loader } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export const AvatarUpload = () => {
  const {
    auth: { user },
  } = usePage<SharedData>().props;
  const getInitials = useInitials();
  const [tempImage, setTempImage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { post, data, setData, progress } = useForm<{ avatar?: File }>({
    avatar: undefined,
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file.size > maxSize) {
      toast.error("Ukuran file maksimal 2MB!");
      setLoading(false);
      return;
    }

    // create tmp url
    const tempUrl = URL.createObjectURL(file);
    setTempImage(tempUrl);

    // set data avatar on state form
    setData({ avatar: file });

    setLoading(false);
  };

  const handleSaveImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-2 w-full justify-center items-center">
      <div className="relative size-40 rounded-full">
        <Avatar className="size-full">
          <AvatarImage
            className="h-auto w-full object-cover"
            src={user.avatar || tempImage}
            alt={user.name}
          />
          <AvatarFallback className="text-3xl">
            {!loading ? (
              getInitials(user.name)
            ) : (
              <Loader className="animate-spin" />
            )}
          </AvatarFallback>
        </Avatar>

        {!loading && (
          <Label
            htmlFor="avatar"
            className={cn(
              buttonVariants({ variant: "default" }),
              "absolute right-4 bottom-2 flex size-8 cursor-pointer items-center justify-center overflow-hidden rounded-full",
            )}
          >
            <Camera className="size-4" />
          </Label>
        )}
      </div>
      {tempImage && (
        <div className="flex gap-3">
          <Button
            className="w-max"
            size="sm"
            onClick={(e) => handleSaveImage(e)}
          >
            Simpan Foto Profil
          </Button>
          <Button
            className="w-max"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setData({ avatar: undefined });
              setTempImage("");
            }}
          >
            Reset
          </Button>
        </div>
      )}
      <input
        type="file"
        accept=".jpg,.png,.webp,.jpeg,.gif"
        name="avatar"
        id="avatar"
        className="sr-only"
        onChange={(e) => handleImage(e)}
      />
    </div>
  );
};
