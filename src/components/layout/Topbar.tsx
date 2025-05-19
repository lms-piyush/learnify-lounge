
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Topbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex-1"></div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search courses, tutors..."
            className="pl-10 pr-4 w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(e.target.value.length > 0);
            }}
          />
        </div>

        {/* Search Results Dropdown */}
        {isSearching && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-2">
            <div className="py-2">
              <p className="px-3 text-sm font-medium text-gray-500">No results found</p>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <Button variant="link" className="w-full justify-center text-[#8A5BB7]">
                View All Results
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex-1 flex items-center justify-end space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#BA8DF1]"></span>
          </Button>
        </div>
        
        <Link to="/profile">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-[#8A5BB7] flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium hidden md:inline-block">Student</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
