import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Select } from "./select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = ({
  options,
  placeholder,
  icon,
  label,
  hint,
  error,
  disabled,
}) => (
  <div style={{ padding: 10 }}>
    <Select
      options={options}
      placeholder={placeholder}
      icon={icon}
      hint={hint}
      label={label}
      error={error}
      disabled={disabled}
      onChange={() => {}}
    />
  </div>
);

const options = [
  { id: 1, value: "Phoenix Baker" },
  { id: 2, value: "Olivia Rhye" },
  { id: 3, value: "Lana Steiner" },
  { id: 4, value: "Demi Wilkinson" },
  { id: 5, value: "Candice Wu" },
  { id: 6, value: "Natali Craig" },
  { id: 7, value: "Drew Cano" },
];

export const Default = Template.bind({});
Default.args = {
  options: options,
  placeholder: "Select team member",
  icon: "/icons/user.svg",
  label: "Team member",
  hint: "This is a hint text to help user.",
  error: "This is an error message.",
  disabled: false,
};
