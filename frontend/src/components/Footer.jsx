import React from 'react'
import { Link } from 'react-router-dom' // Best practice for internal links
import './Footer.css'

const Footer = () => {
  return (
    <footer className="bg-slate-800 w-full text-white">
      <div className="mx-auto w-full max-w-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">E-comm Hub</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Resources</h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <Link to='/about' className="hover:underline">About</Link>
                </li>
                <li>
                  <Link to='/contact' className="hover:underline">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Follow us</h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="https://github.com/" className="hover:underline">Github</a>
                </li>
                <li className='mb-4'>
                  <a target='_blank' href="https://discord.gg/" className="hover:underline">Discord</a>
                </li>
                <li>
                  <a target='_blank' href="https://x.com/" className="hover:underline">X</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Legal</h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">© 2025E-Commerce. All Rights Reserved.</span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
             {/* Social icons - ensure they have fill="white" or text-white */}
             <a href="#" className="text-white hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">...</svg>
             </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer