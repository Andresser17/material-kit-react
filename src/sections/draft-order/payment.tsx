import { DraftOrder, PaymentAmounts } from "@medusajs/types";
import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";
import { DraftOrderStatus } from "src/enums";
import { IMarkPayDraftOrderModal } from "src/modals/mark-pay-draft-order-modal/mark-pay-draft-order-modal";
import { useModal } from "src/modals/useModal";

interface IPayment {
  draftOrder: DraftOrder;
  paymentAmounts: PaymentAmounts;
}

export default function Payment({ draftOrder, paymentAmounts }: IPayment) {
  const navigate = useNavigate();
  const {
    props: { redirect_url },
    onOpen: openModal,
  } = useModal<IMarkPayDraftOrderModal>("mark-pay-draft-order-modal");

  useEffect(() => {
    if (redirect_url && redirect_url.length > 0) navigate(redirect_url);
  }, [redirect_url]);

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Payment</Typography>

        {draftOrder.status !== DraftOrderStatus.COMPLETED && (
          <Button
            onClick={() => openModal({ draft_order_id: draftOrder.id })}
            size="small"
            variant="outlined"
            sx={{ fontWeight: "normal" }}
          >
            Mark as paid
          </Button>
        )}
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
      {draftOrder.cart.payment && (
        <SummaryField
          title="Payment Method"
          value={draftOrder.cart.payment.data.payment.method.label}
          bold
        />
      )}
      {/* <Typography variant="body2" sx={{ color: "#888", fontSize: 11 }}>
        Payment link: Configure payment link to store settings
      </Typography> */}
    </SectionBox>
  );
}
