import type { store } from "@dukkani/common/schemas";
import type { CustomerListItemOutput } from "@dukkani/common/schemas/customer/output";

const CSV_HEADERS = [
  "Name",
  "Phone",
  "Governorates",
  "Orders",
  "Total Spent",
  "Last Order",
];

function escapeCsvField(value: string): string {
  const safeValue = /^[=+\-@]/.test(value) ? `'${value}` : value;
  if (/[",\n]/.test(safeValue)) {
    return `"${safeValue.replace(/"/g, '""')}"`;
  }
  return safeValue;
}

function getCurrencyDecimalDigits(
  currency: store.SupportedCurrencyInfer,
): number {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).resolvedOptions().maximumFractionDigits ?? 2
  );
}

function toCsvRow(
  customer: CustomerListItemOutput,
  totalSpentDecimalDigits: number,
): string {
  return [
    customer.name,
    customer.phone,
    customer.governorates.join("; "),
    String(customer.orderCount),
    customer.totalSpent.toFixed(totalSpentDecimalDigits),
    customer.lastOrderAt ? new Date(customer.lastOrderAt).toISOString() : "",
  ]
    .map(escapeCsvField)
    .join(",");
}

/**
 * Builds a CSV from already-fetched customer rows and triggers a browser
 * download. Client-side only — bulk actions operate on the currently
 * loaded/selected page, no dedicated export endpoint needed.
 */
export function exportCustomersToCsv(
  customers: CustomerListItemOutput[],
  currency: store.SupportedCurrencyInfer,
): void {
  const totalSpentDecimalDigits = getCurrencyDecimalDigits(currency);
  const rows = [
    CSV_HEADERS.join(","),
    ...customers.map((c) => toCsvRow(c, totalSpentDecimalDigits)),
  ];
  const csv = rows.join("\n");
  // UTF-8 BOM: without it, Excel misreads non-ASCII bytes (Arabic names,
  // governorates) as a different encoding and renders mojibake.
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `customers-export-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
