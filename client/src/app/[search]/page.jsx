"use client"
import { useState, createContext } from "react"
import FilterContainer from "../../components/filterContainer"
import SearchBar from "../../components/searchBar"
import { defaultFilter } from "../../constants/filter"
import ResultsSearchContainer from "../../components/resultsSearchContainer"
export let SearchContext = createContext()
function page() {
  let [filter, setFilter] = useState(defaultFilter)
  let [data,setData]=useState([])
  let [isLoading,setLoading]=useState(false)
  return (
    <SearchContext.Provider value={{ filter, setFilter,data,setData,isLoading,setLoading, }}>
      <div className="search-page">
        <FilterContainer />
        <div className="">
          <SearchBar />
          <ResultsSearchContainer/>
        </div>
       
      </div>
    </SearchContext.Provider>
  )
}

export default page