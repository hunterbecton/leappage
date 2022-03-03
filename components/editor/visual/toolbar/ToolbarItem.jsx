import { useNode } from '@craftjs/core';

import {
  ToolbarText,
  ToolbarTextArea,
  ToolbarTextDropdown,
  ToolbarDropdown,
  ToolbarIconDropdown,
  ToolbarColorPicker,
  ToolbarRange,
  ToolbarImage,
  ToolbarToggle,
  ToolbarFonts,
  ToolbarContent,
  ToolbarTestimonial,
} from 'components/editor/visual/toolbar';

export const ToolbarItem = ({
  isGroup = false,
  groupName,
  groupIndex,
  propKey,
  propKeyTwo,
  type,
  onChange,
  onChangeTwo,
  index,
  content,
  testimonial,
  mediaSize,
  defaultMediaSize,
  ...props
}) => {
  const {
    id,
    actions: { setProp },
    propValue,
    propValueTwo,
  } = useNode((node) => ({
    propValue: isGroup
      ? node.data.props[groupName][groupIndex][propKey]
      : node.data.props[propKey],
    propValueTwo: isGroup
      ? node.data.props[groupName][groupIndex][propKeyTwo]
      : node.data.props[propKeyTwo],
  }));

  const value = Array.isArray(propValue) ? propValue[index] : propValue;

  const valueTwo = Array.isArray(propValueTwo)
    ? propValueTwo[index]
    : propValueTwo;

  const handleChange = (
    updatedValue,
    propValueToUpdate,
    propKeyToUpdate,
    propKeyIndex,
    propOnChange
  ) => {
    if (isGroup) {
      setProp((props) => {
        if (Array.isArray(propValueToUpdate)) {
          props[groupName][groupIndex][propKeyToUpdate][propKeyIndex] =
            propOnChange ? propOnChange(updatedValue) : updatedValue;
        } else {
          props[groupName][groupIndex][propKeyToUpdate] = propOnChange
            ? propOnChange(updatedValue)
            : updatedValue;
        }
      });
    } else {
      setProp((props) => {
        if (Array.isArray(propValueToUpdate)) {
          props[propKeyToUpdate][propKeyIndex] = propOnChange
            ? propOnChange(updatedValue)
            : updatedValue;
        } else {
          props[propKeyToUpdate] = propOnChange
            ? propOnChange(updatedValue)
            : updatedValue;
        }
      });
    }
  };

  return (
    <>
      {type === 'text' ? (
        <ToolbarText
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
        />
      ) : null}
      {type === 'area' ? (
        <ToolbarTextArea
          {...props}
          propKey={propKey}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
        />
      ) : null}
      {type === 'textDropdown' ? (
        <ToolbarTextDropdown
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
          propKeyTwo={propKeyTwo}
          valueTwo={valueTwo}
          onChangeTwo={(value) =>
            handleChange(value, propValueTwo, propKeyTwo, index, onChangeTwo)
          }
        />
      ) : null}
      {type === 'color' ? (
        <ToolbarColorPicker
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
        />
      ) : null}
      {type === 'select' ? (
        <ToolbarDropdown
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
        />
      ) : null}
      {type === 'range' ? (
        <ToolbarRange
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
        />
      ) : null}
      {type === 'image' ? (
        <ToolbarImage
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
          id={id}
          isGroup={isGroup}
          groupName={groupName}
          groupIndex={groupIndex}
          defaultMediaSize={defaultMediaSize}
        />
      ) : null}
      {type === 'toggle' ? (
        <ToolbarToggle
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
        />
      ) : null}
      {type === 'fonts' ? (
        <ToolbarFonts
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
        />
      ) : null}
      {type === 'icon' ? (
        <ToolbarIconDropdown
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          onChange={(value) =>
            handleChange(value, propValue, propKey, index, onChange)
          }
        />
      ) : null}
      {type === 'content' ? (
        <ToolbarContent
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          id={id}
          isGroup={isGroup}
          groupName={groupName}
          groupIndex={groupIndex}
          content={content}
        />
      ) : null}
      {type === 'testimonial' ? (
        <ToolbarTestimonial
          {...props}
          propKey={propKey}
          type={type}
          value={value}
          id={id}
          isGroup={isGroup}
          groupName={groupName}
          groupIndex={groupIndex}
          testimonial={testimonial}
        />
      ) : null}
    </>
  );
};
