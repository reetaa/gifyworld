"use client"
import React, { FC, ReactNode, MutableRefObject, useReducer, useEffect, useRef, createContext, useContext } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useParams } from 'next/navigation'

// Todo - Your Giphy API key - or use one found in here 
// https://github.com/Giphy/giphy-js/blob/master/packages/react-components/stories/carousel.stories.tsx#L11
const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY || '')

interface State {
    gifs: any[]
    page: number
    loading: boolean
}

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS', payload: any[] }
    | { type: 'FETCH_ERROR', payload: Error }
    | { type: 'INCREMENT_PAGE' }
    | { type: 'RESET' }

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FETCH_START':
            // Todo - handle this state in the UI
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            const newGifs = action.payload.filter(
                (gif: any) => !state.gifs.map((g: any) => g.id).includes(gif.id)
            )
            return { ...state, loading: false, gifs: [...state.gifs, ...newGifs] }
        case 'FETCH_ERROR':
            // Todo - surface this error and handle in UI
            console.error(action.payload)
            return { ...state, loading: false }
        case 'INCREMENT_PAGE':
            return { ...state, page: state.page + 1 }
        case 'RESET':
            return { gifs: [], page: 0, loading: false }
        default:
            return state
    }
}

interface GifyContextShape {
    gifs: any[];
    lastGifElementRef: MutableRefObject<any>;
    loading: boolean;
}

const GifyContext = createContext<GifyContextShape | undefined>(undefined)

export const useGifyContext = () => useContext(GifyContext)

interface GifyProviderProps {
    children: ReactNode
}

const GifyProvider: FC<GifyProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { gifs: [], page: 0, loading: false })
    const lastGifElementRef = useRef<HTMLElement | null>(null)
    const { searchTerm } = useParams()

    useEffect(() => {
        const fetchGifs = async () => {
            dispatch({ type: 'FETCH_START' })
            try {
                const data = await (searchTerm ? gf.search(searchTerm as string, { limit: 10, offset: state.page * 10 }) : gf.trending({ limit: 10, offset: state.page * 10 }))
                dispatch({ type: 'FETCH_SUCCESS', payload: data.data })
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR', payload: error as Error })
            }
        }
        fetchGifs()
    }, [state.page, searchTerm])

    useEffect(() => {
        dispatch({ type: 'RESET' })
    }, [searchTerm])

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !state.loading) {
                dispatch({ type: 'INCREMENT_PAGE' })
            }
        })

        if (lastGifElementRef.current) {
            observer.observe(lastGifElementRef.current)
        }

        return () => observer.disconnect()
    }, [state.gifs, state.loading])

    return (
        <GifyContext.Provider value={{ loading: state.loading, gifs: state.gifs, lastGifElementRef }}>
            {children}
        </GifyContext.Provider>
    )
}

export { GifyProvider }