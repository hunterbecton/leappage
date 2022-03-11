export interface ComponentPanelState {
  isComponentPanelOpen: boolean;
  setIsComponentPanelOpen: (isComponentPanelOpen: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  activeComponent: string;
  setActiveComponent: (activeComponent: string) => void;
}

export interface EditorState {
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
  isMediaModalOpen: boolean;
  setIsMediaModalOpen: (isMediaModalOpen: boolean) => void;
  activeFieldId: string;
  setActiveFieldId: (setActiveFieldId: string) => void;
  activeImageProp: string;
  setActiveImageProp: (activeImageProp: string) => void;
  isContentModalOpen: boolean;
  setIsContentModalOpen: (isContentModalOpen: boolean) => void;
  isGroup: boolean;
  setIsGroup: (isGroup: boolean) => void;
  groupName: string;
  setGroupName: (groupName: string) => void;
  groupIndex: number;
  setGroupIndex: (groupIndex: number) => void;
  templateType: string;
  setTemplateType: (templateType: string) => void;
  isTestimonialModalOpen: boolean;
  setIsTestimonialModalOpen: (isTestimonialModalOpen: boolean) => void;
  shouldSave: boolean;
  setShouldSave: (shouldSave: boolean) => void;
  mediaSize: string;
  setMediaSize: (mediaSize: string) => void;
}

export interface MediaModalState {
  isMediaModalOpen: boolean;
  setIsMediaModalOpen: (isMediaModalOpen: boolean) => void;
  activeImageName: string;
  setActiveImageName: (activeImageName: string) => void;
  mediaSize: string;
  setMediaSize: (mediaSize: string) => void;
}

export interface ProgressState {
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}
