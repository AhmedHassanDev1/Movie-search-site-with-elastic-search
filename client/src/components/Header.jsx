import Image from "next/image"
import { FaSearchengin } from "react-icons/fa6";
import { AiOutlineFileSearch } from "react-icons/ai";
import Link from "next/link";
function Header() {
  return (
    <header className="header">
      <div className="max-w-5xl mx-auto flex justify-between">
        <div className="flex gap-2 ">
          <Image src={'/logo.png'} width={35} height={35} alt="logo" />
          <h3 className="font-bold text-2xl text-pink-600">Movies Research</h3>
        </div>
        <div className="flex items-center gap-2">
          <Link href={'/search'}
            className="flex items-center gap-1 hover:text-pink-600">
            <FaSearchengin />
           <span>search</span> 
          </Link>
          <Link href={'search/similarity'}
            className="flex  items-center gap-1 hover:text-pink-600">
            <AiOutlineFileSearch />
            <span>similarity search</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header