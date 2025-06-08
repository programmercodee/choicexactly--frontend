import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useSelector } from "react-redux";
import emptycart from '../../assets/emptycart.png'

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();


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
    <SheetContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-white">
      <SheetHeader className="border-b-2 border-blue-200 pb-4 relative">
        <div className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-400 rounded-full"></div>
        <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Your Cart
        </SheetTitle>
      </SheetHeader>

      {isAuthenticated ? (
        <div className="animate-fadeIn">
          {cartItems.length === 0 ? (
            <div className="flex items-center flex-col py-12 px-4">
              <div className="relative group p-8 rounded-2xl border-2 border-dashed border-blue-200 bg-white/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-blue-400/5 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                <img
                  src={emptycart}
                  alt="Empty cart"
                  className="w-48 h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-8 text-center space-y-4">
                <h1 className="text-xl font-bold text-blue-600 animate-pulse">Your cart is empty..</h1>
                <div className="w-24 h-1 bg-blue-400 rounded-full mx-auto"></div>
                <Button
                  onClick={() => setOpenCartSheet(false)}
                  className="bg-blue-400 hover:bg-blue-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Continue shopping
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-50 to-transparent z-10"></div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar px-2 pt-8">
                  {cartItems && cartItems.length > 0
                    ? cartItems.map((item, index) => (
                      <div
                        key={item._id}
                        className="animate-slideIn relative"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <UserCartItemsContent cartItem={item} />
                        {index < cartItems.length - 1 && (
                          <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-4"></div>
                        )}
                      </div>
                    ))
                    : null}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-50 to-transparent z-10"></div>
              </div>

              <div className="relative mt-8 pt-6 border-t-2 border-blue-100">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-blue-50 rounded-t-lg border-t-2 border-l-2 border-r-2 border-blue-200"></div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-lg transform hover:scale-[1.02] transition-transform duration-300">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-bold text-blue-600 text-lg">₹{totalCartAmount}</span>
                  </div>

                  <Button
                    onClick={() => {
                      navigate("/shop/checkout");
                      setOpenCartSheet(false);
                    }}
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform relative z-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center flex-col py-12 px-4 animate-fadeIn">
          <div className="relative group p-8 rounded-2xl border-2 border-dashed border-blue-200 bg-white/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-blue-400/5 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
            <img
              src={emptycart}
              alt="Login required"
              className="w-48 h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="mt-8 text-center space-y-4">
            <h1 className="text-xl font-bold text-blue-600 animate-pulse">Login to continue shopping...</h1>
            <div className="w-24 h-1 bg-blue-400 rounded-full mx-auto"></div>
            <Link to="/auth/login" className="w-full block">
              <Button
                onClick={() => setOpenCartSheet(false)}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Login now!!
              </Button>
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }
      `}</style>
    </SheetContent>
  );
}

export default UserCartWrapper;
