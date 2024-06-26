import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { useEffect } from "react";
import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";
import { IMarkPayDraftOrderModal } from "src/modals/mark-pay-draft-order-modal/mark-pay-draft-order-modal";
import { useModal } from "src/modals/useModal";
import { useMarkPayDraftOrder } from "src/mutations/use-mark-pay-draft-order";
import { PaymentAmounts } from "./view/draft-order-view";

interface IPayment {
  draftOrderId: string;
  paymentAmounts: PaymentAmounts;
}

export default function Payment({ draftOrderId, paymentAmounts }: IPayment) {
  const {
    props: { data },
    onOpen: openModal,
  } = useModal<IMarkPayDraftOrderModal>("mark-pay-draft-order-modal");
  const { mutate: markPayDraftOrderMutation } = useMarkPayDraftOrder();

  useEffect(() => {
    if (data) {
      markPayDraftOrderMutation({
        draft_order_id: draftOrderId,
        data,
      });
    }
  }, [data]);

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Payment</Typography>
        <Button
          onClick={() => openModal()}
          size="small"
          variant="outlined"
          sx={{ fontWeight: "normal" }}
        >
          Mark as paid
        </Button>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <SummaryField
        title="Subtotal"
        value={`$${paymentAmounts.subtotal} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Shipping"
        value={`$${paymentAmounts.shipping_total} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Tax"
        value={`$${paymentAmounts.tax_total} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Total to pay"
        value={`$${paymentAmounts.total} USD`}
        bold
      />
      <Typography variant="body2" sx={{ color: "#888", fontSize: 11 }}>
        Payment link: Configure payment link to store settings
      </Typography>
    </SectionBox>
  );
}
