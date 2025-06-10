import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  X,
  Maximize2,
  ChevronDown,
  ChevronUp,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "roundedneck", label: "Rounded neck", icon: ShirtIcon },
  { id: "polo", label: "Polo", icon: CloudLightning },
  { id: "vneck", label: "V neck", icon: BabyIcon },
  { id: "plain", label: "Plain", icon: WatchIcon },
  { id: "printed", label: "Printed", icon: UmbrellaIcon },
];

// const brandsWithIcon = [
//   { id: "nike", label: "Nike", icon: Shirt },
//   { id: "adidas", label: "Adidas", icon: WashingMachine },
//   { id: "puma", label: "Puma", icon: ShoppingBasket },
//   { id: "levi", label: "Levi's", icon: Airplay },
//   { id: "zara", label: "Zara", icon: Images },
//   { id: "h&m", label: "H&M", icon: Heater },
// ];

// Updated animation styles with reduced floating t-shirts
const styles = `
  /* Very slow and gentle floating movement */
  @keyframes gentleFloat {
    0% { transform: translateY(0); }
    25% { transform: translateY(-2px); }
    50% { transform: translateY(-2px); }
    75% { transform: translateY(0); }
    100% { transform: translateY(0); }
  }

  /* Animated gradient background */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isVideoMinimized, setIsVideoMinimized] = useState(false);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  // console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Add scroll observer for products
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe all product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [productList]); // Re-run when product list changes

  return (
    <>
      <style>{styles}</style>
      <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((slide, index) => (
              <img
                key={index}
                src={slide?.image}
                className={`${index === currentSlide ? "opacity-100" : "opacity-0"
                  } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000
                  p-4 sm:p-6 md:p-8 lg:p-10`}
                alt={`Banner slide ${index + 1}`}
              />
            ))
            : null}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) =>
                  (prevSlide - 1 + featureImageList.length) %
                  featureImageList.length
              )
            }
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 
              bg-white/80 hover:bg-white/90 transition-colors duration-200
              w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          >
            <ChevronLeftIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length
              )
            }
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 
              bg-white/80 hover:bg-white/90 transition-colors duration-200
              w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          >
            <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </Button>

          {/* Optional: Add slide indicators for better UX */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featureImageList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <section className="relative py-16 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 
            animate-[gradientShift_15s_ease_infinite] bg-[length:200%_200%] opacity-50"></div>

          {/* Animated dots pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #4f46e5 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Section header with enhanced styling */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent 
                bg-gradient-to-r from-blue-600 to-indigo-600">
                Shop by Category
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our curated collection of premium t-shirts, designed for comfort and style
              </p>
            </div>

            {/* Category grid with enhanced cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categoriesWithIcon.map((categoryItem) => (
                <Card
                  key={categoryItem.id}
                  onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                  className="group cursor-pointer transform transition-all duration-300 
                    hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur-sm
                    border border-gray-100 hover:border-indigo-200"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 
                    space-y-4 transition-colors duration-300">
                    <div className="p-3 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 
                      group-hover:from-blue-100 group-hover:to-indigo-100 
                      transition-colors duration-300">
                      <categoryItem.icon className="w-8 h-8 text-indigo-600 
                        group-hover:text-indigo-700 transition-colors duration-300" />
                    </div>
                    <span className="font-semibold text-gray-700 group-hover:text-indigo-700 
                      transition-colors duration-300">
                      {categoryItem.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-[300px] mx-auto">
              <div
                className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ease-in-out
                  ${isVideoMinimized
                    ? 'translate-y-[calc(100%-40px)]'
                    : 'animate-[gentleFloat_8s_ease-in-out_infinite]'
                  }`}
              >
                {/* Minimized State Button */}
                {isVideoMinimized && (
                  <button
                    onClick={() => setIsVideoMinimized(false)}
                    className="fixed bottom-5 right-5 w-10 h-10 rounded-full bg-white shadow-md 
                      hover:shadow-lg hover:scale-110 transition-all duration-300 
                      flex items-center justify-center cursor-pointer"
                    title="Open Video"
                  >
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  </button>
                )}

                {/* Video Content */}
                <div className={`relative w-[200px] h-[350px] rounded-xl overflow-hidden shadow-lg bg-white
                  ${isVideoMinimized ? 'hidden' : 'block'}`}
                >
                  {/* Close Button - Only shown when video is open */}
                  {!isVideoMinimized && (
                    <button
                      onClick={() => setIsVideoMinimized(true)}
                      className="absolute top-2 right-2 z-10 w-8 h-8 
                        flex items-center justify-center rounded-full 
                        bg-white/90 hover:bg-white shadow-md 
                        transition-all duration-300 hover:scale-110 
                        border border-gray-100"
                      title="Close Video"
                    >
                      <XCircle className="w-5 h-5 text-red-500" />
                    </button>
                  )}

                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onEnded={(e) => {
                      e.target.currentTime = 0;
                      e.target.play();
                    }}
                  >
                    <source
                      src="https://res.cloudinary.com/defazdfkp/video/upload/v1749451526/ihlnoxsvn5hnf3hb4zwe.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent 
                    flex items-end"
                  >
                    <div className="w-full p-3 text-white text-center">
                      <h2 className="text-base font-semibold mb-1">New Collection</h2>
                      <p className="text-xs mb-2 opacity-90">Swipe to explore more</p>
                      <button className="px-3 py-1.5 text-xs font-medium 
                        bg-white text-gray-900 rounded-md 
                        hover:bg-gray-100 transition-colors duration-200"
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Trending Tees Collection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList && productList.length > 0
                ? productList.map((productItem, index) => (
                  <div
                    key={productItem.id}
                    className="product-card"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </div>
                ))
                : null}
            </div>
          </div>
        </section>

        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </>
  );
}

export default ShoppingHome;
