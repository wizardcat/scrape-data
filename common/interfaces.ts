interface attachment {
  title: string;
  link: string;
}
export interface BidDetails {
  title: string;
  id: string;
  dueDate: string;
  solicitationSummary: string;
  mainCategory: string;
  solicitationType: string;
  attachments: attachment[];
}
