import type {
  Attachment,

  AuthResponse,
  CategoryPaginator,
  CategoryQueryOptions,
  ChangePasswordUserInput,
  CheckoutVerificationInput,

  CreateContactUsInput,
  CreateOrderInput,

  DownloadableFilePaginator,
  ForgotPasswordUserInput,
  LoginUserInput,
  Order,
  OrderPaginator,
  OrderQueryOptions,
  OrderStatusPaginator,
  PasswordChangeResponse,
  PopularProductQueryOptions,
  Product,
  ProductPaginator,
  ProductQueryOptions,
  QueryOptions,
  RegisterUserInput,
  ResetPasswordUserInput,
  Settings,
  Type,
  TypeQueryOptions,
  UpdateUserInput,
  User,
  VerifiedCheckoutData,
} from '@/types';
import Cookies from 'js-cookie';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { AUTH_TOKEN_KEY } from '@/lib/constants';


class Client {
/*   productsOld = {
    all: ({
      type,
      categories,
      name,
      ...params
    }: Partial<ProductQueryOptions>) =>
      HttpClient.get<ProductPaginator>(API_ENDPOINTS.PRODUCTS, {
        searchJoin: 'and',
        with: 'type;author',
        ...params,
        search: HttpClient.formatSearchParams({
          type,
          categories,
          name,

        }),
      }),
    popular: (params: Partial<PopularProductQueryOptions>) =>
      HttpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS_POPULAR, params),
    get: (slug: string) =>
      HttpClient.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${slug}`),
  }; */


  types = {
    all: (params?: Partial<TypeQueryOptions>) =>
      HttpClient.get<Type[]>(API_ENDPOINTS.TYPES, params),
    get: (slug: string) =>
      HttpClient.get<Type>(`${API_ENDPOINTS.TYPES}/${slug}`),
  };

  orders = {
    all: () =>
      HttpClient.get<Order[]>(`${API_ENDPOINTS.ORDERS}?id=${Cookies.get(AUTH_TOKEN_KEY)}`),
    get: (tracking_number: string) =>
      HttpClient.get<Order>(`${API_ENDPOINTS.ORDERS}/${tracking_number}`),
    create: (input: CreateOrderInput) =>
      HttpClient.post<Order>(API_ENDPOINTS.CREATE_ORDER, input),
    statuses: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<OrderStatusPaginator>(API_ENDPOINTS.ORDERS_STATUS, params),


    downloadable: (query?: OrderQueryOptions) =>
      HttpClient.get<DownloadableFilePaginator>(
        API_ENDPOINTS.ORDERS_DOWNLOADS,
        query
      ),
    verify: (input: CheckoutVerificationInput) =>
      HttpClient.post<VerifiedCheckoutData>(
        API_ENDPOINTS.ORDERS_CHECKOUT_VERIFY,
        input
      ),
    generateDownloadLink: (input: { digital_file_id: string }) =>
      HttpClient.post<string>(
        API_ENDPOINTS.GENERATE_DOWNLOADABLE_PRODUCT_LINK,
        input
      ),
  };
  users = {
    me: () => HttpClient.get<User>(`${API_ENDPOINTS.USERS_ME}?id=${Cookies.get(AUTH_TOKEN_KEY)}`),
    update: (user: UpdateUserInput) =>
      HttpClient.put<User>(`${API_ENDPOINTS.USERS}`, user),
    //HttpClient.put<User>(`${API_ENDPOINTS.USERS}/${user.id}`, user),
    login: (input: LoginUserInput) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),

    register: (input: RegisterUserInput) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_REGISTER, input),
    forgotPassword: (input: ForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_FORGOT_PASSWORD,
        input
      ),

    resetPassword: (input: ResetPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_RESET_PASSWORD,
        input
      ),
    changePassword: (input: ChangePasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_CHANGE_PASSWORD,
        input
      ),
    logout: () => HttpClient.post<boolean>(API_ENDPOINTS.USERS_LOGOUT, {}),
    deleteAddress: ({ id }: { id: string }) =>
      HttpClient.delete<boolean>(`${API_ENDPOINTS.USERS_ADDRESS}/${id}`),
    subscribe: (input: { email: string }) =>
      HttpClient.post<any>(API_ENDPOINTS.USERS_SUBSCRIBE_TO_NEWSLETTER, input),
    contactUs: (input: CreateContactUsInput) =>
      HttpClient.post<any>(API_ENDPOINTS.USERS_CONTACT_US, input),
  };
  settings = {
    //FIXME: check this async function
    all: async () => HttpClient.get<Settings>(API_ENDPOINTS.SETTINGS),
/*     upload: (input: File[]) => {
      let formData = new FormData();
      input.forEach((attachment) => {
        formData.append('attachment[]', attachment);
      });
      return HttpClient.post<Attachment[]>(API_ENDPOINTS.UPLOADS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }, */
  };
  products = {
    //FIXME: check this async function
    all: async (id:number) => HttpClient.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}?id=${id}`),
  };
}

export default new Client();
