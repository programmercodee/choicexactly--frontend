import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { X } from "lucide-react";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  const sizes = [
    { value: "xs", label: "Extra Small (XS)" },
    { value: "s", label: "Small (S)" },
    { value: "m", label: "Medium (M)" },
    { value: "l", label: "Large (L)" },
    { value: "xl", label: "Extra Large (XL)" },
    { value: "xxl", label: "2XL" },
  ];

  function handleRatingChange(getRating) {


    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
        size: selectedSize,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setSelectedSize("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    if (productDetails !== null) setAvailableSizes(productDetails?.availableSizes);
  }, [productDetails]);


    // console.log(selectedSize, "availableSizes");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      reviews.length
      : 0;

  
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-lg">
        {/* Header with close button */}
        <div className="absolute right-4 top-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={handleDialogClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] max-h-[90vh]">
          {/* Left Column - Image Gallery */}
          <div className="relative bg-gray-50 lg:min-h-[80vh]">
            <div className="sticky top-0 h-[45vh] lg:h-full">
              <div className="relative h-full flex items-center justify-center p-8">
                <img
                  src={productDetails?.image}
                  alt={productDetails?.title}
                  className="max-h-full w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              {/* Product Header */}
              <div className="space-y-4">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                  {productDetails?.title}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <StarRatingComponent rating={averageReview} />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({averageReview.toFixed(1)})
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mt-6 space-y-2">
                <div className="flex items-baseline gap-3">
                  <p className={`text-2xl font-bold ${productDetails?.salePrice > 0 ? "text-muted-foreground line-through" : "text-primary"}`}>
                    ₹{productDetails?.price}
                  </p>
                  {productDetails?.salePrice > 0 && (
                    <p className="text-2xl font-bold text-primary">
                      ₹{productDetails?.salePrice}
                    </p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {productDetails?.totalStock > 0 ? `${productDetails?.totalStock} items in stock` : "Out of stock"}
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-sm font-medium text-muted-foreground">Description</h2>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  {productDetails?.description}
                </p>
              </div>

              {/* Reviews Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Customer Reviews</h2>
                  <span className="text-sm text-muted-foreground">
                    {reviews?.length || 0} reviews
                  </span>
                </div>

                {/* Reviews List */}
                <div className="mt-4 space-y-6">
                  {reviews && reviews.length > 0 ? (
                    reviews.map((reviewItem) => (
                      <div key={reviewItem._id} className="flex gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {reviewItem?.userName[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{reviewItem?.userName}</h3>
                            <div className="flex items-center shrink-0">
                              <StarRatingComponent rating={reviewItem?.reviewValue} />
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground break-words">
                            {reviewItem.reviewMessage}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No reviews yet</p>
                  )}
                </div>

                {/* Add Review Section */}
                {user && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="font-medium mb-4">Write a Review</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <StarRatingComponent
                          rating={rating}
                          handleRatingChange={handleRatingChange}
                        />
                        <span className="text-sm text-muted-foreground">
                          {rating > 0 ? `${rating} stars` : 'Select rating'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Input
                          name="reviewMsg"
                          value={reviewMsg}
                          onChange={(event) => setReviewMsg(event.target.value)}
                          placeholder="Share your experience with this product..."
                          className="h-24 resize-none"
                        />
                        <Button
                          onClick={handleAddReview}
                          disabled={reviewMsg.trim() === "" || rating === 0}
                          className="w-full"
                        >
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add this before the sticky Add to Cart button */}
            <div className="px-6 lg:px-8 pb-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="size" className="text-sm font-medium">
                    Select Size
                  </Label>
                  <Select
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a size" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSizes.map((size) => (

                        <SelectItem
                          key={size.value}
                          value={size}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sticky Add to Cart Button */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4">
              {productDetails?.totalStock === 0 ? (
                <Button
                  className="w-full h-12 text-base bg-gray-100 text-gray-400 cursor-not-allowed"
                  disabled
                >
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full h-12 text-base"
                  onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                  disabled={!selectedSize}
                >
                  {!user ? "Login to Add to Cart" : !selectedSize ? "Select Size" : "Add to Cart"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
