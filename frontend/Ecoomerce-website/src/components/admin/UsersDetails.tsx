"use client";

import { Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/api/AuthApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateUser from "./UpdateUser";
import { TableSkeleton } from "../common/TableSkelton";

type User = {
  _id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  status: string;
  phone: [
    {
      number: string;
    },
  ];
};

const UsersDetails = () => {
  const { token } = useAuth();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const getRoleStyle = (isAdmin: boolean) => {
    return isAdmin
      ? "bg-green-100 text-green-600"
      : "bg-blue-100 text-blue-600";
  };

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users-list"],
    queryFn: async () => {
      const res = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("usersData", res?.data);
      return res?.data;
    },
    enabled: !!token,
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: number) => {
      await api.delete(`/admin/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete user");
    },
  });

  const handleDeleteUser = () => {
    if (!selectedUser?._id) return;
    deleteMutation.mutate(selectedUser._id);
    setOpenDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm gap-0 ">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between border-b py-0">
          <CardTitle className="text-base font-semibold">Users List</CardTitle>

          <Button size="sm" className="bg-primary text-white">
            + Add User
          </Button>
        </CardHeader>

        {/* Table */}
        <CardContent className="p-0 flex-1 flex flex-col">
          <div className="overflow-y-auto max-h-[300px]">
            <Table className="min-w-full">
              {/* Header */}
              <TableHeader>
                <TableRow className="bg-gray-50 border-b">
                  <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
                    Name
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
                    Email
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
                    Role
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
                    Phone No.
                  </TableHead>
                  <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Body */}
              <TableBody>
                {isLoading ? (
                  <TableSkeleton rows={5} cols={5} />
                ) : usersData?.length > 0 ? (
                  usersData.map((user: User, index: number) => (
                    <TableRow
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Name */}
                      <TableCell className="px-6 font-medium text-gray-800">
                        {user.username || "-"}
                      </TableCell>

                      {/* Email */}
                      <TableCell className="px-6 text-gray-500">
                        {user.email || "-"}
                      </TableCell>

                      {/* Role */}
                      <TableCell className="px-6">
                        <Badge
                          variant="secondary"
                          className={`px-3 py-1 text-xs rounded-full font-medium ${getRoleStyle(
                            user.isAdmin,
                          )}`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </Badge>
                      </TableCell>

                      {/* Phone */}
                      <TableCell className="px-6">
                        {user?.phone?.length > 0
                          ? user.phone.map((p) => p.number).join(", ")
                          : "-"}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-6">
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-yellow-500 border-yellow-200 hover:bg-yellow-50"
                            onClick={() => {
                              setOpenUpdateModal(true);
                              setSelectedUser(user);
                            }}
                          >
                            <Pencil size={14} />
                          </Button>

                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setSelectedUser(user);
                            }}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="min-h-[200px] flex items-center justify-center text-gray-400">
                        No users found
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent>
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-lg font-semibold text-red-600">
              Delete User
            </DialogTitle>

            <DialogDescription className="text-sm leading-relaxed">
              Are you sure you want to delete <b>{selectedUser?.username}</b>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={deleteMutation?.isPending}
            >
              {deleteMutation?.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <UpdateUser
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        selectedUser={selectedUser}
        token={token}
        refetch={refetch}
      />
    </>
  );
};

export default UsersDetails;
