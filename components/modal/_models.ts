export interface ApiKeyModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  apiKey: string;
}

export interface ConfirmDeleteModalProps {
  isConfirmDeleteModalOpen: boolean;
  setIsConfirmDeleteModalOpen: (isConfirmDeleteModalOpen: boolean) => void;
  isDeleting: boolean;
  title?: string;
  text?: string;
  handleConfirmDelete: () => void;
}

export interface ConfirmTeammateModalProps {
  isConfirmTeammateModalOpen: boolean;
  setIsConfirmTeammateModalOpen: (isConfirmTeammateModalOpen: boolean) => void;
  isConfirming: boolean;
  title?: string;
  text?: string;
  handleConfirmTeammate: () => void;
}

export interface UploadFileModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface UploadFileModalData {
  uploadFile: any;
}
