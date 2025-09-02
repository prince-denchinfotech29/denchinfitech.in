"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/pages/header/Header";
import Footer from "@/components/pages/header/footer/Footer";
import { useHomeData } from "@/hooks/useHomeData";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Pagination from "@/components/pages/blog/Pagination";
import { getBlogs, Blog, BlogsResponse } from "@/components/auth/blogs";

const bannerImg = `${process.env.NEXT_PUBLIC_BASE_URL}imges/banner_news.jpg`;

const BlogsPage: React.FC = () => {
  const { homeData, navData, loading: homeLoading, error: homeError } = useHomeData();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getBlogs();
        setBlogs(data.blogs || []);
        setMeta(data.meta || {}); // Set meta data to state
        setPopularBlogs(data.blogs.slice(0, 4));
        setError(null);
      } catch (err) {
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBlogClick = (slug: string) => {
    if (!slug) return;
    router.push(`/blog/${slug}`);
  };

  if (homeLoading || loading) return <LoadingSpinner />;
  if (homeError || error)
    return <div className="p-10 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar homeData={homeData} navData={navData} />

      {/* Header */}
      <header
        className="w-full py-20 mb-16 text-white text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(24,29,56,0.7), rgba(24,29,56,0.7)), url(${bannerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[#0d6efd] bg-opacity-80"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">Blogs</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="main-content-row flex flex-wrap gap-8">
          {/* Blog Column */}
          <div className="left-content flex-1 min-w-[300px]">
            {currentBlogs.map((blog) => (
              <Card key={blog.slug} className="mb-6 border shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="overflow-hidden">
                  <img
                    src={blog.image_url || "/placeholder.svg"}
                    alt={blog.heading}
                    className="w-full h-64 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => handleBlogClick(blog.slug)}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {blog.added_date}
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
                    <button
                      onClick={() => handleBlogClick(blog.slug)}
                      className="text-left w-full text-gray-900 hover:text-blue-600"
                    >
                      {blog.heading}
                    </button>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.blog_short}</p>
                  <Button
                    onClick={() => handleBlogClick(blog.slug)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </div>

          {/* Sidebar */}
          <div className="right-sidebar">
            <Card className="bg-white p-6 shadow-sm  top-8 mb-4">
              <h4 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                Recent Posts
              </h4>
              <div className="space-y-4">
                {popularBlogs.slice(0, 4).map((post) => (
                  <div
                    key={post.slug}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => handleBlogClick(post.slug)}
                  >
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                      <img
                        src={post.image_url || "/placeholder.svg"}
                        alt={post.heading}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h6 className="font-semibold text-sm text-blue-600 hover:text-blue-800 line-clamp-2 mb-1">
                        {post.heading}
                      </h6>
                      <p className="text-xs text-gray-500">{post.added_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer homeData={homeData} />
    </div>
  );
};

export default BlogsPage;
