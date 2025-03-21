import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const{loading,blogs}=useBlogs();
    if(loading){
        return <div className="bg-[#E7E0D3]">
            <Appbar></Appbar>
            <div className="flex justify-center">
            <div>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            </div>

            </div>
        </div>
    }
    {console.log(blogs)}

    return <div className="bg-[#E7E0D3] min-h-screen w-screen">
        <Appbar></Appbar>
    <div className="flex justify-center">
        <div className="max-w-xl">
        {blogs.map(blog=><BlogCard authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate=""/>)}
        </div>
    </div>
    </div> 
}