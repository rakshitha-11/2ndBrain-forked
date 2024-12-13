"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tag, Clock, Youtube, Loader2 } from 'lucide-react';

// Interface matching the database structure
interface YoutubeInterface {
    id: number;
    user_id: number;
    type: string;
    title: string;
    link: string;
    tags: string[];
    timestamp: string;
    body: string;
}

const YoutubeCard: React.FC = () => {
    const [content, setContent] = useState<YoutubeInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response:any = await axios.get<{ data: { rows: YoutubeInterface[] } }>(
                    "http://localhost:3000/api/v1/type", 
                    {
                        params: { type: "Youtube" },
                        headers: {
                            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzOTgxMDc0fQ.uIDFQSObWmH6n6c7ghppZy_S2UNbhk2xcx_rA96Jc_8"
                        }
                    }
                );
                console.log(response.data.content)
                setContent(response.data.content);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch Youtube posts", error);
                setError(error instanceof Error ? error : new Error('An unknown error occurred'));
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-red-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-red-500">Failed to load content: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {content.length === 0 ? (
                <div className="text-center text-gray-500">
                    No Youtube content available
                </div>
            ) : (
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
                                <div className="youtube-card w-full">
                                    <div className="relative w-full overflow-hidden">
                                    <iframe src={`https://www.youtube.com/embed/${item.link.split('/')[item.link.split('/').length-1]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-start mb-4">
                                            <Youtube className="w-6 h-6 mr-3 text-[#FF0000]" />
                                            <a 
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg font-semibold text-gray-800 hover:text-[#FF0000] transition-colors line-clamp-2"
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
                                                            bg-red-50 
                                                            text-red-700
                                                            hover:bg-red-100
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
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    text-[#FF0000] 
                                                    hover:text-[#CC0000] 
                                                    font-medium 
                                                    flex 
                                                    items-center 
                                                    transition-colors
                                                "
                                            >
                                                Watch Video
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
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default YoutubeCard;