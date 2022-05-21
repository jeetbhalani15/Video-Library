import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
      <>    
      <h1>404 Page Not Found</h1>
      <Link to={"/"}><button>Go back home</button></Link>
    </>

  )
}

export default Page404