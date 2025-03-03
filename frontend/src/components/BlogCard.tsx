interface BlogCardProps{
    authorName:string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard=({authorName,title,content,publishedDate}:BlogCardProps)=>{
    return <div className="p-4 m-4 bg-white border-b border-[#A18162] rounded-[10px] border-2 hover:border-[#926F51] w-50">
        <div className="flex">
            <div className="flex justify-center flex-col">
            <Avatar size={"small"} name={authorName}></Avatar>
            </div>
            <div className="my-4 font-extralight pl-2">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle></Circle>
            </div>
            <div className="pl-2 font-thin text-slate-500 flex justify-center">
                {publishedDate}
            </div>
        </div>
        <div className="font-bold text-xl">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,200)+"..."}
        </div>
        <div className=" h-1 my-4 w-full text-slate-400" >
        {`${Math.ceil(content.length/100)} minute(s) read`}

        </div>
    </div>

}
export function Avatar({name,size="small"}:{name:string,size:"small"|"big"}){
    return (
    <div className={`m-4 relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-[10px] border-2 border-[#926F51]
    ${size==="small"? "w-6 h-6":"w-10 h-10"} `}>
        <span className="text-xs font-extralight text-gray-300 dark:text-gray-300">{name[0]}</span>
    </div>
    )
    
}
function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}