import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


export const Appbar=()=>{
    return <div className="border-b flex justify-between px-10 py-4 my-4">
        <Link to={'/'}>
        <div>
        <img className="mt-2 h-12 w-12 rounded-[5px]" src="./BlogHaven.png" alt="BlogHaven" />
        </div>
        </Link>
        <div>
            <Link to={'/publish'}>
        <button type="button" className="mr-8 focus:outline-none text-white bg-[#A18162] hover:bg-[#926F51] focus:ring-4 focus:ring-[#734C23] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
        </Link>
            <Avatar name="harkirat" size={"big"}></Avatar>
        </div>

    </div>
}