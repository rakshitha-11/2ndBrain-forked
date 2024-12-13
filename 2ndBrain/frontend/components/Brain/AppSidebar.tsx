"use client"
import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  User, 
  Calendar, 
  BarChart2, 
  Mail,
  Twitter,
  FileText,
  Youtube,
  Tag,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

// Define your sidebar items
const sidebarItems = [
  { 
    title: "Dashboard", 
    icon: Home, 
    url: "/" 
  },
//   { 
//     title: "Profile", 
//     icon: User, 
//     url: "/profile" 
//   },
//   { 
//     title: "Analytics", 
//     icon: BarChart2, 
//     url: "/analytics" 
//   },
//   { 
//     title: "Calendar", 
//     icon: Calendar, 
//     url: "/calendar" 
//   },
  { 
    title: "Messages", 
    icon: Mail, 
    url: "/userBrain" 
  },
//   { 
//     title: "Settings", 
//     icon: Settings, 
//     url: "/settings" 
//   }
];

const socialLinks = [
  {
    title: "Twitter",
    icon: Twitter,
    url: "/userTwitter"
  },
  {
    title: "Docs",
    icon: FileText,
    url: "/docs"
  },
  {
    title: "YouTube",
    icon: Youtube,
    url: "/userUtube"
  },
  {
    title: "Tags",
    icon: Tag,
    url: "/tags"
  }
];

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`fixed left-0 top-20 h-[calc(100vh-5rem)] 
        bg-white border-r shadow-md flex flex-col 
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-16'}`}
    >
      <TooltipProvider>
        <nav className="w-full flex-grow">
          {/* App Navigation Items */}
          <div className="space-y-2 py-4">
            {sidebarItems.map((item) => (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <a 
                    href={item.url} 
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors group"
                  >
                    <item.icon 
                      className="text-gray-600 group-hover:text-blue-500 transition-colors" 
                      size={24} 
                    />
                    {isExpanded && (
                      <span className="ml-3 text-gray-700 group-hover:text-blue-500">
                        {item.title}
                      </span>
                    )}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Social Links */}
          <div className="border-t pt-4 space-y-2">
            {socialLinks.map((item) => (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <a 
                    href={item.url} 
                    
                    rel="noopener noreferrer"
                    className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors group"
                  >
                    <item.icon 
                      className="text-gray-600 group-hover:text-blue-500 transition-colors" 
                      size={24} 
                    />
                    {isExpanded && (
                      <span className="ml-3 text-gray-700 group-hover:text-blue-500">
                        {item.title}
                      </span>
                    )}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </nav>

        {/* Expand/Collapse Button */}
        <div className="border-t p-2 flex justify-center">
          <button 
            onClick={toggleSidebar} 
            className="hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            {isExpanded ? <ChevronsLeft size={24} /> : <ChevronsRight size={24} />}
          </button>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default AppSidebar;