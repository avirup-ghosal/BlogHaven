import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {Hono} from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    },
    Variables:{
        userId:string;
    }
}>();
blogRouter.use("/*",async (c,next)=>{
    const authHeader=c.req.header("authorization") || "";
    try{const user=await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userId",user.id as string);
        await next();
    }else{
        return c.json({
            message:"You are not logged in"
        })
    }}catch(e){
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
})
blogRouter.post('/',async (c)=>{
    const body=await c.req.json();
    const authorId=c.get("userId");
    const prisma=new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:Number(authorId)
        }
    })
    return c.json({
        id:blog.id
    })
})
blogRouter.put('/',async (c)=>{
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })
    return c.json({
        id:blog.id
    });
})
blogRouter.get('/bulk',async (c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs=await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    
    return c.json({
        blogs
    })
})
blogRouter.get('/:id',async (c)=>{
    const id=await c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

  try{
      const blog = await prisma.blog.findFirst({
        where:{
            id:Number(id)
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })

    return c.json({
        blog
    });
}catch(e){
    c.status(411);
    return c.json({
        message:"Error while fetching blog post"
    })
}
})

blogRouter.get('/paginated', async (c) => {
    const page = Number(c.req.query('page')) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        skip,
        take: pageSize,
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                },
            },
        },
    });

    const totalBlogs = await prisma.blog.count();
    const totalPages = Math.ceil(totalBlogs / pageSize);

    return c.json({
        blogs,
        totalPages,
        currentPage: page,
        pageSize,
    });
});
