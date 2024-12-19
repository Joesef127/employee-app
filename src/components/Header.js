/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../App';

const navigation = [
  { name: 'Employees', href: '/employees' },
  { name: 'Customers', href: '/customers' },
  { name: 'Dictionary', href: '/dictionary' },
  // { name: "Definition", href: "/definition" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header(props) {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute text-xs text-gray-800 p-1 bg-white my-3 mx-3 rounded right-0 z-50 cursor-pointer"
        >
          {'<'}- Back
        </button>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) => {
                        return (
                          'rounded-md px-3 py-2 text-sm font-medium no-underline ' +
                          (isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white')
                        );
                      }}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  {loggedIn ? (
                    <NavLink
                      to={'/login'}
                      onClick={() => {
                        setLoggedIn(false);
                        localStorage.clear();
                      }}
                      className="rounded-md px-3 py-2 text-sm font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </NavLink>
                  ) : (
                    <NavLink
                      to={'/login'}
                      className="rounded-md px-3 py-2 text-sm font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium no-underline'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
            {loggedIn ? (
              <NavLink
                to={'/login'}
                onClick={() => {
                  setLoggedIn(false);
                  localStorage.clear();
                }}
                className="block rounded-md px-3 py-2 text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                to={'/login'}
                className="block rounded-md px-3 py-2 text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Login
              </NavLink>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div className="bg-gray-300">
        <div className="p-2 max-w-screen-xl mx-auto min-h-screen">
          {props.children}
        </div>
      </div>
    </>
  );
}
