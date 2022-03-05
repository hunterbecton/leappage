import create from 'zustand';
import { EditorState } from './_model';

export const useEditorStore = create<EditorState>((set) => ({
  isEnabled: true,
  setIsEnabled: (isEnabled) => set(() => ({ isEnabled })),
  isMediaModalOpen: false,
  setIsMediaModalOpen: (isMediaModalOpen) => set(() => ({ isMediaModalOpen })),
  activeFieldId: '',
  setActiveFieldId: (activeFieldId) => set(() => ({ activeFieldId })),
  activeImageProp: '',
  setActiveImageProp: (activeImageProp) => set(() => ({ activeImageProp })),
  isContentModalOpen: false,
  setIsContentModalOpen: (isContentModalOpen) =>
    set(() => ({ isContentModalOpen })),
  isGroup: false,
  setIsGroup: (isGroup) => set(() => ({ isGroup })),
  groupName: '',
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
  mediaSize: '500',
  setMediaSize: (mediaSize) => set(() => ({ mediaSize })),
}));
