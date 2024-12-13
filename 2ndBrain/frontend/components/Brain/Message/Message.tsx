"use client"
import axios from 'axios';
import { div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react'
import { Clock, Tag } from 'lucide-react';

interface Message{
    id: number,
    user_id: number,
    type: String,
    title: String,
    link: String,
    tags: String[],
    timestamp: String,
    body: String
}

const Message = () => {
    const [content, setContent] = useState<Message[]>([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const data: any = await axios.get("http://localhost:3000/api/v1/type?type=Message", {
                    headers: {
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzM0MDkzNjE3fQ.-jXfXpL0563Ykabw56QUIRoyLJdDcE4CKX6IlEj3gC8"
                    }
                });
                
                setContent(data.data.content)
                console.log(data.data.content)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {content && content?.map((item, index) => (
          <div 
            key={index} 
            className="
              bg-white 
              shadow-lg 
              rounded-xl 
              overflow-hidden 
              transition-all 
              duration-300 
              hover:shadow-2xl 
              border 
              border-gray-200
            "
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">
                {item.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {item.body}
              </p>
              
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
                        bg-blue-100 
                        text-blue-800
                      "
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>{item.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Message
