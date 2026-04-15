// "use client";
// import { createFileRoute } from "@tanstack/react-router";

// import { Pencil, Trash2 } from "lucide-react";

// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";

// import { Button } from "@/components/ui/button";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { api } from "@/api/AuthApi";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useAuth } from "@/components/store/auth";

// type User = {
//   _id: number;
//   username: string;
//   email: string;
//   message: string;
// };

// export const Route = createFileRoute("/admin/customers")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   const { token } = useAuth();
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [openUpdateModal, setOpenUpdateModal] = useState(false);

//   const {
//     data: contactsData,
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["contacts-list"],
//     queryFn: async () => {
//       const res = await api.get("/admin/contacts", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("contactsData", res?.data);
//       return res?.data;
//     },
//     enabled: !!token,
//   });

//   const deleteMutation = useMutation({
//     mutationFn: async (userId: number) => {
//       await api.delete(`/admin/users/delete/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     },
//     onSuccess: () => {
//       toast.success("User deleted successfully");
//       refetch();
//     },
//     onError: (error) => {
//       console.log(error);
//       toast.error("Failed to delete user");
//     },
//   });

//   const handleDeleteUser = () => {
//     if (!selectedUser?._id) return;
//     deleteMutation.mutate(selectedUser._id);
//     setOpenDeleteModal(false);
//     setSelectedUser(null);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <>
//       <Card className="bg-white border border-gray-200 rounded-xl shadow-sm gap-0 ">
//         {/* Header */}
//         <CardHeader className="flex flex-row items-center justify-between border-b py-0">
//           <CardTitle className="text-base font-semibold">
//             User Contacts List
//           </CardTitle>
//         </CardHeader>

//         {/* Table */}
//         <CardContent className="p-0 flex-1 flex flex-col">
//           <div className="flex-1 overflow-y-auto max-h-[730px]">
//             <Table className="min-w-full">
//               {/* Header */}
//               <TableHeader>
//                 <TableRow className="bg-gray-50 border-b">
//                   <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
//                     Name
//                   </TableHead>
//                   <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
//                     Email
//                   </TableHead>
//                   <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
//                     Message
//                   </TableHead>
//                   <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600">
//                     Action
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>

//               {/* Body */}
//               <TableBody>
//                 {contactsData?.map((user: User, index: number) => (
//                   <TableRow
//                     key={index}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     {/* Name */}
//                     <TableCell className="px-6 font-medium text-gray-800">
//                       {user.username || "-"}
//                     </TableCell>

//                     {/* Email */}
//                     <TableCell className="px-6 text-gray-500">
//                       {user.email || "-"}
//                     </TableCell>
//                     <TableCell className="px-6 text-gray-500">
//                       {user.message || "-"}
//                     </TableCell>

//                     {/* Actions */}
//                     <TableCell className="px-6 ">
//                       <div className="flex gap-2">
//                         <Button
//                           size="icon"
//                           variant="outline"
//                           className="h-8 w-8 text-yellow-500 border-yellow-200 hover:bg-yellow-50"
//                           onClick={() => {
//                             setOpenUpdateModal(true);
//                             setSelectedUser(user);
//                           }}
//                         >
//                           <Pencil size={14} />
//                         </Button>

//                         <Button
//                           size="icon"
//                           variant="outline"
//                           className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50"
//                           onClick={() => {
//                             setOpenDeleteModal(true);
//                             setSelectedUser(user);
//                           }}
//                         >
//                           <Trash2 size={14} />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}

//                 {/* Empty State */}
//                 {contactsData?.length === 0 && (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="text-center py-10 text-gray-400"
//                     >
//                       No users found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//       <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
//         <DialogContent>
//           <DialogHeader className="space-y-0">
//             <DialogTitle className="text-lg font-semibold text-red-600">
//               Delete User
//             </DialogTitle>

//             <DialogDescription className="text-sm leading-relaxed">
//               Are you sure you want to delete <b>{selectedUser?.username}</b>?
//               This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>

//           {/* Actions */}
//           <div className="flex items-center justify-end gap-2 mt-4">
//             <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
//               Cancel
//             </Button>

//             <Button
//               variant="destructive"
//               onClick={handleDeleteUser}
//               disabled={deleteMutation?.isPending}
//             >
//               {deleteMutation?.isPending ? "Deleting..." : "Delete"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//       {/* <UpdateUser
//         openUpdateModal={openUpdateModal}
//         setOpenUpdateModal={setOpenUpdateModal}
//         selectedUser={selectedUser}
//         token={token}
//         refetch={refetch}
//       /> */}
//     </>
//   );
// }
