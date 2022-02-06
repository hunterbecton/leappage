import create from 'zustand';

export const useEditorStore = create((set) => ({
  isEnabled: true,
  setIsEnabled: (isEnabled) => set(() => ({ isEnabled })),
  isMediaModalOpen: false,
  setIsMediaModalOpen: (isMediaModalOpen) => set(() => ({ isMediaModalOpen })),
  activeFieldId: null,
  setActiveFieldId: (activeFieldId) => set(() => ({ activeFieldId })),
  activeImageProp: null,
  setActiveImageProp: (activeImageProp) => set(() => ({ activeImageProp })),
  isContentModalOpen: false,
  setIsContentModalOpen: (isContentModalOpen) =>
    set(() => ({ isContentModalOpen })),
  isGroup: false,
  setIsGroup: (isGroup) => set(() => ({ isGroup })),
  groupName: null,
  setGroupName: (groupName) => set(() => ({ groupName })),
  groupIndex: 0,
  setGroupIndex: (groupIndex) => set(() => ({ groupIndex })),
  templateType: 'page',
  setTemplateType: (templateType) => set(() => ({ templateType })),
  isTestimonialModalOpen: false,
  setIsTestimonialModalOpen: (isTestimonialModalOpen) =>
    set(() => ({ isTestimonialModalOpen })),
  shouldSave: false,
  setShouldSave: (shouldSave) => set(() => ({ shouldSave })),
}));
