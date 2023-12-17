import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

import agent from "../../../api/agent";
import { toast } from "react-toastify";
import { router } from "../../../router/Routes";

const initialState = {
    user:null,
    status:"idle"
}

async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
    })
  }

export const signUpUser = createAsyncThunk(
    'account/signUpUser',
    async (data, thunkAPI) => {
        try {
            let Base64Obj = '';
            await getBase64(data.avatar)
            .then(res => Base64Obj = res)
            .catch(err => console.log(err))
            const createUser={...data, avatar:Base64Obj };
            await agent.UserProfile.signUp(createUser);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const signInUser = createAsyncThunk(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.UserProfile.signIn(data);
            const {...user} = userDto;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        console.log("fetch user");
        let userStorage =JSON.parse(localStorage.getItem('user'))
        thunkAPI.dispatch(setUser(userStorage))
        try {
            const userDto = await agent.UserProfile.currentUser();
            const {...user} = {...userDto,...userStorage};
            
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Your Session is Expired. Please Sign In');
            router.navigate('/');
        })

        builder.addCase(signUpUser.pending, (state) => {
            state.status = 'saving';
        });
        builder.addCase(signUpUser.fulfilled, (state,action) => {
            state.status = 'idle';
            toast.success('Your Registeration is Successfull . Please Sign In');
            router.navigate('/SignIn');
        });
        builder.addCase(signUpUser.rejected, (state) => {
            state.status = 'error';
        });

        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
            router.navigate('/');
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            let {error} = action.payload;
            toast.error(error.error) 
        })

       

            
    })
})

export const {signOut, setUser} = accountSlice.actions;