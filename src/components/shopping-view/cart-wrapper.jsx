import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useSelector } from "react-redux";
import emptycart from '../../assets/emptycart.png'

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // console.log(isAuthenticated)

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>


      {
        isAuthenticated ? (
          <div>
            {
              cartItems.length === 0 ? (<div className="flex items-center flex-col">
                <img src={emptycart} alt="" className="mt-[100px]" />
                <h1 className="my-5 text-xl font-bold text-blue-600">Your cart is empty..</h1>
                <Button onClick={()=>setOpenCartSheet(false)}>Continue shopping</Button>
              </div>) : (<div>
                <div className="mt-8 space-y-4">
                  {cartItems && cartItems.length > 0
                    ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
                    : null}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">₹{totalCartAmount}</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    navigate("/shop/checkout");
                    setOpenCartSheet(false);
                  }}
                  className="w-full mt-6"
                >
                  Checkout
                </Button>
              </div>)
            }


          </div>
        ) : (
          <div className="flex items-center flex-col">
            <img src={emptycart} alt="" className="mt-[100px]" />
            <h1 className="my-5 text-xl font-bold text-blue-600">Login to continue shopping...</h1>
            <Link to="/auth/login">
             <Button onClick={()=>setOpenCartSheet(false)}>Login now!!</Button>
            </Link>
          </div>
        )
      }



    </SheetContent>
  );
}

export default UserCartWrapper;
