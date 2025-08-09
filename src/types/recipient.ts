// src/types/recipient.ts
export interface Recipient {
  email: string;
  name?: string;
  domain?: string; // optional so both SendPage and RecipientUploader are happy
}
