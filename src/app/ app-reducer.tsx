
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

const SET_STATUS = "APP/SET_STATUS";
const SET_ERROR = "SET_ERROR";

type InitialStateType = typeof initialState

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            return {
                ...state, error: action.error
            }
        default:
            return state
    }
}

export const setAppStatusAC = (status:RequestStatusType)=> ({type:SET_STATUS, status} as const)
export const setAppErrorAC = (error: string| null) => ({type:SET_ERROR, error} as const)

export type SetStatusType = ReturnType<typeof setAppStatusAC>
export type SetErrorType = ReturnType<typeof setAppErrorAC>

type ActionsType =  SetStatusType | SetErrorType
