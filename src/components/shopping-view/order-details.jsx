import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const styles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .order-dialog {
    animation: slideUp 0.4s ease-out;
    max-height: 90vh;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #94a3b8 #f1f5f9;
  }

  .order-dialog::-webkit-scrollbar {
    width: 6px;
  }

  .order-dialog::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  .order-dialog::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 3px;
  }

  .order-dialog::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }

  .order-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .order-section-header {
    background: #f8fafc;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    font-weight: 600;
    color: #1e293b;
    font-size: 0.95rem;
  }

  .order-info-grid {
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
  }

  .order-info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  .order-info-label {
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .order-info-value {
    color: #1e293b;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  .status-badge.confirmed {
    background: #dcfce7;
    color: #059669;
  }

  .status-badge.rejected {
    background: #fee2e2;
    color: #dc2626;
  }

  .status-badge.pending {
    background: #fef3c7;
    color: #d97706;
  }

  .status-badge.processing {
    background: #dbeafe;
    color: #1e40af;
  }

  .items-container {
    padding: 1rem;
  }

  .item-card {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 0.75rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    border: 1px solid #e2e8f0;
  }

  .item-title {
    font-weight: 500;
    color: #1e293b;
  }

  .item-quantity {
    color: #64748b;
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .item-price {
    font-weight: 600;
    color: #1e293b;
    white-space: nowrap;
  }

  .shipping-info {
    padding: 1rem;
  }

  .shipping-detail {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    border: 1px solid #e2e8f0;
  }

  .shipping-label {
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .shipping-value {
    color: #1e293b;
    font-weight: 600;
    font-size: 0.95rem;
  }

  @media (min-width: 640px) {
    .order-info-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .item-card {
      grid-template-columns: 2fr 1fr 1fr;
      align-items: center;
    }

    .shipping-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .shipping-detail {
      margin-bottom: 0;
    }
  }

  @media (max-width: 639px) {
    .order-dialog {
      margin: 0;
      border-radius: 0;
      height: 100vh;
      max-height: 100vh;
    }

    .item-card {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .item-quantity, .item-price {
      font-size: 0.875rem;
    }
  }
`;

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'confirmed';
      case 'rejected':
        return 'rejected';
      case 'pending':
        return 'pending';
      case 'processing':
        return 'processing';
      default:
        return 'pending';
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px] p-0">
      <style>{styles}</style>
      <div className="order-dialog">
        <div className="order-section">
          <div className="order-section-header">Order Information</div>
          <div className="order-info-grid">
            <div className="order-info-item">
              <span className="order-info-label">Order ID</span>
              <span className="order-info-value">{orderDetails?._id}</span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Order Date</span>
              <span className="order-info-value">
                {new Date(orderDetails?.orderDate).toLocaleDateString()}
              </span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Total Amount</span>
              <span className="order-info-value">₹{orderDetails?.totalAmount}</span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Payment Method</span>
              <span className="order-info-value capitalize">{orderDetails?.paymentMethod}</span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Payment Status</span>
              <span className={`status-badge ${getStatusBadgeClass(orderDetails?.paymentStatus)}`}>
                {orderDetails?.paymentStatus}
              </span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Order Status</span>
              <span className={`status-badge ${getStatusBadgeClass(orderDetails?.orderStatus)}`}>
                {orderDetails?.orderStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="order-section">
          <div className="order-section-header">Order Items</div>
          <div className="items-container">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
              orderDetails?.cartItems.map((item, index) => (
                <div key={index} className="item-card">
                  <span className="item-title">{item.title}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                  <span className="item-price">₹{item.price}</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">No items found</div>
            )}
          </div>
        </div>

        <div className="order-section">
          <div className="order-section-header">Shipping Information</div>
          <div className="shipping-info">
            <div className="shipping-detail">
              <span className="shipping-label">User Name</span>
              <span className="shipping-value">{user.userName}</span>
            </div>
            <div className="shipping-detail">
              <span className="shipping-label">Address</span>
              <span className="shipping-value">{orderDetails?.addressInfo?.address}</span>
            </div>
            <div className="shipping-detail">
              <span className="shipping-label">City</span>
              <span className="shipping-value">{orderDetails?.addressInfo?.city}</span>
            </div>
            <div className="shipping-detail">
              <span className="shipping-label">Pincode</span>
              <span className="shipping-value">{orderDetails?.addressInfo?.pincode}</span>
            </div>
            <div className="shipping-detail">
              <span className="shipping-label">Phone</span>
              <span className="shipping-value">{orderDetails?.addressInfo?.phone}</span>
            </div>
            {orderDetails?.addressInfo?.notes && (
              <div className="shipping-detail">
                <span className="shipping-label">Notes</span>
                <span className="shipping-value">{orderDetails?.addressInfo?.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
