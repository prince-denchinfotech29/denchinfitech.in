"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/pages/header/Header";
import Footer from "@/components/pages/header/footer/Footer";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Calendar, ChevronRight } from "lucide-react";
import { BlogDataResponse } from "@/components/auth/blogs";
import { useHomeData } from "@/hooks/useHomeData";

interface BlogDetailsPageProps {
  blogData: BlogDataResponse;
}

const BlogDetailsPage: React.FC<BlogDetailsPageProps> = ({ blogData }) => {
  const router = useRouter();

  if (!blogData) return <LoadingSpinner />;

  const { blog, popular_blogs: popularBlogs, extra_pages: extraPages } = blogData;
  const { homeData, navData } = useHomeData();


  return (
    <div className="min-h-screen bg-white">
      <Navbar homeData={homeData} navData={navData} />

      <header
        className="w-full py-20 mb-16 text-white text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(24,29,56,0.7), rgba(24,29,56,0.7)), url(${blog.banner_url || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0d6efd] bg-opacity-80" />
        <div className="relative max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold animate-pulse">{blog.heading}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex gap-10">
        <article className="flex-1">
          <Card className="mb-6 border shadow-sm hover:shadow-lg transition-shadow duration-300">
            {blog.image_url && (
              <div className="overflow-hidden">
                <img
                  src={blog.image_url}
                  alt={blog.heading}
                  className="w-full h-100 cursor-pointer transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {blog.created_date}
              </div>
              <h3 className="text-2xl font-bold mb-4">{blog.heading}</h3>
            <div 
              className="text-gray-700 leading-relaxed prose max-w-none" 
              dangerouslySetInnerHTML={{ __html: blog.blog_content || "" }} 
            />

            </div>
          </Card>
        </article>

        <aside className="w-80 flex-shrink-0 space-y-6">
          <Card className="p-6 shadow-sm bg-white sticky top-8">
            <h4 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Recent Posts</h4>
            <div className="space-y-4">
              {popularBlogs.map(
                (post) =>
                  post.slug && (
                    <Link key={post.id || post.slug} href={`/blog/${post.slug}`}>
                      <Card className="flex items-center gap-4 p-3 rounded-lg border hover:shadow-md transition-shadow duration-200 cursor-pointer">
                        <div className="w-16 h-12 overflow-hidden rounded">
                          <img
                            src={post.image_url || "/placeholder.svg"}
                            alt={post.heading}
                            loading="lazy"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h6 className="font-semibold text-sm text-blue-600 hover:text-blue-800 line-clamp-2 mb-1">
                            {post.heading}
                          </h6>
                        
                          
                        </div>
                      </Card>
                    </Link>
                  )
              )}
            </div>
          </Card>

          {extraPages?.length > 0 && (
            <Card className="p-6 shadow-sm bg-white sticky top-8">
              <h4 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">MORE SERVICES</h4>
              <ul>
                {extraPages.map((page) => (
                  <li key={page.id || page.heading} className="mb-2">
                    <Link href={`/${page.heading.toLowerCase().replace(/\s+/g, "-")}`}>
                      <span className="flex items-center text-gray-700 hover:text-blue-600 group cursor-pointer">
                        <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        {page.heading}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </aside>
      </main>

      <Footer homeData={homeData} />
    </div>
  );
};

export default BlogDetailsPage;
