import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder, resetApprovalURL } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
  }

  .checkout-container {
    animation: fadeIn 0.6s ease-out;
  }

  .hero-image {
    position: relative;
    overflow: hidden;
  }

  .hero-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.4)
    );
  }

  .hero-image img {
    transition: transform 0.5s ease;
  }

  .hero-image:hover img {
    transform: scale(1.05);
  }

  .checkout-content {
    animation: fadeIn 0.8s ease-out;
    animation-fill-mode: both;
  }

  .checkout-content:nth-child(2) {
    animation-delay: 0.2s;
  }

  .cart-item {
    animation: fadeIn 0.5s ease-out;
    transition: all 0.3s ease;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .cart-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .total-section {
    background: linear-gradient(135deg, #f8fafc, #ffffff);
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    animation: fadeIn 0.8s ease-out;
    animation-delay: 0.4s;
    animation-fill-mode: both;
  }

  .payment-button {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    border-radius: 0.5rem;
    font-weight: 600;
    letter-spacing: 0.025em;
  }

  .payment-button::after {
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

  .payment-button:hover::after {
    left: 100%;
  }

  .payment-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .payment-button:active {
    transform: translateY(0);
  }

  .payment-button.paypal {
    background: linear-gradient(135deg, #003087, #009cde);
  }

  .payment-button.paypal:hover {
    background: linear-gradient(135deg, #002b7a, #0088c7);
  }

  .payment-button.razorpay {
    background: linear-gradient(135deg, #ff9f00, #ff8400);
  }

  .payment-button.razorpay:hover {
    background: linear-gradient(135deg, #ff8400, #ff6b00);
  }

  .payment-button.loading {
    position: relative;
    cursor: wait;
  }

  .payment-button.loading::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  .address-section {
    animation: fadeIn 0.8s ease-out;
    animation-delay: 0.3s;
    animation-fill-mode: both;
  }
`;

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) * currentItem?.quantity,
        0
      )
      : 0;

  useEffect(() => {
    if (approvalURL && selectedPaymentMethod === "paypal") {
      window.location.href = approvalURL;
    }
  }, [approvalURL, selectedPaymentMethod]);

  const handleInitiatePaypalPayment = () => {
    setSelectedPaymentMethod("paypal");
    toast({ title: "Please wait payment is processing", variant: "success" });

    if (!cartItems?.items?.length) {
      return toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
    }

    if (!currentSelectedAddress) {
      return toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((res) => {
      if (res?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  };

  const handleRazorpayPayment = async () => {
    setSelectedPaymentMethod("razorpay");
    dispatch(resetApprovalURL());
    if (!cartItems?.items?.length) {
      return toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
    }

    if (!currentSelectedAddress) {
      return toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/shop/order/create-razorpay-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalCartAmount * 100,
            currency: "INR",
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        return toast({
          title: "Failed to create Razorpay order",
          variant: "destructive",
        });
      }

      const options = {
        key: "rzp_test_1bgvvBixZoMsmo",
        amount: data.amount,
        currency: data.currency,
        name: "ChoiceXactly",
        description: "Order Payment",
        order_id: data.id,
        handler: function (response) {
          toast({ title: "Payment Successful", variant: "success" });

          const paidOrderData = {
            ...orderData,
            paymentStatus: "paid",
            paymentId: response.razorpay_payment_id,
            payerId: response.razorpay_order_id,
          };

          // dispatch(createNewOrder(paidOrderData));
          fetch("http://localhost:5000/api/shop/order/capture-razorpay-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              payerId: response.razorpay_order_id,
              orderData: paidOrderData,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                toast({ title: "Order placed successfully!", variant: "success" });
                navigate("/shop/home");
              } else {
                toast({ title: "Payment succeeded but order saving failed", variant: "destructive" });
              }
              //
            })
            .catch((err) => {
              console.error("Final Razorpay order error:", err);
              toast({ title: "Something went wrong while saving order", variant: "destructive" });
            });


        },
        prefill: {
          name: user?.fullName,
          email: user?.email,
          contact: currentSelectedAddress?.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay payment error:", error);
      toast({ title: "Payment failed", variant: "destructive" });
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="checkout-container">
        <div className="hero-image h-[300px] w-full overflow-hidden">
          <img
            src={img}
            className="h-full w-full object-cover object-center"
            alt="Checkout Banner"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 p-6 max-w-7xl mx-auto">
          <div className="address-section">
            <Address
              selectedId={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          </div>

          <div className="checkout-content flex flex-col gap-6">
            {cartItems?.items?.map((item, index) => (
              <div
                key={item.productId}
                className="cart-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <UserCartItemsContent cartItem={item} />
              </div>
            ))}

            <div className="total-section">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Total Amount</span>
                <span className="text-xl font-bold text-blue-600">₹{totalCartAmount}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={handleInitiatePaypalPayment}
                disabled={isPaymentStart}
                className={`payment-button paypal ${isPaymentStart ? 'loading' : ''}`}
              >
                {isPaymentStart ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  "Checkout with PayPal"
                )}
              </Button>

              <Button
                onClick={handleRazorpayPayment}
                className="payment-button razorpay"
              >
                Checkout with Razorpay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCheckout;
