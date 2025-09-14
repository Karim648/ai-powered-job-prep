import { PricingTable } from "@/services/clerk/components/PricingTable";
import { BackLink } from "@/components/BackLink";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UpgradePage() {
  return (
    <div className="container max-w-6xl py-4">
      <div className="mb-4">
        <BackLink href="/app">Dashboard</BackLink>
      </div>

      <div className="space-y-16">
        <Alert variant="warning">
          <AlertTriangle />
          <AlertTitle>Plan Limit Reached</AlertTitle>
          <AlertDescription>
            You have reached the limit of your current plan. Please upgrade to
            continue using all features.
          </AlertDescription>
        </Alert>

        <PricingTable />
      </div>
    </div>
  );
}
