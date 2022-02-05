import { createElement, useState, Fragment, useEffect } from "react";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import { Menu, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import {
  BiChevronDown,
  BiDuplicate,
  BiTrashAlt,
  BiLinkExternal,
} from "react-icons/bi";
import slugify from "slugify";

import { capitalize, isObjectEmpty, restrict } from "utils";
import { ConfirmDeleteModal } from "components/modal";
import { ToolbarMenuItem } from "./ToolbarMenuItem";
import {
  ToolbarSectionDefault,
  ToolbarGroupDefault,
  ToolbarTextDefault,
  ToolbarDropdownDefault,
} from "components/editor/visual/toolbar/default";
import { useProgressStore, useEditorStore } from "store";
import { Button } from "components/button";
import { useAuth } from "hooks/useAuth";
import { usePrevious } from "hooks/usePrevious";

export const Toolbar = () => {
  const { user } = useAuth();

  const { active, related, query } = useEditor((state) => ({
    active: state.events.selected,
    nodes: state.nodes,
    related:
      state.events.selected.size > 0 &&
      state.nodes[[...state.events.selected][0]].related,
  }));

  const templateType = useEditorStore((state) => state.templateType);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState();

  const { register, formState, watch, setValue, trigger } = useFormContext();

  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const prevErrorMessage = usePrevious(formErrorMessage);
  const [showErrorMessage, setShowErrorMessage] = useState(true);

  useEffect(() => {
    // Set form message
    if (!isObjectEmpty(formState.errors)) {
      setFormErrorMessage(
        formState.errors[Object.keys(formState.errors)[0]].message
      );
    }
  }, [formState]);

  // Toast error
  useEffect(() => {
    if (formErrorMessage && showErrorMessage) {
      toast.error(formErrorMessage);
      setShowErrorMessage(false);
    }
  }, [formErrorMessage, showErrorMessage, prevErrorMessage]);

  let title;
  let status;
  let slug;

  if (templateType === "page") {
    title = watch("title");
    status = watch("status");
    slug = watch("slug");
  }

  if (templateType === "template") {
    title = watch("title");
    status = watch("status");
  }

  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);

  const router = useRouter();

  const { id: pageId } = router.query;

  const handleSave = async () => {
    const isValid = await trigger();

    if (isValid) {
      setIsAnimating(true);

      try {
        const json = query.serialize();
        const compressedJson = lz.encodeBase64(lz.compress(json));

        let body;

        if (templateType === "page") {
          body = {
            title,
            status,
            slug,
            frame: compressedJson,
          };
        }

        if (templateType === "template") {
          body = {
            title,
            status,
            frame: compressedJson,
          };
        }

        const res = await fetch(`/api/${templateType}/${pageId}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const { success, data } = await res.json();

        if (!success) {
          toast.error(data.message);
        } else {
          toast.success(`${capitalize(templateType)} saved.`);
        }
      } catch (error) {
        console.log(error);
        toast.error(`Error saving ${templateType}.`);
      }

      setIsAnimating(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleDelete = async () => {
    setIsAnimating(true);
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/${templateType}/${pageId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const { success } = await res.json();

      if (success) {
        toast.success(`${capitalize(templateType)} deleted.`);
        router.push(`/${templateType}s/1`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting ${templateType}.`);
    }

    setIsConfirmDeleteModalOpen(false);
    setIsDeleting(false);
    setIsAnimating(false);
  };

  const handleDuplicate = async (type) => {
    setIsAnimating(true);

    try {
      const json = query.serialize();
      const compressedJson = lz.encodeBase64(lz.compress(json));

      const body = {
        title: `Untitled ${capitalize(type)}`,
        frame: compressedJson,
      };

      const res = await fetch(`/api/${type}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const { success, data } = await res.json();

      if (success) {
        toast.success(`${capitalize(type)} duplicated.`);
        type === "page"
          ? router.push(`/pages/edit/${data.page.id}`)
          : router.push(`/templates/edit/${data.template.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error duplicating ${type}.`);
    }

    setIsAnimating(false);
  };

  const handleSlugify = (fieldValue, fieldName) => {
    let slug = slugify(fieldValue, {
      lower: true,
      strict: true,
      trim: true,
    });

    setValue(fieldName, slug);
  };

  const statusOptions = [
    { value: "drafted", text: "Drafted" },
    { value: "published", text: "Published" },
  ];

  const handlePublishedView = async () => {
    setIsAnimating(true);

    try {
      const res = await fetch(`/api/page/${pageId}`);

      const { success, data } = await res.json();

      if (!success) {
        toast.error(data.message);
      } else {
        // Throw error if page isn't published
        if (data.page.status !== "published") {
          toast.error(
            `Please change page status to Published, save, and try again.`
          );
        }
        // Redirect to published page
        else {
          // Redirect using slug
          if (data.page.slug) {
            window.open(`/${data.page.slug}`, "_blank");
          } else {
            window.open(`/${data.page.id}`, "_blank");
          }
        }
      }
    } catch (error) {
      toast.error("Error getting published page.");
    }
    setIsAnimating(false);
  };

  return (
    <>
      <ConfirmDeleteModal
        isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
        setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
        isDeleting={isDeleting}
        handleConfirmDelete={() => handleDelete()}
      />
      <div className="flex h-full flex-col">
        {active.size > 0 && (
          <div className="flex-1 overflow-scroll p-4">
            <div className="mb-5 border-b border-gray-200">
              <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                <h3 className="ml-2 mt-2 text-lg font-medium leading-6 text-gray-900">
                  Component
                </h3>
              </div>
            </div>
            {createElement(related.toolbar)}
          </div>
        )}
        {active.size <= 0 && (
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-scroll p-4">
              {restrict(["admin", "editor"], user) ? (
                <div className="mb-5 border-b border-gray-200">
                  <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                    <h3 className="ml-2 mt-2 text-lg font-medium leading-6 text-gray-900">
                      {capitalize(templateType)}
                    </h3>
                  </div>
                </div>
              ) : null}
              {restrict(["admin", "editor"], user) ? (
                <div className="space-y-2">
                  <ToolbarSectionDefault title="General">
                    <ToolbarGroupDefault full={true}>
                      <ToolbarTextDefault
                        name="title"
                        label="Title"
                        placeholder="Enter title"
                        register={register}
                        formState={formState}
                      />
                      <ToolbarDropdownDefault
                        name="status"
                        label="Status"
                        register={register}
                        formState={formState}
                        options={statusOptions}
                      />
                      <ToolbarTextDefault
                        name="slug"
                        label="Slug"
                        placeholder="Enter slug"
                        register={register}
                        formState={formState}
                        onBlur={(e) => handleSlugify(e.target.value, "slug")}
                      />
                    </ToolbarGroupDefault>
                  </ToolbarSectionDefault>
                </div>
              ) : null}
              {restrict(["user"], user) && templateType === "page" ? (
                <div className="space-y-2">
                  <ToolbarSectionDefault title="General">
                    <ToolbarGroupDefault full={true}>
                      <ToolbarTextDefault
                        name="title"
                        label="Title"
                        placeholder="Enter title"
                        register={register}
                        formState={formState}
                      />
                      <ToolbarDropdownDefault
                        name="status"
                        label="Status"
                        register={register}
                        formState={formState}
                        options={statusOptions}
                      />
                    </ToolbarGroupDefault>
                  </ToolbarSectionDefault>
                </div>
              ) : null}
              {restrict(["user"], user) && templateType === "template" ? (
                <div className="flex h-full flex-1 flex-col items-center justify-center text-center">
                  <h2 className="pb-1 text-xs text-gray-500">
                    Click on a component to start editing.
                  </h2>
                </div>
              ) : null}
            </div>
          </div>
        )}
        {/* Options and save buttons */}
        <div className="flex justify-end space-x-2 border-t border-gray-200 bg-gray-100 px-4 py-2">
          {restrict(["admin", "editor"], user) ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Options
                    <BiChevronDown
                      className="-mr-1 ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 bottom-0 mt-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {templateType === "page" ? (
                        <Menu.Item>
                          {({ active }) => (
                            <ToolbarMenuItem
                              text={
                                <>
                                  <BiLinkExternal
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  View Published
                                </>
                              }
                              active={active}
                              onClick={() => handlePublishedView()}
                            />
                          )}
                        </Menu.Item>
                      ) : null}
                      <Menu.Item>
                        {({ active }) => (
                          <ToolbarMenuItem
                            text={
                              <>
                                <BiLinkExternal
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                View Preview
                              </>
                            }
                            active={active}
                            onClick={() =>
                              window.open(
                                `/${templateType}s/preview/${pageId}`,
                                "_blank"
                              )
                            }
                          />
                        )}
                      </Menu.Item>
                    </div>
                    {templateType === "template" ? (
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <ToolbarMenuItem
                              text={
                                <>
                                  <BiDuplicate
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  Duplicate as Template
                                </>
                              }
                              active={active}
                              onClick={() => handleDuplicate("template")}
                            />
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <ToolbarMenuItem
                              text={
                                <>
                                  <BiDuplicate
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  Duplicate as Page
                                </>
                              }
                              active={active}
                              onClick={() => handleDuplicate("page")}
                            />
                          )}
                        </Menu.Item>
                      </div>
                    ) : null}
                    {templateType === "page" ? (
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <ToolbarMenuItem
                              text={
                                <>
                                  <BiDuplicate
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  Duplicate
                                </>
                              }
                              active={active}
                              onClick={() => handleDuplicate("page")}
                            />
                          )}
                        </Menu.Item>
                      </div>
                    ) : null}
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <ToolbarMenuItem
                            text={
                              <>
                                <BiTrashAlt
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Delete
                              </>
                            }
                            active={active}
                            onClick={() => setIsConfirmDeleteModalOpen(true)}
                          />
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Button
                text="Save"
                variant="default"
                size="sm"
                disabled={isAnimating}
                onClick={() => handleSave()}
              />
            </>
          ) : null}
          {restrict(["user"], user) && templateType === "page" ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Options
                    <BiChevronDown
                      className="-mr-1 ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 bottom-0 mt-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <ToolbarMenuItem
                            text={
                              <>
                                <BiLinkExternal
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                View Published
                              </>
                            }
                            active={active}
                            onClick={() => handlePublishedView()}
                          />
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <ToolbarMenuItem
                            text={
                              <>
                                <BiLinkExternal
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                View Preview
                              </>
                            }
                            active={active}
                            onClick={() =>
                              window.open(
                                `/${templateType}s/preview/${pageId}`,
                                "_blank"
                              )
                            }
                          />
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <ToolbarMenuItem
                            text={
                              <>
                                <BiDuplicate
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Duplicate
                              </>
                            }
                            active={active}
                            onClick={() => handleDuplicate("page")}
                          />
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <ToolbarMenuItem
                            text={
                              <>
                                <BiTrashAlt
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Delete
                              </>
                            }
                            active={active}
                            onClick={() => setIsConfirmDeleteModalOpen(true)}
                          />
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Button
                text="Save"
                variant="default"
                size="sm"
                disabled={isAnimating}
                onClick={() => handleSave()}
              />
            </>
          ) : null}
          {restrict(["user"], user) && templateType === "template" ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Options
                    <BiChevronDown
                      className="-mr-1 ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 bottom-0 mt-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <ToolbarMenuItem
                            text={
                              <>
                                <BiDuplicate
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Duplicate as Page
                              </>
                            }
                            active={active}
                            onClick={() => handleDuplicate("page")}
                          />
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
