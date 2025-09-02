import { getBlogBySlug } from "@/components/auth/blogs";
import BlogDetailsPage from "@/components/pages/blog/Blogdetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const data = await getBlogBySlug(params.slug);
    if (!data) {
      notFound();
    }
    return {
      title: data.meta.meta_title,
      description: data.meta.meta_description,
      keywords: data.meta.meta_keyword,
      openGraph: {
        title: data.meta.meta_title,
        description: data.meta.meta_description,
        type: "article",
        url: `https://denchinfotech.in/blog/${params.slug}`,
        images: [
          {
            url: data.blog.banner_url || data.blog.image_url || "",
            alt: data.blog.heading,
          },
        ],
      },
    };
  } catch {
    notFound();
  }
}

export default async function BlogSlugPage({ params }: { params: { slug: string } }) {
  try {
    const blogData = await getBlogBySlug(params.slug);
    if (!blogData) {
      notFound();
    }
    return <BlogDetailsPage blogData={blogData} />;
  } catch (error: any) {
    // Check specifically for "Category not found" error message
    if (error.message === "Category not found") {
      // Render a friendly fallback UI component here
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <h2 className="text-xl font-semibold text-red-600 text-center">
            Blog category not found. Please try another article.
          </h2>
        </div>
      );
    }
    // For all other errors fallback to 404 page
    notFound();
  }
}
