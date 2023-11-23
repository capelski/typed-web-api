import {
  ApiDefinition,
  JsonBody,
  JsonBody_QueryString,
  JsonBody_UrlParams,
  JsonBody_UrlParams_QueryString,
  QueryString,
  UrlParams,
  UrlParams_QueryString,
} from '@typed-web-api/common';

export type NoMethodRequestInit = Omit<RequestInit, 'method'>;

export type TypedFetchArguments<
  TApi extends ApiDefinition,
  TPath_Method extends keyof TApi,
> = TApi[TPath_Method]['payload'] extends JsonBody_UrlParams_QueryString<
  infer TJsonBody,
  infer TUrlParams,
  infer TQueryString
>
  ? [
      path: TPath_Method,
      options: {
        jsonBody: TJsonBody;
        init?: NoMethodRequestInit;
        queryString: TQueryString;
        urlParams: TUrlParams;
        urlPrefix?: string;
      },
    ]
  : TApi[TPath_Method]['payload'] extends JsonBody_UrlParams<infer TJsonBody, infer TUrlParams>
    ? [
        path: TPath_Method,
        options: {
          jsonBody: TJsonBody;
          init?: NoMethodRequestInit;
          urlParams: TUrlParams;
          urlPrefix?: string;
        },
      ]
    : TApi[TPath_Method]['payload'] extends JsonBody_QueryString<
          infer TJsonBody,
          infer TQueryString
        >
      ? [
          path: TPath_Method,
          options: {
            jsonBody: TJsonBody;
            init?: NoMethodRequestInit;
            queryString: TQueryString;
            urlPrefix?: string;
          },
        ]
      : TApi[TPath_Method]['payload'] extends UrlParams_QueryString<
            infer TUrlParams,
            infer TQueryString
          >
        ? [
            path: TPath_Method,
            options: {
              init?: NoMethodRequestInit;
              urlParams: TUrlParams;
              queryString: TQueryString;
              urlPrefix?: string;
            },
          ]
        : TApi[TPath_Method]['payload'] extends JsonBody<infer TJsonBody>
          ? [
              path: TPath_Method,
              options: {
                jsonBody: TJsonBody;
                init?: NoMethodRequestInit;
                urlPrefix?: string;
              },
            ]
          : TApi[TPath_Method]['payload'] extends UrlParams<infer TUrlParams>
            ? [
                path: TPath_Method,
                options: {
                  init?: NoMethodRequestInit;
                  urlParams: TUrlParams;
                  urlPrefix?: string;
                },
              ]
            : TApi[TPath_Method]['payload'] extends QueryString<infer TQueryString>
              ? [
                  path: TPath_Method,
                  options: {
                    init?: NoMethodRequestInit;
                    queryString: TQueryString;
                    urlPrefix?: string;
                  },
                ]
              : [
                  path: TPath_Method,
                  options?: {
                    init?: NoMethodRequestInit;
                    urlPrefix?: string;
                  },
                ];
