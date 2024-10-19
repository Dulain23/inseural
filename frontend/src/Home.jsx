import React, { useState } from 'react'

function Home() {

  return (
    <>
      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              />
              <h1 className="mt-8 text-2xl font-semibold tracking-tight text-gray-400">
                One step closer to getting your <span className='font-bold '>insurance</span> 
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Start a 14 day free trial
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Begin
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
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  )
}

export default Home