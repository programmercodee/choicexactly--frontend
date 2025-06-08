import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
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

  .orders-card {
    animation: fadeIn 0.6s ease-out;
    background: linear-gradient(135deg, #ffffff, #f8fafc);
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .orders-card:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }

  .orders-header {
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    color: white;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .orders-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .orders-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  .orders-table th {
    background: #f8fafc;
    font-weight: 600;
    color: #1e40af;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    padding: 1rem;
    border-bottom: 2px solid #e5e7eb;
  }

  .orders-table td {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    color: #4b5563;
    font-size: 0.875rem;
  }

  .orders-table tr {
    transition: all 0.2s ease;
  }

  .orders-table tr:hover {
    background: #f8fafc;
  }

  .order-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: 0.025em;
    transition: all 0.2s ease;
  }

  .order-badge.confirmed {
    background: #dcfce7;
    color: #059669;
  }

  .order-badge.rejected {
    background: #fee2e2;
    color: #dc2626;
  }

  .order-badge.pending {
    background: #fef3c7;
    color: #d97706;
  }

  .order-badge.processing {
    background: #dbeafe;
    color: #1e40af;
  }

  .details-button {
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .details-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }

  .details-button:active {
    transform: translateY(0);
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #6b7280;
  }

  .empty-state svg {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    color: #9ca3af;
  }

  .empty-state p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    .orders-table {
      display: block;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .orders-table th,
    .orders-table td {
      white-space: nowrap;
      padding: 0.75rem;
    }
  }
`;

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

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
    <>
      <style>{styles}</style>
      <div className="orders-card">
        <div className="orders-header">
          <h2>Order History</h2>
        </div>
        <div className="p-6">
          {orderList && orderList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((orderItem) => (
                    <tr key={orderItem?._id}>
                      <td className="font-medium">{orderItem?._id}</td>
                      <td>{new Date(orderItem?.orderDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`order-badge ${getStatusBadgeClass(orderItem?.orderStatus)}`}>
                          {orderItem?.orderStatus}
                        </span>
                      </td>
                      <td className="font-semibold">₹{orderItem?.totalAmount}</td>
                      <td>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <button
                            onClick={() => handleFetchOrderDetails(orderItem?._id)}
                            className="details-button"
                          >
                            View Details
                          </button>
                          <ShoppingOrderDetailsView orderDetails={orderDetails} />
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="font-semibold text-gray-900">No Orders Yet</h3>
              <p>Your order history will appear here</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShoppingOrders;
