import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiImage, BiDuplicate, BiDotsVerticalRounded } from "react-icons/bi";

import { ProjectCard } from "components/card";
import { Container } from "components/container";
import { classNames } from "utils";

export const ProjectList = ({ items, href, type }) => {
  switch (type) {
    case "project":
      return (
        <Container size="0">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {items?.map((item) => (
              <ProjectCard key={item.id} href={href} item={item}></ProjectCard>
            ))}
          </ul>
        </Container>
      );
    case "template":
      return (
        <Container size="0">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {items?.map((item) => (
              <ProjectCard key={item.id} href={href} item={item}></ProjectCard>
            ))}
          </ul>
        </Container>
      );
    default:
      return (
        <Container size="0">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {items?.map((item) => (
              <ProjectCard key={item.id} href={href} item={item} />
            ))}
          </ul>
        </Container>
      );
  }
};

/* eslint-disable */
const ProjectOptions = () => {
  return (
    <Menu as="div" className="relative z-30 ml-auto inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          <span className="sr-only">Open options</span>
          <BiDotsVerticalRounded className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex w-full px-4 py-2 text-sm"
                  )}
                >
                  <BiImage
                    className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Export as JPG
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex w-full px-4 py-2 text-sm"
                  )}
                >
                  <BiImage
                    className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Export as PNG
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const TemplateOptions = () => {
  return (
    <Menu as="div" className="relative z-30 ml-auto inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          <span className="sr-only">Open options</span>
          <BiDotsVerticalRounded className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex w-full px-4 py-2 text-sm"
                  )}
                >
                  <BiDuplicate
                    className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Duplicate as Template
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex w-full px-4 py-2 text-sm"
                  )}
                >
                  <BiDuplicate
                    className="mr-3 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Duplicate as project
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

ProjectList.defaultProps = {
  items: [],
  href: "/templates/",
  type: "project",
};
