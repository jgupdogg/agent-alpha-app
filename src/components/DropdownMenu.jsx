// src/components/DropdownMenu.jsx
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const DropdownMenu = () => {
  const categories = ['Technology', 'Business', 'Sports', 'Entertainment'];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="
            inline-flex justify-center px-4 py-2 text-sm font-medium
            text-gray-900 dark:text-white
            bg-secondary dark:bg-secondary
            rounded-md
            hover:bg-tertiary dark:hover:bg-tertiary
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          "
        >
          Categories
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className="
            absolute left-0 mt-2 w-48 origin-top-left
            bg-secondary dark:bg-gray-800
            rounded-md shadow-lg
            ring-1 ring-black ring-opacity-5
            focus:outline-none
          "
        >
          <div className="py-1">
            {categories.map((category) => (
              <Menu.Item key={category}>
                {({ active }) => (
                  <button
                    className={`
                      ${
                        active
                          ? 'bg-tertiary text-gray-900 dark:bg-tertiary dark:text-gray-900'
                          : 'bg-transparent text-gray-900 dark:text-gray-100'
                      }
                      w-full text-left px-4 py-2 text-sm
                      focus:outline-none
                    `}
                    onClick={() => console.log(`Selected ${category}`)}
                  >
                    {category}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
