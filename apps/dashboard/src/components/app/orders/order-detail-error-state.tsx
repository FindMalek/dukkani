import { Alert, AlertTitle } from "@dukkani/ui/components/alert";
import { Icons } from "@dukkani/ui/components/icons";
import { OrderDetailHeader } from "./order-detail-header";

export function OrderDetailErrorState({
  title,
  errorMessage,
}: {
  title: string;
  errorMessage: string;
}) {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="mb-4">
        <OrderDetailHeader title={title} />
      </div>
      <Alert variant="destructive">
        <Icons.alertTriangle />
        <AlertTitle>{errorMessage}</AlertTitle>
      </Alert>
    </div>
  );
}
