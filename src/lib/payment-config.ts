export const bankDetails = {
  bankName: process.env.NEXT_PUBLIC_BANK_NAME ?? "HBL",
  accountHolder:
    process.env.NEXT_PUBLIC_BANK_ACCOUNT_HOLDER ?? "Mahmood Sarwar Khan",
  accountNumber:
    process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER ?? "PK86HABB0022907900842303",
  iban: process.env.NEXT_PUBLIC_BANK_IBAN ?? "PK86HABB0022907900842303",
};

export const easyPaisaDetails = {
  accountName:
    process.env.NEXT_PUBLIC_EASYPAISA_ACCOUNT_NAME ?? "Mahmood Sarwar Khan",
  accountNumber:
    process.env.NEXT_PUBLIC_EASYPAISA_ACCOUNT_NUMBER ?? "0301-5095042",
};

export const jazzCashDetails = {
  accountName:
    process.env.NEXT_PUBLIC_JAZZCASH_ACCOUNT_NAME ?? "Mahmood Sarwar Khan",
  accountNumber:
    process.env.NEXT_PUBLIC_JAZZCASH_ACCOUNT_NUMBER ?? "0301-5095042",
};

export const RECEIPT_MAX_BYTES = 5 * 1024 * 1024;
export const RECEIPT_ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/pdf": [".pdf"],
} as const;
