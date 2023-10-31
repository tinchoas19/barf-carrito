import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authenticationRequired?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export type LayoutProps = {
  readonly children: ReactNode;
};

export interface HomePageProps {
  variables: {
    popularProducts?: any;
    types: any;
  };
  layout: string;
}

export interface SearchParamOptions {
  type: string;
  name: string;
  categories: string;
  tags: string;
  author: string;
  price: string;
  manufacturer: string;
  status: string;
  is_active: string;
  shop_id: string;
  min_price: string;
  max_price: string;
}

export interface QueryOptions {
  page: number;
  limit: number;
}

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Attachment {
  id: number;
  original: string;
  thumbnail: string;
}

export interface ProductQueryOptions extends QueryOptions {
  shop_id: string;
  sortedBy: string;
  orderBy: string;
  name: string;
  categories: string;
  category: string;
  tags: string;
  type: string;
  manufacturer: string;
  author: string;
  price: string;
  min_price: string;
  max_price: string;
  text: string;
  searchType: string;
  searchQuery: string;
}

export interface PopularProductQueryOptions extends QueryOptions {
  type_slug: string;
  with: string;
  range: number;
}

export interface CategoryQueryOptions extends QueryOptions {
  parent: string | null;
  type: string;
}

export interface TagQueryOptions extends QueryOptions {
  parent: string | null;
  type: string;
}

export interface TypeQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface ForgotPasswordUserInput {
  email: string;
}

export interface ShopQueryOptions extends QueryOptions {
  name: string;
  is_active: number;
}

export interface AuthorQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface ManufacturerQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface CouponQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface OrderQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number;
  image: Attachment;
  gallery: Attachment[];
  created_at: string;
  updated_at: string;
  isPersonalized: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: Attachment;
}

interface Banner {
  id: string;
  title: string;
  description: string;
  image: Attachment;
}

export interface Type {
  id: string;
  name: string;
  slug: string;
  banners: Banner[];
  promotional_sliders: Attachment[];
  settings: {
    isHome: boolean;
    layoutType: string;
  };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Settings {
  id: string;
  name: string;
  slug: string;
  options: {
    [key: string]: any;
  };
}

export interface Order {
  id: number | string;
  tracking_number: string;
  customer_id: number | string;
  // customer?: Maybe<User>;
  // status: OrderStatus;
  amount: number;
  children: Order[];
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway?: string;
  discount?: number;
  delivery_fee?: number;
  delivery_time: string;
  products: Product[];
  created_at: Date;
  updated_at: Date;
  billing_address?: Address;
  shipping_address?: Address;
}

export interface Address {
  id?: string;
  street_address: string;
  street_number: number;
  cityid: number;
  bell: string;
  note: string;
  wtd: number;
  wtd_note: string;
}

export interface User {
  success: any;
  id: string;
  name: string;
  surname: string;
  email: string;
  contact?: string;
  address: Address[];
  data?: Object;
}

export interface UpdateUserInput extends Partial<User> {
  id: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
  codasoc?: string;
  haveCode?: boolean;
}

export interface RegisterUserInput {
  name: string;
  surname: string;
  email: string;
  contact: string;
  password: string;
}

export interface ForgotPasswordUserInput {
  email: string;
}

export interface ResetPasswordUserInput {
  email: string;
  token: string;
  password: string;
}

export interface ChangePasswordUserInput {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  message: string;
}

export interface AuthResponseData {
  token: string;
  error: string;
}

export interface AuthResponse {
  data: AuthResponseData;
  status: string;
  status_message: string;
}

export interface DigitalFile {
  id: string;
  fileable: Product;
}

export interface DownloadableFile {
  id: string;
  purchase_key: string;
  digital_file_id: string;
  customer_id: string;
  file: DigitalFile;
  created_at: string;
  updated_at: string;
}

export interface CreateContactUsInput {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface UpdateRatingInput {
  rating: string;
  clientid: string;
}

export interface CardInput {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  email?: string;
}

enum PaymentGatewayType {
  STRIPE = 'Stripe',
  CASH_ON_DELIVERY = 'Cash on delivery',
  CASH = 'Cash',
  FULL_WALLET_PAYMENT = 'Full wallet payment',
}

export interface CreateOrderInput {
  //$clienteid, $fechayhora, $tipoentregaid, $diaentrega,
  //$direccionentregaid, $formapagoid, $nota, $decuentoporcentaje, $productos
  customer_id: string;
  delivery_type_id: number; // RETIRO 1 ENVIO 2
  shipping_address_id: number;
  delivery_day: string | any;
  payment_id: string;
  note: string;
  delivery_fee: number;
  products: ConnectProductOrderPivot[] | any;
  total_price: number | null;

  //Todo estos campos sobran
  /* customer_contact: string;
  status: string;
  amount: number;
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_gateway: PaymentGatewayType;
  coupon_id?: string;
  shop_id?: string;
  discount?: number;
  use_wallet_points?: boolean;
  delivery_fee?: number;
  delivery_time?: string;
  card: CardInput;
  token?: string;
  billing_address: Address; */
}
export interface OrderStatus {
  id: string;
  name: string;
  color: string;
  serial: number;
  created_at: string;
  updated_at: string;
}

export interface ConnectProductOrderPivot {
  id: number;
  quantity: number;
  unit_price: number;
  subtotalkilos: number;

  //Este campo
  variation_option_id: number;
  subtotal: number;
}
export interface CheckoutVerificationInput {
  amount: number;
  products: ConnectProductOrderPivot[];
  billing_address?: Address;
  shipping_address?: Address;
}

export interface VerifiedCheckoutData {
  total_tax: number;
  shipping_charge: number;
  unavailable_products?: number[];
  wallet_currency?: number;
  wallet_amount?: number;
}

export interface ProductPaginator extends PaginatorInfo<Product> {}

export interface CategoryPaginator extends PaginatorInfo<Category> {}

export interface TagPaginator extends PaginatorInfo<Tag> {}

export interface OrderPaginator extends PaginatorInfo<Order> {}

export interface OrderStatusPaginator extends PaginatorInfo<OrderStatus> {}

export interface DownloadableFilePaginator
  extends PaginatorInfo<DownloadableFile> {}
