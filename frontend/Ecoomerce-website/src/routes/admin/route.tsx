import { api } from "@/api/AuthApi";
import HeaderAdmin from "@/components/common/HeaderAdmin";
import SidebarAdmin from "@/components/common/SidebarAdmin";
import { useAuth } from "@/components/store/auth";
import { useQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user-details", token],
    queryFn: async () => {
      const res = await api.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (!isLoading && user) {
      if (!user?.isAdmin) {
        navigate({ to: "/" }); // Redirect non-admin users to home page
      }
    }
  }, [user, isLoading, navigate]);
  //jb tk user data ni ata tab tk loading state me raho, jb data aa jaye tab check kro ki admin hai ya ni, agar ni hai to home page pe redirect krdo

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 shadow-md">
          <HeaderAdmin />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 bg-[#f0f9f9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
