import { signOutAction } from 'actions';
import axios from 'axios';
import { ShowToastError } from 'Components/Toast';
import { AppConfig } from 'config';
import store from 'config/store';
import { MESSAGE, StatusCode } from 'const';
import { session } from 'helpers';
import { debounce, isArray } from 'lodash';
import { refreshTokenSaga } from 'sagas';

interface IPayload extends IRequestData {
  partUrl: string;
  baseURL?: string;
}

interface HttpError {
  error: boolean;
  status: any;
  description: string;
}

interface HttpSuccess<T> {
  message: T;
  status: 'ok' | 'failed';
}

export type HttpResp<T = { [key in any]: string }> = T &
  HttpError &
  HttpSuccess<T>;

interface IHeaders {
  'Content-Type'?:
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data';
  // 'Access-Control-Allow-Origin': '*';
  // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
  // 'Access-Control-Request-Methods': 'GET, POST, PUT, OPTIONS';
  Authorization?: string;
}

interface IRequestData {
  data: any | null;
  method: string;
  headers: IHeaders;
  signal?: AbortSignal;
}

export const headerWithToken = () => {
  const headers: IHeaders = {};
  if (session.getToken()) {
    headers.Authorization = `Bearer ${session.getToken()}`;
  }
  return headers;
};

export const getHeaders = (existed?: IHeaders): IHeaders => {
  let headers: IHeaders;

  if (existed) {
    // just upd authorization if it needs
    headers = existed;
    if (headers.Authorization && /(Bearer)/.test(headers.Authorization)) {
      headers = {
        ...headers,
        ...headerWithToken(),
      };
    }
  } else {
    // create as default
    headers = {
      'Content-Type': 'application/json',
      ...headerWithToken(),
    };
  }
  return headers;
};

const prepareRequestData = (payload: IPayload): IRequestData | any => {
  const { headers, method = 'GET', data = {} } = payload;
  const params = {
    data,
    method,
    headers: getHeaders(headers),
  };
  // if (method === 'GET') {
  //   delete params.body;
  // }
  return params;
};

let isRefreshing = false;
let pendingPromises: any[] = [];
const continueStream = () => {
  return new Promise((resolve) => {
    pendingPromises.forEach((promise) => {
      promise();
    });
    pendingPromises = [];
    resolve(null);
  });
};

const signOut = () => {
  store.dispatch(signOutAction(null));
  ShowToastError({
    title: MESSAGE.SESSION_EXPIRED,
  });
};

const debouncedSignOut = debounce(signOut, 200);

const updateToken = async (partUrl: string, payload: IPayload | any) => {
  if (isRefreshing) {
    const promise = new Promise((resolve) => pendingPromises.push(resolve));
    return promise;
  }

  // REFRESH TOKEN PROCESS
  if (session.isExpired() && (!isRefreshing || /token/.test(partUrl))) {
    // don't use as an action because we should await for refreshed token
    // before send rest requests
    if (!/token/.test(partUrl)) {
      isRefreshing = true;
      try {
        store.dispatch(
          refreshTokenSaga({ payload: session.getRefreshToken() } as any),
        );
      } catch (err) {
        // debouncedSignOut();
      }
    } else {
      const { status, data } = await axios(
        `${AppConfig.API_URL}${partUrl}`,
        prepareRequestData(payload),
      );
      isRefreshing = false;
      // tslint:disable-next-line: no-floating-promises
      continueStream();
      return status >= StatusCode.OK && status < StatusCode.MULTIPLY_CHOICE
        ? data
        : {};
    }
  }
};

export async function httpApi(payload: IPayload | any) {
  const {
    partUrl,
    baseURL = AppConfig.API_URL,
    headers = {},
    isHeadersDateShow = false,
  } = payload;
  try {
    // REFRESH TOKEN PROCESS
    // await updateToken(partUrl, payload);

    // REQUEST
    const { status, data, headers }: any = await axios(
      `${AppConfig.API_URL}${partUrl}`,
      prepareRequestData(payload),
    );

    return status >= StatusCode.OK && status < StatusCode.MULTIPLY_CHOICE
      ? isHeadersDateShow && headers
        ? { ...data, date: headers.date } || {}
        : data || {}
      : {};
  } catch ({ response = {} }) {
    const { status = StatusCode.OFFLINE, data = {} } = response;
    const err: HttpError = {
      status,
      error: true,
      description: data.message || MESSAGE.ERROR_DEFAULT,
    };

    if (status === StatusCode.OFFLINE && !window.navigator.onLine) {
      err.description = MESSAGE.NO_NETWORK;
      ShowToastError({ title: MESSAGE.NO_NETWORK });
    }

    if (status === StatusCode.TOKEN_EXPIRED || status === StatusCode.UNAUTHORIZED || status === StatusCode.INTERNAL_ERROR) {
      debouncedSignOut();
    }

    console.error('API ERROR ==>', { err, response });
    return err;
  }
}

// Encode data to x-www-form-urlencoded type
export const encodeDataToUrl = (
  params: { [key: string]: any },
  isSkipNull: boolean = true,
) =>
  Object.keys(params)
    .filter((key) => !isSkipNull || (isSkipNull && params[key]))
    .map((key) => {
      if (isArray(params[key])) {
        const out = params[key].map(
          (p: number) => `${encodeURIComponent(key)}[]=${p}`,
        );
        return out.join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join('&');
