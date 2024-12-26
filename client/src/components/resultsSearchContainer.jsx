"use client"
import Loading from  "./loading"
import { SearchContext } from "../app/[search]/page"
import { useContext } from "react"
import MovieCard from "./moviecard"
import Image from "next/image"
function resultsSearchContainer() {
  let {isLoading,data=[]}=useContext(SearchContext)
  
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className=" space-y-3 p-3">
     {data?.map(el=>{
       return <MovieCard key={el?._id} movie={el?._source}/>
     })}
    </div>
  )
}

export default resultsSearchContainer