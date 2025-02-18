import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
    <Appbar></Appbar>
    <div className="flex justify-center">
    <div className="grid grid-cols-12 px-18 w-full pt-200 max-w-screen-2xl pt-12">
        <div className="grid-red-200 col-span-8">
            <div className="text-3xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-gray text-slate-500 pt-4">
                Post on 2nd December 2023
            </div>
            <div className="grid-green-200 col-span-4">
            {blog.content}
            </div>
        </div>
        <div className="bg-white col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
            <div className="pr-2">
            <Avatar name={blog.author.name || "Anonymous"} size="big"></Avatar>
            </div>
            <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
            </div>
            <div className="pt-2 text-slate-500">
                Random catch phrase about the author's ability to grab the user's attention
            </div>
            </div>
           
          
        </div>

    </div> 
    </div>
    </div>
}