import { MouseEventHandler, ReactNode } from 'react';

export interface VisualEditorProps {
  json: string;
}

export interface ToolboxEditButtonProps {
  icon: ReactNode;
  toolTip: string;
  disabled: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ToolboxPanelButtonProps {
  icon: ReactNode;
  toolTip: string;
}

export interface ToolboxPanelTextButtonProps {
  title: string;
  text: string;
  component: string;
}
