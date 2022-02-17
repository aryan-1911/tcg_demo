interface IModalProps {
  isPrompt: boolean;
  closeEditor(): void;
}

type ModalTypes = 'success' | 'confirm' | 'error' | 'delete' | 'info';
