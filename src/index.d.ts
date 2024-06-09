import {
  AddressDTO,
  MoneyAmountDTO,
  SalesChannelDTO,
  ProductVariantDTO,
} from "@medusajs/types";

import { Theme as OriginalTheme } from "@mui/material/styles";

import HTTPError from "./utils/http-error";
import { LotStatus, DraftOrderStatus } from "./enums";
import { Option } from "./components/controlled-select";
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

export declare module "@tanstack/react-query" {
  interface Register {
    defaultError: HTTPError;
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
    collection_id: string | null;
    collection: ProductCollection | null;
    type_id: string;
    tags: ProductTag[];
    discountable: boolean;
    variants: ProductVariant[];
    external_id: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    metadata: Record<string, unknown>;
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
    display_id: number;
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
    customer: CustomerDTO;
    order_id: string;
    order: Order;
    canceled_at: string;
    completed_at: string;
    no_notification_order: boolean;
    metadata: Record<string, unknown>;
  }

  interface DraftOrderResponse {
    id: string;
    created_at: string;
    updated_at: string;
    status: DraftOrderStatus;
    display_id: number;
    cart: CartDTO;
    cart_id: string;
    order: OrderDTO;
    order_id: string;
    canceled_at: string;
    no_notification_order: boolean;
    metadata: Record<string, unknown> | null;
  }

  interface ShippingAddress extends AddressDTO {
    first_name: string;
    last_name: string;
  }

  interface CustomerDTO {
    shipping_addresses: ShippingAddress[];
  }

  interface ProductVariant extends ProductVariantDTO {
    prices: MoneyAmountDTO[];
  }

  interface ShippingOptionDTO {
    amount: number;
    region: Region;
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
    type: { value: string; id: string } | null;
    collection: Option | null;
    collection_id: string | null;
    tags: Option[];
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

  interface ProductType {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    value: string;
    metadata: Record<string, unknown>;
  }

  interface ProductCollection {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    title: string;
    handle: string;
    products: Product[];
    metadata: Record<string, unknown>;
  }

  interface ProductTag {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    value: string;
    metadata: Record<string, unknown>;
  }

  interface MostUsedProductTag {
    id: string;
    usage_count: number;
    value: string;
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

  export interface DraftOrderRequest
    extends Omit<
      DraftOrder,
      "id",
      "created_at",
      "canceled_at",
      "updated_at",
      "deleted_at"
    > {
    email: string;
    region_id: string;
    shipping_methods: {
      option_id: string;
      data: Record<string, unknown>;
      price: number;
    }[];
    status: DraftOrderStatus;
    billing_address: ShippingAddress;
    shipping_address: ShippingAddress;
    items: DraftOrderLineItem[];
    discounts: { code: string }[];
    customer_id: string;
    no_notification_order: boolean;
    metadata: Record<string, unknown>;
  }

  interface DraftOrderLineItem {
    quantity: number;
    variant_id: string;
    unit_price: number;
    title: string;
    metadata?: Record<string, unknown> | null;
  }

  interface ShippingMethodData {
    first_name: string;
    last_name: string;
    document: string;
    phone: string;
    destination_agency: string;
    destination_city: string;
    destination_state: string;
  }

  interface DraftOrderShippingMethod {
    option_id: string;
    data: Record<string, unknown>;
    price: number;
  }

  interface Lot {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    description: string | null;
    status: LotStatus;
    cost: {
      amount: number;
      currency: string;
      payment: {
        method: string;
        fee: {
          amount: number;
          currency: string;
        };
      };
    } | null;
    items: {
      quantity: number;
      cost_per_item: number;
    };
    courier: {
      company: string;
      weight: {
        amount: number;
        unit: string;
      };
      cost: {
        amount: number;
        currency: string;
      };
      payment: {
        method: string;
        fee: {
          amount: number;
          currency: string;
        };
      };
    };
    ownership: [
      {
        name: string | null;
        investment: {
          amount: number;
          currency: string;
        };
      },
    ];
    products: Product[];
  }
}
