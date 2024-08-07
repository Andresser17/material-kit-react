import {
  CartLineItemDTO,
  OrderDTO,
  PaymentSessionDTO,
  PriceListDTO,
  ProductVariantDTO,
  SalesChannelDTO,
  ShippingOptionDTO,
} from "@medusajs/types";

import { Theme as OriginalTheme } from "@mui/material/styles";

import { CurrencyDTO } from "@medusajs/types";
import { Option } from "./components/controlled-select";
import { DraftOrderStatus, LotStatus, OrderStatus } from "./enums";
import ProductStatus from "./sections/add-product/product-status";
import HTTPError from "./utils/http-error";

import { FulfillmentStatus, PaymentStatus } from "./enums";

export declare module "@mui/material/styles" {
  interface Color {
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
  }
  interface Theme {
    palette: {
      primary: Color;
      secondary: Color;
      info: Color;
      success: Color;
      warning: Color;
      error: Color;
      common: {
        black: string;
        white: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      background: {
        paper: string;
        default: string;
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

      card: string;
      dropdown: string;
      dialog: string;
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
    images: Image[];
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
    type: ProductType | null;
    tags: ProductTag[];
    options: ProductOption[];
    discountable: boolean;
    variants: ProductVariant[];
    external_id: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    metadata: Record<string, unknown>;
    warranty_time: number;
  }

  interface ProductOption {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    title: string;
    values: ProductOptionValue[];
    product_id: string;
    product: Product;
    metadata: Record<string, unknown>;
  }

  interface ProductOptionValue {
    id: string;
    value: string;
    option: ProductOption;
    variant: ProductVariant;
    metadata: null | Record<string, unknown>;
    deleted_at: string | Date;
  }

  interface ProductOptionRequest {
    option_id: string;
    title: string;
    value: string;
  }

  interface Image {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | Date;
    url: string;
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

  interface Order extends OrderDTO {
    [key: string]:
      | string
      | Date
      | null
      | LineItem[]
      | Region
      | Discount[]
      | GiftCard[]
      | Customer
      | PaymentSessionDTO
      | ShippingMethod[]
      | CartType
      | SalesChannel
      | SalesChannel[]
      | number
      | Record<string, unknown>;
    created_at: Data;
    cart_id: string;
    items: LineItem[];
    customer: CustomerDTO;
    display_id: number;
    status: OrderStatus;
    fulfillment_status: FulfillmentStatus;
    payment_status: PaymentStatus;
    sales_channel: SalesChannelDTO;
    payments: Payment[];
    shipping_methods: ShippingMethod[];
    shipping_address: Address;
  }

  interface ShippingMethod {
    id: string;
    shipping_option_id: string;
    order_id: string;
    order: Order;
    claim_order_id: null | string;
    claim_order: ClaimOrder;
    cart_id: string;
    cart: Cart;
    swap_id: string;
    swap: Swap;
    return_id: string;
    return_order: Return;
    shipping_option: ShippingOption;
    tax_lines: ShippingMethodTaxLine[];
    price: number;
    data: ShippingMethodData;
    includes_tax: boolean;
    subtotal: number;
    total: number;
    tax_total: number;
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
    cart: Cart;
    cart_id: string;
    order: Order;
    order_id: string;
    canceled_at: string;
    no_notification_order: boolean;
    metadata: Record<string, unknown> | null;
  }

  interface DraftOrderRequest
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
    shipping_methods: ShippingMethodRequest[];
    status: DraftOrderStatus;
    billing_address: ShippingAddress;
    shipping_address: ShippingAddress;
    items: LineItem[];
    discounts: { code: string }[];
    customer_id: string;
    no_notification_order: boolean;
    metadata: Record<string, unknown>;
  }

  interface ShippingMethodRequest {
    option_id: string;
    data: ShippingMethodData;
    price: number;
  }

  type ShippingMethodData = {
    id: string;
    name: string;
    customer: {
      first_name: string;
      last_name: string;
      document: string;
      phone: string;
    };
    destination: {
      agency: string;
      city: string;
      state: string;
    };
  };

  interface LineItem {
    [key: string]:
      | string
      | Date
      | null
      | LineItem[]
      | Region
      | Discount[]
      | GiftCard[]
      | Customer
      | PaymentSessionDTO
      | ShippingMethod[]
      | CartType
      | SalesChannel
      | SalesChannel[]
      | number
      | Record<string, unknown>;
    id: string;
    created_at: Date;
    updated_at: Date;
    cart_id: string;
    cart: Cart;
    order: Order;
    swap_id: string;
    swap: Swap;
    claim_order_id: string;
    claim_order: ClaimOrder;
    tax_lines: LineItemTaxLine[];
    adjustments: LIneItemAdjustment[];
    title: string;
    description: null | string;
    thumbnail: null | string;
    is_return: boolean;
    is_giftcard: boolean;
    should_merge: boolean;
    allow_discounts: boolean;
    has_shipping: null | boolean;
    unit_price: number;
    variant_id: null | string;
    variant: ProductVariant;
    product_id: null | string;
    quantity: number;
    fulfilled_quantity: null | number;
    returned_quantity: null | number;
    shipped_quantity: null | number;
    metadata: Record<string, unknown>;
    includes_tax: boolean;
    original_item_id: null | string;
    order_edit_id: null | string;
    order_edit: null | OrderEdit;
    refundable: null | number;
    subtotal: null | number;
    tax_total: null | number;
    total: null | number;
    original_total: null | number;
    original_tax_total: null | number;
    discount_total: null | number;
    raw_discount_total: null | number;
    gift_card_total: null | number;
  }

  interface Cart {
    [key: string]:
      | string
      | Date
      | null
      | LineItem[]
      | Region
      | Discount[]
      | GiftCard[]
      | Customer
      | PaymentSessionDTO
      | ShippingMethod[]
      | CartType
      | SalesChannel
      | SalesChannel[]
      | number
      | Record<string, unknown>;
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | Date;
    object: "card";
    email: string;
    billing_address_id: string;
    billing_address: string;
    shipping_address_id: string;
    shipping_address: null | Address;
    items: LineItem[];
    region_id: string;
    region: Region;
    discounts: Discount[];
    gift_cards: GiftCard[];
    customer_id: string;
    customer: Customer;
    payment_session: null | PaymentSessionDTO;
    payment_sessions: PaymentSession[];
    payment_id: string;
    payment: Payment;
    shipping_methods: ShippingMethod[];
    type: CartType;
    completed_at: Date;
    payment_authorized_at: Date;
    idempotency_key: string;
    context: Record<string, unknown>;
    metadata: Record<string, unknown>;
    sales_channel_id: null | string;
    sales_channel: SalesChannel;
    sales_channels: SalesChannel[];
    shipping_total: number;
    discount_total: number;
    raw_discount_total: number;
    item_tax_total: null | number;
    shipping_tax_total: null | number;
    tax_total: null | number;
    refunded_total: number;
    total: number;
    subtotal: number;
    refundable_amount: number;
    gift_card_total: number;
    gift_card_tax_total: number;
  }

  interface CartLineItem extends CartLineItemDTO {
    [key: string]:
      | string
      | Date
      | null
      | LineItem[]
      | Region
      | Discount[]
      | GiftCard[]
      | Customer
      | PaymentSessionDTO
      | ShippingMethod[]
      | CartType
      | SalesChannel
      | SalesChannel[]
      | number
      | Record<string, unknown>;
  }

  interface Address {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | Date;
    customer_id: null | string;
    customer: null | Customer;
    company: null | string;
    first_name: null | string;
    last_name: null | string;
    address_1: null | string;
    address_2: null | string;
    city: null | string;
    country_code: null | string;
    country: null | Country;
    province: null | string;
    postal_code: null | string;
    phone: null | string;
    metadata: Record<string, unknown>;
  }

  interface Customer {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | Date;
    email: string;
    first_name: string;
    last_name: string;
    document: string;
    mercado_libre: string;
    instagram: string;
    facebook: string;
    billing_address_id: null | string;
    billing_address: Address;
    shipping_addresses: Address[];
    password_hash: string;
    phone: string;
    has_account: boolean;
    orders: Order[];
    groups: CustomerGroup[];
    metadata: Record<string, unknown>;
  }

  interface ProductVariant extends ProductVariantDTO {
    product_id: string;
    prices: MoneyAmount[];
    product: Product;
  }

  interface ShippingOption extends ShippingOptionDTO {
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
    type_id: string | null;
    type: { value: string; id: string } | null;
    collection: Option | null;
    collection_id: string | null;
    tags: { id: string; value: string }[];
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
    warranty_time: number;
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

  interface ProductVariantRequest {
    title?: string;
    sku?: string | null;
    ean?: string | null;
    upc?: string | null;
    barcode?: string | null;
    hs_code?: string | null;
    inventory_quantity?: number;
    allow_backorder?: boolean;
    manage_inventory?: boolean;
    weight?: number | null;
    length?: number | null;
    height?: number | null;
    width?: number | null;
    origin_country?: string | null;
    mid_code?: string | null;
    material?: string | null;
    metadata?: Record<string, unknown>;
    prices?: PriceAmountRequest[];
    options?: { option_id: string; value: string }[];
  }

  interface PriceAmountRequest {
    amount: number;
    region_id: string | null;
    currency_code: string | null;
    min_quantity: number | null;
    max_quantity: number | null;
  }

  interface Lot {
    id?: string;
    created_at?: string;
    updated_at?: string;
    name?: string;
    description?: string;
    status?: LotStatus;
    cost?: {
      amount: number;
      currency: string;
      payment: {
        method: string;
        fee: {
          amount: number;
          currency: string;
        };
      };
    };
    items?: {
      quantity: number;
      cost_per_item: number;
    };
    courier?: {
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
    ownership?: {
      name: string | null;
      investment: {
        amount: number;
        currency: string;
      };
    }[];
    stock?: { variant_id: string; quantity: number }[];
    products?: Product[];
  }

  interface PaymentAmounts {
    [key: string]: string;
    total: string;
    subtotal: string;
    shipping_total: string;
    tax_total: string;
  }

  interface Warranty {
    id: string;
    created_at: Date;
    updated_at: Date;
    time: number;
    expiration_date: Date;
    barcodes: Barcode[];
    photos: {
      url: string;
      key: string;
    }[];
    order: Order;
    line_item: LineItem;
  }

  interface Barcode {
    id: string;
    type: string;
    value: string;
    description: string;
  }

  interface MoneyAmount {
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | date;
    currency_code: string;
    amount: number;
    min_quantity: null | number;
    max_quantity: null | number;
    price_list_id: null | string;
    price_list: null | PriceListDTO;
    variants: ProductVariant[];
    variant: ProductVariant;
    variant_id: string;
    region_id: null | string;
    currency: CurrencyDTO;
    region: Region;
  }
}
