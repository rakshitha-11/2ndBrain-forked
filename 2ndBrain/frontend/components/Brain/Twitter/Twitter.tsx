"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader2, AlertTriangle, Twitter } from 'lucide-react'
import { Clock, Tag } from 'lucide-react';

interface Twitter {
    id: number,
    user_id: number,
    type: string,
    title: string,
    link: string,
    tags: string[],
    timestamp: string,
    body: string
}

const TwitterPage = () => {
    const [content, setContent] = useState<Twitter[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost:3000/api/v1/type?type=Twitter", {
                    headers: {
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzOTgxMDc0fQ.uIDFQSObWmH6n6c7ghppZy_S2UNbhk2xcx_rA96Jc_8"
                    }
                });
                console.log(response.data.content)
                setContent(response.data.content)
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch Twitter posts", error);
                setIsLoading(false);
            }
        };

        fetchData();

        // Twitter widget script loading
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                    <p className="mt-4 text-gray-600">Loading tweets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.map((item) => {
            const isLongContent = item.body.length > 200;
            
            return (
              <div 
                key={item.id} 
                className={`
                  bg-white 
                  rounded-2xl 
                  border 
                  border-gray-200 
                  shadow-lg 
                  hover:shadow-xl 
                  transition-all 
                  duration-300 
                  overflow-hidden
                  group
                  ${isLongContent 
                    ? 'md:col-span-2 lg:col-span-2' 
                    : 'col-span-1'
                  }
                `}
              >
                <blockquote 
                  className="twitter-tweet w-full p-6" 
                  data-theme="light"
                >
                  <div className="flex items-start mb-4">
                    <Twitter className="w-6 h-6 mr-3 text-[#1DA1F2]" />
                    <a 
                      href={`https://twitter.com/x/status/${
                        item.link.split("/")[item.link.split("/").length - 1]
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-800 hover:text-[#1DA1F2] transition-colors"
                    >
                      {item.title}
                    </a>
                  </div>
  
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="
                            inline-flex 
                            items-center 
                            px-2.5 
                            py-0.5 
                            rounded-full 
                            text-xs 
                            font-medium 
                            bg-blue-50 
                            text-blue-700
                            hover:bg-blue-100
                            transition-colors
                          "
                        >
                          <Tag className="w-3 h-3 mr-1.5 opacity-70" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
  
                  <div className="flex items-center justify-between text-gray-500 text-sm border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{item.timestamp}</span>
                    </div>
                    <a 
                      href={`https://twitter.com/x/status/${
                        item.link.split("/")[item.link.split("/").length - 1]
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        text-[#1DA1F2] 
                        hover:text-[#0c86d1] 
                        font-medium 
                        flex 
                        items-center 
                        transition-colors
                      "
                    >
                      View Thread
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" 
                        />
                      </svg>
                    </a>
                  </div>
                </blockquote>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default TwitterPage;