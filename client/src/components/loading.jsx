"use client"


function loading() {
  return (
    <div className="loading mx-auto">
       <span style={{animationDelay:'0s'}} className="loading-dot"></span>
       <span style={{animationDelay:'0.1s'}} className="loading-dot"></span>
       <span style={{animationDelay:'0.2s'}} className="loading-dot"></span>
    </div>
  )
}

export default loading