import { DraftOrder } from "@medusajs/types";
import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";
import { DraftOrderStatus } from "src/enums";
import { IMarkPayDraftOrderModal } from "src/modals/mark-pay-draft-order-modal/mark-pay-draft-order-modal";
import { useModal } from "src/modals/useModal";
import { formatCurrency } from "src/utils/format-number";

interface IPayment {
  draftOrder: DraftOrder;
}

export default function Payment({ draftOrder }: IPayment) {
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
        value={`${formatCurrency(draftOrder.cart.subtotal)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Shipping"
        value={`${formatCurrency(draftOrder.cart.shipping_total)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Tax"
        value={`${formatCurrency(draftOrder.cart.tax_total ?? 0)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Total to pay"
        value={`${formatCurrency(draftOrder.cart.otal)} USD`}
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
