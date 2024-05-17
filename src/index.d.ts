import {
  MoneyAmountDTO,
  SalesChannelDTO,
  ProductVariantDTO,
} from "@medusajs/types";

import { Theme as OriginalTheme } from "@mui/material/styles";

import { DraftOrderStatus } from "./enums";
import ProductStatus from "./sections/add-product/product-status";

export declare module "@mui/material/styles" {
  interface Theme {
    palette: OriginalTheme.palette & {
      background: palette.background & {
        neutral: string;
      };
    };
    shadows: string[];
    customShadows: {
      z1: string;
      z4: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      //
      card: string;
      dropdown: string;
      dialog: string;
      //
      primary: string;
      info: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
    };
    typography: OriginalTheme.typography & {
      fontWeightSemiBold: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    shadows?: string[];
    customShadows?: Theme.customShadows;
  }
}

export declare module "@medusajs/types" {
  interface Product {
    id: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    handle: string;
    is_giftcard: boolean;
    status: ProductStatus;
    thumbnail: string;
    profile_id: string;
    weight: number;
    length: number;
    height: number;
    width: number;
    hs_code: string | null;
    origin_country: string | null;
    mid_code: string | null;
    material: string | null;
    collection_id: string;
    type_id: string;
    discountable: boolean;
    variants: ProductVariant[];
    external_id: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    metadata: { [key: string]: unknown };
  }

  interface Region {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | Date;
    name: string;
    currency_code: string;
    currency: Currency;
    tax_rate: number;
    tax_rates: null | TaxRate[];
    tax_code: string;
    gift_cards_taxable: boolean;
    automatic_taxes: boolean;
    countries: Country[];
    tax_provider_id: null | string;
    tax_provider: TaxProvider;
    payment_providers: PaymentProvider[];
    fulfillment_providers: FulfillmentProvider[];
    metadata: Record<string, unknown>;
    includes_tax: boolean;
  }

  interface OrderDTO {
    fulfillment_status: FulfillmentStatus;
    payment_status: PaymentStatus;
    sales_channel: SalesChannelDTO;
    payments: Payment[];
  }

  interface DraftOrder {
    id: string;
    created_at: string;
    updated_at: string;
    status: DraftOrderStatus;
    display_id: number;
    cart_id: string;
    cart: Cart;
    order_id: string;
    order: Order;
    canceled_at: string;
    completed_at: string;
    no_notification_order: boolean;
    metadata: Record<string, unknown>;
  }

  interface ProductVariant extends ProductVariantDTO {
    prices: MoneyAmountDTO[];
  }

  interface ProductRequest {
    title: string;
    subtitle: string;
    description: string;
    is_giftcard: boolean;
    discountable: boolean;
    images: string[];
    thumbnail: string;
    handle: string;
    status: ProductStatus;
    type: { value: string; id: string };
    collection_id: string;
    tags: { value: string; id: string }[];
    sales_channels: { id: string }[];
    categories: { id: string }[];
    options: { title: string }[];
    variants: ProductVariantRequest[];
    weight: number;
    length: number;
    height: number;
    width: number;
    hs_code: string;
    origin_country: string;
    mid_code: string;
    material: string;
    metadata: Record<string, unknown>;
  }

  interface ProductOptionRequest {
    id: string;
    title: string;
  }

  interface ProductVariantRequest {
    title: string;
    sku: string;
    ean: string;
    upc: string;
    barcode: string;
    hs_code: string;
    inventory_quantity: number;
    allow_backorder: boolean;
    manage_inventory: boolean;
    weight: number;
    length: number;
    height: number;
    width: number;
    origin_country: string;
    mid_code: string;
    material: string;
    metadata: Record<string, unknown>;
    prices: {
      amount: number;
      region_id?: string;
      currency_code?: string;
      min_quantity: number;
      max_quantity: number;
    }[];
    options: string[];
  }
}
