import Centrifuge from 'centrifuge';
import { AppConfig } from 'config';
import { session } from 'helpers';

// export const centrifuge = new Centrifuge(
//   `${AppConfig.CENTRIFUGE_URL}/connection/websocket`,
// );

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

let checkheaderWithToken = headerWithToken();
export const centrifuge = new Centrifuge(`${AppConfig.CENTRIFUGE_URL}/connection/websocket`, {
  debug: true,
  onRefresh: function (ctx, cb) {
    let promise = fetch("https://staging-api.tcgshowdown.com/auth/messenger", {
      method: "GET",
    }).then(function (resp) {
      resp.json().then(function (data) {
        cb(data);
      });
    });
  },
  refreshHeaders: {
    ...headerWithToken(),
  }
});



