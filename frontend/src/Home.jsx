import React, { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Loading from './components/Loading'
import { useNavigate } from 'react-router-dom'

function Home() {

  const [loading, setLoading] = useState(false)
  const [switchLoading, setSwitchLoading] = useState(false)

  const navigate = useNavigate();

  if (loading) { return <Loading /> }

  const onClick = () => {
    setSwitchLoading(true);
    setTimeout(() => {
      navigate("/form");
    }, 500);
  }

  return (
    <>
      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <a href="/">
                <img
                  alt="inseural"
                  src="./logo.jpeg"
                  className="h-auto w-[200px]"
                />
              </a>
              <h1 className="mt-8 text-[45px] leading-tight font-semibold tracking-tight text-gray-400">
                Unlock your Perfect <span className='font-bold text-gray-800'>Insurance Policy</span> Today.
              </h1>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <button
                      type="button"
                      onClick={onClick}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {!switchLoading ?
                        <>
                          Get Started
                          <ArrowRightIcon className="h-5 w-5 text-white my-auto ml-2" aria-hidden="true" />
                        </>
                        :
                        <svg className={`animate-spin text-white h-5 w-5 my-0.5`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="/background.jpeg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  )
}

export default Home