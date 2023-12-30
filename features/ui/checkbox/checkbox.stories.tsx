import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox, CheckboxSize, CheckboxState } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = ({
  size,
  label,
  state,
  disabled,
}) => (
  <div style={{ padding: 10 }}>
    <Checkbox size={size} label={label} state={state} disabled={disabled} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: CheckboxSize.small,
  label: "Label",
  state: CheckboxState.unchecked,
  disabled: false,
};
