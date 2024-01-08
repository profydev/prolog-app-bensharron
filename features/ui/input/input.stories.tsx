import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = ({
  placeholder,
  icon,
  label,
  hint,
  error,
  errorMsg,
  disabled,
}) => (
  <div style={{ padding: 10 }}>
    <Input
      placeholder={placeholder}
      icon={icon}
      hint={hint}
      label={label}
      error={error}
      errorMsg={errorMsg}
      disabled={disabled}
      onChange={() => {}}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "olivia@untitledui.com",
  icon: "/icons/mail.svg",
  label: "Email",
  hint: "This is a hint text to help user.",
  error: true,
  errorMsg: "This is an error message.",
  disabled: false,
};
