import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .filter-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 40;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .filter-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .filter-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    background: white;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .filter-container.open {
    transform: translateX(0);
  }

  .filter-header {
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filter-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
  }

  .filter-close {
    padding: 0.5rem;
    border-radius: 0.375rem;
    color: #64748b;
    transition: all 0.2s ease;
  }

  .filter-close:hover {
    background: #f1f5f9;
    color: #1e293b;
  }

  .filter-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  .filter-footer {
    padding: 1rem;
    border-top: 1px solid #e2e8f0;
    display: flex;
    gap: 0.75rem;
  }

  .filter-button {
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .filter-button.primary {
    background: #1e40af;
    color: white;
  }

  .filter-button.primary:hover {
    background: #1e3a8a;
  }

  .filter-button.secondary {
    background: #f1f5f9;
    color: #1e293b;
  }

  .filter-button.secondary:hover {
    background: #e2e8f0;
  }

  .filter-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    color: #1e293b;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .filter-trigger:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  .filter-trigger.active {
    background: #1e40af;
    color: white;
    border-color: #1e40af;
  }

  .filter-trigger.active:hover {
    background: #1e3a8a;
  }

  .filter-count {
    background: #e2e8f0;
    color: #1e293b;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .filter-trigger.active .filter-count {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  @media (min-width: 768px) {
    .filter-container {
      position: sticky;
      top: 1rem;
      transform: none;
      width: auto;
      box-shadow: none;
      border-radius: 0.5rem;
      border: 1px solid #e2e8f0;
    }

    .filter-header {
      display: none;
    }

    .filter-content {
      padding: 0;
    }

    .filter-footer {
      display: none;
    }
  }
`;

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
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
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, arr) => count + arr.length, 0);
  };

  const handleClearFilters = () => {
    setFilters({});
    sessionStorage.removeItem("filters");
    setIsFilterOpen(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6">
        {/* Mobile Filter Overlay */}
        <div
          className={`filter-overlay ${isFilterOpen ? 'open' : ''}`}
          onClick={() => setIsFilterOpen(false)}
        />

        {/* Filter Container */}
        <div className={`filter-container ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-header">
            <h3>Filter Products</h3>
            <button
              className="filter-close"
              onClick={() => setIsFilterOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="filter-content">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
          </div>
          <div className="filter-footer">
            <button
              className="filter-button secondary"
              onClick={handleClearFilters}
            >
              Clear All
            </button>
            <button
              className="filter-button primary"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                className="filter-trigger md:hidden"
                onClick={() => setIsFilterOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
                {getActiveFiltersCount() > 0 && (
                  <span className="filter-count">{getActiveFiltersCount()}</span>
                )}
              </button>
              <h2 className="text-lg font-extrabold">All Products</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {productList?.length} Products
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </>
  );
}

export default ShoppingListing;
