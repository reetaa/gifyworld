"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        router.push(`/search/${searchTerm}`)
    };
    return (
        <form className="flex items-center w-4/6 py-8" onSubmit={handleSubmit}>
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full h-14" placeholder="Search all the GIFs" required
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
            <button type="submit" className="h-14 p-4 text-base font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
                <span className="sr-only">Search</span>
            </button>
        </form>
    )
}