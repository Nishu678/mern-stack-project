import { Link, useLocation } from "@tanstack/react-router";
import {
  ShoppingCart,
  LayoutDashboard,
  Package,
  Users,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    name: "Products",
    icon: Package,
    path: "/admin/products",
  },
  {
    name: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const SidebarAdmin = () => {
  const location = useLocation(); // Detects current route where we are,used for active menu highlighting

  return (
    <aside className="w-64 h-screen bg-primary text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold">ShopEasy</h1>
            <p className="text-xs text-white/70">Everything You Need</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-white text-primary font-semibold"
                    : "hover:bg-white/10"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 text-xs text-white/60">
        © 2026 ShopEasy
      </div>
    </aside>
  );
};

export default SidebarAdmin;
