"use client"
import { useContext } from "react"
import { SearchContext } from "../app/[search]/page"
import { FaFilter } from "react-icons/fa";
import FilterItem from "./filterItem"
import { genresList } from "../constants/genres"
function filterContainer() {
  let { filter, setFilter } = useContext(SearchContext)
  return (
    <div className="filter-container">
      <div className="w-full h-full p-2 bg-white rounded-lg shadow-lg overflow-y-auto">
        <div className="flex gap-1 items-center">
          <FaFilter />
          <span className="font-bold text-lg">Filter</span>
        </div>
        {/* range rate */}
        <div className="font-semibold">
          <h3 className="p-2 border-b-[2px] border-solid border-b-zinc-300">Rate</h3>

          <div className="flex gap-3 ">
            <div className="">
              <h5>min Rate</h5>
              <select onChange={e => setFilter({ ...filter, min_rate: e.target?.value })} name="from" id="">
                {Array(9).fill(null).map((_, ind) => <option key={ind}>{ind + 1}</option>)}
              </select>
            </div>
            <div className="">
              <h5>max Rate</h5>
              <select value={filter.max_rate} onChange={e => setFilter({ ...filter, max_rate: e.target?.value })} name="from" id="">
                {Array(10).fill(null).map((_, ind) => <option key={ind}>{ind + 1}</option>)}
              </select>
            </div>
          </div>
        </div>
        {/* type */}
        <div className="font-semibold">
          <h3 className=" p-2 border-b-[2px] border-solid border-b-zinc-300">Type</h3>
          <div className="flex flex-wrap gap-2 p-2 ">
            <FilterItem
              id='movie'
              name="type"
              onChange={e => setFilter({ ...filter, type: 'movie' })}
            >
              Movie
            </FilterItem>
            <FilterItem
              id='tv'
              name="type"
              onChange={e => setFilter({ ...filter, type: 'tv' })}
            >
              TV
            </FilterItem>
          </div>
        </div>
        {/* Genres */}
        <div className="font-semibold">
          <h3 className="p-2 border-b-[2px] border-solid border-b-zinc-300">Genres</h3>
          <div className="flex flex-wrap gap-2 p-2 ">
            {genresList.map(el => {
              return (
                <FilterItem
                  name={el}
                  key={el}
                  id={el}
                  onChange={() => {
                    let genres = filter.genres?.slice() || []
                    if (genres.includes(el)) {

                      genres.splice(genres.indexOf(el), 1).slice()
                    } else {
                      genres.push(el)
                    }
                    setFilter({ ...filter, genres })
                  }}
                >
                  {el}
                </FilterItem>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default filterContainer