import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  // const handleShare = () => {
  //   const productUrl = `${window.location.origin}/shop/home/${product?._id}`;
  //   console.log(productUrl, "productUrlproductUrl")
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: product?.title,
  //         url: productUrl,
  //       })
  //       .then(() => console.log("Product shared!"))
  //       .catch((error) => console.error("Error sharing", error));
  //   } else {
  //     navigator.clipboard.writeText(productUrl);
  //     alert("Product link copied to clipboard!");
  //   }
  // };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          {/* {
            console.log(product,"productproductproduct") category
          } */}
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 opacity-60">
            {product.category}
          </Badge>

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice < 300 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
              Lowest price
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            {/* <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span> */}
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          // <div className="flex gap-2 w-full">
          //   <Button
          //     onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
          //     className="w-full"
          //   >
          //     Add to cart
          //   </Button>
          //   <Button onClick={handleShare} variant="outline">
          //     Share
          //   </Button>
          // </div>
          ""
        )}
      </CardFooter>

    </Card>
  );
}

export default ShoppingProductTile;
