// this component is used to display the list of products
import NoResults from "./ui/no-results";
import ProductCart from "./ui/product-card";
import AnimatedText from "./ui/AnimatedText";
import { Product } from "@/type";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
}) => {
 
 
  return (
    <>
    <div className="space-y-4">
      {items && <div className="flex gap-x-2 p-2">
      {title.split('').map((letter,index)=>(
        <AnimatedText  key={index}>
          {letter === " " ? "\u00A0" : letter}
        </AnimatedText>
      ))}

      </div>
}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {items && items.map((item) => (
          <div key={item.id}>
            <ProductCart data={item} />
          </div>
        ))}
      </div>
    </div>
    </>
   );
}
 
export default ProductList;