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
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsvRow(customer: CustomerListItemOutput): string {
  return [
    customer.name,
    customer.phone,
    customer.governorates.join("; "),
    String(customer.orderCount),
    customer.totalSpent.toFixed(3),
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
export function exportCustomersToCsv(customers: CustomerListItemOutput[]): void {
  const rows = [CSV_HEADERS.join(","), ...customers.map(toCsvRow)];
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
