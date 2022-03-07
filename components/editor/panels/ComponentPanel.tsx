import { FC, Fragment } from 'react';
import { useEditor } from '@craftjs/core';
import { Dialog, Transition } from '@headlessui/react';
import { BiX } from 'react-icons/bi';
import Image from 'next/image';

import { components } from 'data/components';
import { useComponentPanelStore } from 'store';

export const ComponentPanel: FC = () => {
  const isComponentPanelOpen = useComponentPanelStore(
    (state) => state.isComponentPanelOpen
  );

  const activeComponent = useComponentPanelStore(
    (state) => state.activeComponent
  );

  const title = useComponentPanelStore((state) => state.title);

  const setIsComponentPanelOpen = useComponentPanelStore(
    (state) => state.setIsComponentPanelOpen
  );

  const {
    query: { parseReactElement },
    actions: { addNodeTree },
  } = useEditor(() => ({}));

  return (
    <Transition.Root show={isComponentPanelOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-30 overflow-hidden'
        onClose={setIsComponentPanelOpen}
      >
        <div className='absolute inset-0 overflow-hidden'>
          <Dialog.Overlay className='absolute inset-0' />

          <div className='fixed inset-y-0 left-0 flex max-w-full pr-10'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='w-screen max-w-md'>
                <div className='flex h-full flex-col overflow-y-scroll bg-gray-50 py-6 px-4 shadow-xl'>
                  <div className='mb-6 border-b border-gray-200 bg-gray-50 '>
                    <div className='flex items-start justify-between pb-4'>
                      <Dialog.Title className='text-lg font-medium text-gray-900'>
                        {title}
                      </Dialog.Title>
                      <div className='ml-3 flex h-7 items-center'>
                        <button
                          type='button'
                          className='rounded-md bg-gray-50 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                          onClick={() => setIsComponentPanelOpen(false)}
                        >
                          <span className='sr-only'>Close panel</span>
                          <BiX className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative space-y-6'>
                    {components[activeComponent].map(
                      ({ component, img, title, width, height }) => (
                        <button
                          key={title}
                          type='button'
                          onClick={() => {
                            const nodeTree =
                              parseReactElement(component).toNodeTree();
                            addNodeTree(nodeTree, 'ROOT');
                            setIsComponentPanelOpen(false);
                          }}
                          className='flex w-full shadow transition-shadow hover:shadow-lg'
                        >
                          <Image
                            src={img}
                            alt={title}
                            width={width}
                            height={height}
                          />
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
