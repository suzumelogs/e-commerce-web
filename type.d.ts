import { type } from "os"

type Billboard ={
    id:string,
    label:string,
    imageUrl:string,
}
type Category ={
    id:string,
    name:string,
    gender:string,
    imageUrl:string,
    billboard:Billboard,
}
type ProductResponse ={
    products:Product[],
    pagination:pagination,
}
type Product ={
    id:string,
    name:string,
    price:number,
    description:string,
    category:Category,
    Images:Image[],
    Sizes:ProductSize[],
    Colors:ProductColor[],
    rewiews:Review[],
}
type pagination ={
    total:number,
    per_page:number,
    page:number,
   total_pages:number,
};
type Image ={
    id:string,
    url:string,
}
type ProductSize ={
    id:string,
    value:string,
}
type ProductColor ={
    id:string,
    value:string,
    name:string,
}
type Review ={
    id:string,
    rating:number,
    comment:string,
    averageRating:number,
    createdAt: Date;
    images:Image[],
    product:ReviewProduct,
    user:User,
}
type User ={
    id:string,
    displayName:string,
    avatarUrl:string,
}
type ReviewProduct ={
    id:string,
    name:string,
    price:number,
    Images:Image[],
}
type CartProduct ={
    id:string,
    name:string,
    price:number,
    image:string,
    quantity:number,
    size:string,
    color:string,
}
type Order ={
    id:string,
    orderItems:orderItem[],
    createdAt: Date;
    deliveredAt: Date;
}
type orderItem ={
    id:string,
    product: {
        id: string;
        name: string;
        Images:Image[]; 
    }
    quantity:number,
    size:string,
    color:string,
}