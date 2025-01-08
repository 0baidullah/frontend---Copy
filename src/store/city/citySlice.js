import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import cityService from "./cityService";



export const getAllCities=createAsyncThunk("city/getAllCities",async(_,thunkAPI)=>{
    try {
        return await cityService.getAllCities();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//get top cities 



export const addCity=createAsyncThunk("city/addCity",async(city,thunkAPI)=>{
    try {
        return await cityService.addCity(city);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)


export const getCityById=createAsyncThunk("city/getCityById",async(id,thunkAPI)=>{
    try {
        return await cityService.getCityById(id);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)


export const updateCity=createAsyncThunk("city/updateCity",async({id,city},thunkAPI)=>{
    try {
        return await cityService.updateCity(id,city);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)


export const deleteCity=createAsyncThunk("city/deleteCity",async(id,thunkAPI)=>{
    try {
        return await cityService.deleteCity(id);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)

export const getCityMoreDetail=createAsyncThunk("city/getCityMoreDetail",async(_,thunkAPI)=>{
    try {
        return await cityService.getCityMoreDetail();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)

export const getTopCities=createAsyncThunk("city/getTopCities",async(_,thunkAPI)=>{
    try {
        return await cityService.getTopCities();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)





const initialState={
    cities:[],
    topCities:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const citySlice = createSlice({
    name:"city",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false;
            state.isSuccess=false;
            state.isLoading=false;
            state.message="";
        }
        


    },
    extraReducers:(builder) =>{
        builder
        .addCase(getAllCities.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getAllCities.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.cities=action.payload;
            state.message="";
        })
        .addCase(getAllCities.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        //get top cities
    


        //add city
        .addCase(addCity.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(addCity.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(addCity.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })

        //get city by id

        .addCase(getCityById.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getCityById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.city=action.payload;
            state.message="";
        })
        .addCase(getCityById.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })

        //update city
        .addCase(updateCity.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(updateCity.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(updateCity.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })

        //delete city
        .addCase(deleteCity.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })

        .addCase(deleteCity.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(deleteCity.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })

        //get city more detail
        .addCase(getCityMoreDetail.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getCityMoreDetail.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.cityMoreDetail=action.payload;
            state.message="";
        })
        .addCase(getCityMoreDetail.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })

        //get top cities

        .addCase(getTopCities.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getTopCities.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.topCities=action.payload;
            state.message="";
        })
        .addCase(getTopCities.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })

        
    }
})


export const {reset} =citySlice.actions;
export default citySlice.reducer;

