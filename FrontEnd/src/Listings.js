import React, { useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const listings = [
  {
    id: 1,
    name: "Car-1",
    href: "#",
    price: "$",
    imageSrc: "",
    imageAlt: "Car Picture",
  },
  {
    id: 2,
    name: "Car-2",
    href: "#",
    price: "$",
    imageSrc: "",
    imageAlt: "Car Picture",
  },
  {
    id: 3,
    name: "Car-3",
    href: "#",
    price: "$",
    imageSrc: "",
    imageAlt: "Car Picture",
  },
  {
    id: 4,
    name: "Car-4",
    href: "#",
    price: "$",
    imageSrc: "",
    imageAlt: "Car Picture",
  },
  {
    id: 5,
    name: "Car-5",
    href: "#",
    price: "$",
    imageSrc: "",
    imageAlt: "Car Picture",
  },
  {
    id: 6,
    name: "Car-6",
    href: "#",
    price: "$",
    imageSrc: "",
    imageAlt: "Car Picture",
  },
];

export default function Listings() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const getCar = async () => {
    setOpen(true);
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Listings</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {listings.map((car) => (
              <a key={car.id} href={car.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={car.imageSrc}
                    alt={car.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    onClick={getCar}
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{car.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {car.price}
                </p>
              </a>
            ))}
            ;
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Car Name
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Car Info</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
