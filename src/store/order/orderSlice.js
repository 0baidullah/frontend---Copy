import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import orderService from "./orderService";

export const getAllOrders=createAsyncThunk("orders/getAllOrders",async(_,thunkAPI)=>{
    try {
        return await orderService.getAllOrders();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)


export const updateOrderStatus=createAsyncThunk("orders/updateOrderStatus",async({id,status},thunkAPI)=>{
    try {
        return await orderService.updateOrderStatus(id,status);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)

export const createOrder=createAsyncThunk("orders/createOrder",async(orderData,thunkAPI)=>{
    try {
        return await orderService.createOrder(orderData);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)

const initialState={
    orders:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllOrders.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAllOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.orders=action.payload;
        })
        .addCase(getAllOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message;
        })
        .addCase(updateOrderStatus.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message;
        })
        .addCase(createOrder.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message;
        })
    }
})
export const {reset}=orderSlice.actions;
export default orderSlice.reducer;
