import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "@/api/AuthApi";
import { toast } from "react-toastify";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  openUpdateModal: boolean;
  setOpenUpdateModal: (open: boolean) => void;
  selectedUser: any;
  token: string;
  refetch: () => void;
};
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(3, "Message must be at least 3 characters"),
});

type FormData = z.infer<typeof schema>;

const UpdateUserContact = ({
  openUpdateModal,
  setOpenUpdateModal,
  selectedUser,
  token,
  refetch,
}: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["contact-details", selectedUser?._id],
    queryFn: async () => {
      const res = await api.get(`/admin/contacts/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.contact;
    },
    enabled: !!selectedUser?._id && openUpdateModal, // ✅ important
  });

  useEffect(() => {
    if (userDetails) {
      setValue("username", userDetails.username || "");
      setValue("email", userDetails.email || "");
      setValue("message", userDetails.message || "");
    }
  }, [userDetails, setValue]);

  const updateMutation = useMutation({
    mutationFn: async (userData: FormData) => {
      await api.patch(
        `/admin/contacts/update/${selectedUser._id}`, // ✅ fix id
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    },
    onSuccess: () => {
      toast.success("Contact updated successfully");
      refetch();
      setOpenUpdateModal(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update contact");
    },
  });

  const onsubmit = (formData: FormData) => {
    updateMutation.mutate(formData);
  };

  return (
    <Dialog open={openUpdateModal} onOpenChange={setOpenUpdateModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Contact</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p>Loading contact details...</p>
        ) : (
          <div className="space-y-4 mt-2" onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col gap-2">
              <Label>Username</Label>
              <Input {...register("username")} />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input {...register("email")} />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Message</Label>
              <Input {...register("message")} />
              {errors.message && (
                <p className="text-red-500">{errors.message.message}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpenUpdateModal(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit(onsubmit)}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserContact;
