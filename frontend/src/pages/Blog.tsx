// import { useParams } from "react-router-dom";
// import { useBlogs,useBlogs } from "../hooks";
// import { ReactNode } from "react";
// export const Blog=()=>{
//     const {id}=useParams();
//     const {loading,blogs}=useBlog({
//         id: id || ""
//     });
//     if(loading){
//         return <div>
//             loading...
//         </div>
//     }
//     return <><div>
//     {blogs as ReactNode}
//     </div>
//     </>
// }

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FBlog";
import { Spinner } from "../components/Spinner";

export const Blog=()=>{
    const {id}=useParams();
    const {loading,blog}=useBlog({
        id:id || ""
    });
    if(loading){
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center text-center">
            <Spinner></Spinner>
            </div>
           
        </div>
    }
    console.log(blog)
    return <div>
        {/* @ts-ignore */}
        <FullBlog blog={blog}></FullBlog>
        
    </div>

}