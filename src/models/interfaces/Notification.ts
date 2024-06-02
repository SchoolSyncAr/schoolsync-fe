export interface NotifProps {
  id: number; // Asegúrate de que el ID sea requerido
  title?: string;
  content?: string;
  weight?: string;
  sender?: number;
  scope?: string;
  recipientGroups?: string[];
  recipient?: number;
  read?: boolean;
  pinned?: boolean;
  handlePinned?: (id: number) => Promise<void>;
  handleRead?: (id: number) => Promise<void>
}