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

// Updated animation styles with enhanced floating t-shirts
const styles = `
  .product-card {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease-out;
  }

  .product-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .product-card:hover {
    transform: translateY(-4px);
  }

  /* Category section with enhanced floating t-shirts */
  .category-section {
    position: relative;
    background: #f0f9ff;
    overflow: hidden;
  }

  .floating-tshirt {
    position: absolute;
    font-size: 40px;
    opacity: 0.15;
    pointer-events: none;
    animation: float 12s ease-in-out infinite;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .floating-tshirt:nth-child(1) {
    top: 5%;
    left: 5%;
    font-size: 48px;
    animation-delay: 0s;
  }

  .floating-tshirt:nth-child(2) {
    top: 15%;
    right: 8%;
    font-size: 56px;
    animation-delay: -2s;
  }

  .floating-tshirt:nth-child(3) {
    bottom: 10%;
    left: 12%;
    font-size: 44px;
    animation-delay: -4s;
  }

  .floating-tshirt:nth-child(4) {
    bottom: 20%;
    right: 15%;
    font-size: 52px;
    animation-delay: -6s;
  }

  .floating-tshirt:nth-child(5) {
    top: 45%;
    left: 25%;
    font-size: 60px;
    animation-delay: -8s;
  }

  .floating-tshirt:nth-child(6) {
    top: 25%;
    right: 25%;
    font-size: 48px;
    animation-delay: -10s;
  }

  .floating-tshirt:nth-child(7) {
    top: 35%;
    left: 8%;
    font-size: 44px;
    animation-delay: -3s;
  }

  .floating-tshirt:nth-child(8) {
    bottom: 30%;
    right: 8%;
    font-size: 52px;
    animation-delay: -5s;
  }

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg) scale(1);
    }
    25% {
      transform: translateY(-25px) rotate(8deg) scale(1.1);
    }
    50% {
      transform: translateY(0) rotate(0deg) scale(1);
    }
    75% {
      transform: translateY(25px) rotate(-8deg) scale(0.9);
    }
    100% {
      transform: translateY(0) rotate(0deg) scale(1);
    }
  }

  .category-card {
    background: rgba(255, 255, 255, 0.95);
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(5px);
  }

  .category-card:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .category-content {
    position: relative;
    z-index: 1;
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
        <div className="relative w-full h-[600px] overflow-hidden">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((slide, index) => (
              <img
                key={index}
                src={slide?.image}
                className={`${index === currentSlide ? "opacity-100" : "opacity-0"
                  } absolute top-0 left-0 w-full p-10 h-full object-cover transition-opacity duration-1000`}
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
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length
              )
            }
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <section className="py-12 category-section">
          <div className="floating-tshirt">👕</div>
          <div className="floating-tshirt">👕</div>
          <div className="floating-tshirt">👕</div>
          <div className="floating-tshirt">👕</div>
          <div className="floating-tshirt">👕</div>
          <div className="floating-tshirt">👕</div>
          <div className="floating-tshirt">👕</div>
          <div className="floating-tshirt">👕</div>

          <div className="container mx-auto px-4 category-content">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Shop by category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoriesWithIcon.map((categoryItem) => (
                <Card
                  key={categoryItem.id}
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                  className="category-card cursor-pointer"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold text-gray-700">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Feature Products
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
