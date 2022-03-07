import { FC, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { classNames } from 'utils';
import { ToolboxEditButtonProps } from './_models';

export const ToolboxEditButton: FC<ToolboxEditButtonProps> = ({
  icon,
  toolTip,
  disabled,
  onClick,
}) => {
  const [toolTipRef, setToolTipRef] = useState(null);

  return (
    <button
      type='button'
      data-tip={toolTip}
      ref={(ref) => {
        setToolTipRef(ref);
      }}
      disabled={disabled}
      className={classNames(
        disabled ? 'disabled:cursor-not-allowed disabled:opacity-50' : '',
        'flex items-center rounded-lg p-4 text-gray-200 hover:bg-gray-800'
      )}
      onClick={onClick}
      onMouseEnter={() => ReactTooltip.show(toolTipRef)}
      onMouseLeave={() => ReactTooltip.hide(toolTipRef)}
    >
      {icon}
      <span className='sr-only'>{toolTip}</span>
      <ReactTooltip
        place='right'
        backgroundColor='#1f2937'
        textColor='#E5E7EB'
      />
    </button>
  );
};
