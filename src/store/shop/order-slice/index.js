import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

// const initialState = {
//   approvalURL: null,
//   isLoading: false,
//   orderId: null,
//   orderList: [],
//   orderDetails: null,
// };

const initialState = {
  approvalURL: null, // PayPal approval URL
  razorpayOrderData: null, // Razorpay order info (orderId, key, amount)
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
  paymentSuccess: false,
  paymentError: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${baseURL}api/shop/order/create`,
      orderData
    );

    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      `${baseURL}api/shop/order/capture`,
      {
        paymentId,
        payerId,
        orderId,
      }
    );

    return response.data;
  }
);
// new thunk for capturing Razorpay payment after success
export const captureRazorpayPayment = createAsyncThunk(
  "/order/captureRazorpayPayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(`${baseURL}api/shop/order/capture`, {
      paymentId,
      payerId,
      orderId,
    });
    return response.data;
  }
);


export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${baseURL}api/shop/order/list/${userId}`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${baseURL}api/shop/order/details/${id}`
    );

    return response.data;
  }
);

// new thunk for Razorpay order creation (gets razorpayOrderId and key)
export const createRazorpayOrder = createAsyncThunk(
  "/order/createRazorpayOrder",
  async (orderData) => {
    const response = await axios.post(`${baseURL}api/shop/order/create-razorpay`, orderData);
    return response.data; // should contain razorpayOrderId, key, amount, etc.
  }
);





const shoppingOrderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    resetApprovalURL: (state) => {
      state.approvalURL = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      // Razorpay order creation
      .addCase(createRazorpayOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.razorpayOrderData = action.payload; // store orderId, key, amount, etc.
      })
      .addCase(createRazorpayOrder.rejected, (state) => {
        state.isLoading = false;
        state.razorpayOrderData = null;
      })

      // Razorpay payment capture
      .addCase(captureRazorpayPayment.pending, (state) => {
        state.isLoading = true;
        state.paymentSuccess = false;
        state.paymentError = null;
      })
      .addCase(captureRazorpayPayment.fulfilled, (state) => {
        state.isLoading = false;
        state.paymentSuccess = true;
        state.razorpayOrderData = null;
      })
      .addCase(captureRazorpayPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.paymentSuccess = false;
        state.paymentError = action.error.message || "Razorpay payment capture failed";
      });

  },
});

export const { resetOrderDetails, resetApprovalURL } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
