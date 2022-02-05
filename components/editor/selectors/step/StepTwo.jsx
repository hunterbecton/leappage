import { useNode } from "@craftjs/core";

import { StepTwoSettings } from "./StepTwoSettings";
import { Icon } from "components/icon";

const defaultProps = {
  iconClass: "",
  steps: [
    {
      id: "fuaYf8xEYFwQyAuw",
      title: "Configure",
      description:
        "Configure your contact details and notification preferences.",
      icon: {
        id: "friTr1zgaALbd6JuCd8d4w",
        name: "Notification",
      },
    },
    {
      id: "nxP2ghLBa8Tm6oGj",
      title: "Import",
      description: `Don't start empty. Import your data and start right away.`,
      icon: {
        id: "bMyTcfvVLTsZ29emP7BQCN",
        name: "Import",
      },
    },
    {
      id: "sVqZY8NWWNNCB9Dm",
      title: "Invite",
      description: "Invite team members to join and start collaborating.",
      icon: {
        id: "1spUQ1q2oaqR1wFkKhX96d",
        name: "Group",
      },
    },
    {
      id: "s7YnLFiDL7kme2X2",
      title: "Integrate",
      description: "Integrate with your favorite apps and get more done.",
      icon: {
        id: "biou2LvQzWiAPZCVYwfo5U",
        name: "Link Alt",
      },
    },
  ],
};

export const StepTwo = (props) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const { steps } = props;

  const {
    connectors: { connect },
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected,
  }));

  return (
    <section ref={connect} className="w-full bg-white py-12 px-10 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-wrap">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className="relative mx-auto flex pt-10 pb-20 sm:items-center md:w-2/3"
          >
            <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
              <div className="pointer-events-none h-full w-1 bg-gray-200"></div>
            </div>
            <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white sm:mt-0">
              {i + 1}
            </div>
            <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
              <div className="inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <Icon id={step.icon.id} renderStyle="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
                <h2 className="title-font mb-1 text-xl font-medium text-gray-900">
                  {step.title}
                </h2>
                <p className="leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

StepTwo.craft = {
  displayName: "Steps",
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: StepTwoSettings,
  },
};
