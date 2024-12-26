"use client"
import { useTransition, useState } from "react"

import { useContext } from "react"
import { SearchContext } from "../app/[search]/page"
import axios from "axios"

function searchBar() {
    let { filter, setFilter, data, setData, setLoading, isLoading } = useContext(SearchContext)
    let [value, setValue] = useState('')


    let [isPending, Transition] = useTransition()
    let handleChange = async (e) => {
        if (!e.target) return
        setLoading(true)
        setValue(e.target?.value)
        if(!value.length)return setData([])
        Transition(() => {
            if (!value?.length) return;
            let api_path = 'http://127.0.0.1:8000/search/fulltext?'
            let url = new URL(api_path)
            let { type, genres, min_rate, max_rate, offset, limit } = filter
            url.searchParams.append('text', value)
            url.searchParams.append('offset', offset)
            url.searchParams.append('limit', limit)
            url.searchParams.append('min_rate', min_rate)
            url.searchParams.append('max_rate', max_rate)
            if (type) {
                url.searchParams.append('type', type)
            }
            if (genres?.length) {
                for (const el of genres) {
                    url.searchParams.append('genres', el)
                }
            }
            axios.get(url.href)
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                })
                .catch((e) => {
                    setLoading(false)
                })
        })
    }

    return (
        <div className="search-bar">
            <input
                className="search-input"
                type="text"
                placeholder="Search..."
                onChange={handleChange}
            />
        </div>
    )
}

export default searchBar