import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems, shoppingViewHeaderMenuItems2 } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import logo from '../../assets/logo1.png'
import { useToast } from "@/components/ui/use-toast";

const styles = `
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .header-container {
    background: linear-gradient(
      120deg,
      #ffffff 0%,
      #f8fafc 25%,
      #ffffff 50%,
      #f8fafc 75%,
      #ffffff 100%
    );
    background-size: 200% 200%;
    animation: gradientShift 15s ease infinite;
    border-bottom: 1px solid #e5e7eb;
  }

  .nav-link {
    position: relative;
    color: #4b5563;
    font-weight: 500;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #1e40af, #3b82f6);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  .nav-link:hover {
    color: #1e40af;
  }

  .nav-link:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  .nav-link.active {
    color: #1e40af;
    font-weight: 600;
  }

  .nav-link.active::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  .collections-button {
    position: relative;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
  }

  .collections-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(59, 130, 246, 0.1),
      transparent
    );
    transition: 0.5s;
  }

  .collections-button:hover::after {
    left: 100%;
  }

  .collections-button:hover {
    border-color: #93c5fd;
    color: #1e40af;
  }

  .dropdown-menu {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    animation: slideDown 0.2s ease-out;
  }

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

  .dropdown-item {
    position: relative;
    color: #4b5563;
    transition: all 0.2s ease;
    padding: 0.5rem 1rem;
  }

  .dropdown-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: #1e40af;
    transform: scaleY(0);
    transition: transform 0.2s ease;
  }

  .dropdown-item:hover {
    background: #f8fafc;
    color: #1e40af;
    padding-left: 1.5rem;
  }

  .dropdown-item:hover::before {
    transform: scaleY(1);
  }

  .cart-button {
    position: relative;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
  }

  .cart-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(59, 130, 246, 0.1),
      transparent
    );
    transition: 0.5s;
  }

  .cart-button:hover::after {
    left: 100%;
  }

  .cart-button:hover {
    border-color: #93c5fd;
  }

  .cart-count {
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    color: white;
    font-weight: 600;
    padding: 0.15rem 0.4rem;
    border-radius: 9999px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
  }

  .login-button {
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    color: white;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .login-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  .login-button:hover::after {
    left: 100%;
  }

  .login-button:hover {
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
  }
`;

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCollections, setOpenCollections] = useState(false);

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
        ? {
          category: [getCurrentMenuItem.id],
        }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      )
      : navigate(getCurrentMenuItem.path);
  }

  // console.log(openCollections, "openCollections");
  return (
    <>
      <style>{styles}</style>
      <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row items-center">
        <div className="relative inline-block w-full sm:w-auto text-left">
          <div>
            <Label
              className={`collections-button inline-flex w-full cursor-pointer justify-center items-center gap-1.5 rounded-md px-4 py-2 text-sm ${openCollections ? 'text-blue-600' : 'text-gray-700'}`}
              onClick={() => setOpenCollections(!openCollections)}
            >
              Collections
              <svg
                className={`-mr-1 h-4 w-4 transition-transform duration-200 ${openCollections ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Label>
          </div>

          <div
            className={`absolute left-0 z-10 mt-2 w-56 origin-top-right dropdown-menu transition-all duration-200 ${openCollections ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
          >
            <div className="py-1">
              {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Label
                  onClick={() => {
                    handleNavigate(menuItem)
                    setOpenCollections(false)
                  }}
                  className={`dropdown-item block cursor-pointer ${location.pathname === menuItem.path ? 'text-blue-600 font-medium' : ''}`}
                  key={menuItem.id}
                >
                  {menuItem.label}
                </Label>
              ))}
            </div>
          </div>
        </div>

        {shoppingViewHeaderMenuItems2.map((menuItem) => (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className={`nav-link ${location.pathname === menuItem.path ? 'active' : ''}`}
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        ))}
      </nav>
    </>
  );
}

function HeaderRightContent() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleLogout = () => {
    navigate("/auth/login")
    dispatch(logoutUser());

    toast({
      title: "Logged out successfully",
      description: "You’ve been logged out. Hope to see you again soon!",
      variant: "success",
    });

  };
  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);


  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <div className="w-full flex items-center gap-2 sm:border-none border" onClick={() => setOpenCartSheet(true)}>

          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative h-14 w-14 sm:h-10 sm:w-10"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-[-1px] sm:top-[-5px] right-[2px] font-bold  text-md">
              {cartItems?.items?.length || 0}
            </span>
            <span className="sr-only">User cart</span>
          </Button>
          <span className="sm:hidden block text-md font-semibold"><span className="font-bold text-blue-500">{cartItems?.items?.length || 0}</span> {cartItems?.items?.length === 1 ? 'product' : 'products'} in your cart</span>
        </div>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <div className="border sm:border-none py-2 sm:py-0 px-2 sm:px-0">
        {
          isAuthenticated ? <DropdownMenu>

            <DropdownMenuTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Avatar className="bg-blue-400">
                  <AvatarFallback className="bg-blue-500 text-white font-extrabold">
                    {user?.userName[0].toUpperCase()}

                  </AvatarFallback>
                </Avatar>
                <span className="block sm:hidden font-semibold">Account/Profile</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="w-56">
              <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                <UserCog className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> : <Link to="/auth/login"> <Button>Login</Button> </Link>
        }
      </div>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          {/* <HousePlug className="h-6 w-6" /> */}
          {/* <span className="font-bold">Ecommerce</span> */}
          <img src={logo} width={50} alt="" />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
