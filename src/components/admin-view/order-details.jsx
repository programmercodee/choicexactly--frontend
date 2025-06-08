import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import { Package, Truck, CreditCard, MapPin, Phone, MessageSquare, Calendar, Hash, Copy, Check } from "lucide-react";
import { Button } from "../ui/button";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const [copied, setCopied] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Order ID copied to clipboard",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const formatOrderId = (id) => {
    if (!id) return "";
    return `${id.slice(0, 8)}...${id.slice(-4)}`;
  };

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500 hover:bg-green-600";
      case "rejected":
        return "bg-red-600 hover:bg-red-700";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "inProcess":
        return "bg-blue-500 hover:bg-blue-600";
      case "inShipping":
        return "bg-purple-500 hover:bg-purple-600";
      case "delivered":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="grid gap-8">
        {/* Order Header Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-500" />
            Order Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
              <Hash className="w-5 h-5 text-gray-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Order ID</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 truncate" title={orderDetails?._id}>
                    {formatOrderId(orderDetails?._id)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-gray-200"
                    onClick={() => copyToClipboard(orderDetails?._id)}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium text-gray-900">{orderDetails?.orderDate.split("T")[0]}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium text-gray-900">₹{orderDetails?.totalAmount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium text-gray-900">{orderDetails?.paymentMethod}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <Badge className={`${orderDetails?.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                  {orderDetails?.paymentStatus}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Truck className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Order Status</p>
                <Badge className={`${getStatusColor(orderDetails?.orderStatus)} text-white`}>
                  {orderDetails?.orderStatus}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Quantity</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Size</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{item.title}</td>
                      <td className="py-3 px-4 text-sm text-center text-gray-900">{item.quantity}</td>
                      <td className="py-3 px-4 text-sm text-center text-gray-900">{item.size}</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">₹{item.price}</td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Info Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Shipping Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium">User Name:</span>
                <span>{user.userName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium">Address:</span>
                <span>{orderDetails?.addressInfo?.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium">City:</span>
                <span>{orderDetails?.addressInfo?.city}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Phone:</span>
                <span>{orderDetails?.addressInfo?.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium">Pincode:</span>
                <span>{orderDetails?.addressInfo?.pincode}</span>
              </div>
              <div className="flex items-start gap-2 text-gray-600">
                <MessageSquare className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <span className="font-medium">Notes:</span>
                  <p className="text-sm mt-1">{orderDetails?.addressInfo?.notes || "No additional notes"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Status Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Order Status</h3>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
            className="max-w-md"
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
