import { Bell, Search, Menu, User } from "lucide-react";
import { Input } from "../ui/input";

const HeaderAdmin = () => {
  return (
    <div className="w-full flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle */}
        <button className="p-2 rounded-md hover:bg-muted">
          <Menu className="w-5 h-5" />
        </button>

        {/* Title */}
        {/* <h2 className="text-base md:text-lg font-semibold">Dashboard</h2> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center border border-border rounded-md px-3 py-1 bg-background">
          <Search className="w-4 h-4 mr-2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-6 p-0"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-md hover:bg-muted">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-muted px-2 py-1 rounded-md">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden md:block text-sm font-medium">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
