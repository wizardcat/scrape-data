export interface Attachment {
  title: string;
  link: string;
  fileName: string;
}
export interface BidDetails {
  title: string;
  id: string;
  dueDate: string;
  solicitationSummary: string;
  mainCategory: string;
  solicitationType: string;
  attachments: Attachment[];
}
