import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
    { name: 'Post', href: '/', current: true },
    { name: 'My Post', href: '/mypost', current: true },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
    const navigate = useNavigate();
    const userToken = localStorage.getItem('userToken');
    const userName = JSON.parse(localStorage.getItem('userName'));

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://www.icore.net.in/wp-content/uploads/2021/02/icore_logo-1a.svg"
                                className="h-8 w-auto"
                            />
                        </div>
                        {userToken && (
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <div className='flex gap-x-4'>
                                        {!userToken ? (
                                            <>
                                                <Link to="/register">
                                                    <button className='bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                                        Register
                                                    </button>
                                                </Link>
                                                <Link to='/login'>
                                                    <button className='bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                                        Login
                                                    </button>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <h5 className='text-white'>{userName}</h5>
                                                <button
                                                    onClick={handleLogout}
                                                    className='bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </MenuButton>
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                {userToken && (
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                )}
            </DisclosurePanel>
        </Disclosure>
    );
}
