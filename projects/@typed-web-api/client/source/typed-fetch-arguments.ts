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
  TEndpointName extends keyof TApi,
> = TApi[TEndpointName]['payload'] extends JsonBody_UrlParams_QueryString<
  infer TJsonBody,
  infer TUrlParams,
  infer TQueryString
>
  ? [
      path: TEndpointName,
      options: {
        jsonBody: TJsonBody;
        init?: NoMethodRequestInit;
        queryString: TQueryString;
        urlParams: TUrlParams;
        urlPrefix?: string;
      },
    ]
  : TApi[TEndpointName]['payload'] extends JsonBody_UrlParams<infer TJsonBody, infer TUrlParams>
    ? [
        path: TEndpointName,
        options: {
          jsonBody: TJsonBody;
          init?: NoMethodRequestInit;
          urlParams: TUrlParams;
          urlPrefix?: string;
        },
      ]
    : TApi[TEndpointName]['payload'] extends JsonBody_QueryString<
          infer TJsonBody,
          infer TQueryString
        >
      ? [
          path: TEndpointName,
          options: {
            jsonBody: TJsonBody;
            init?: NoMethodRequestInit;
            queryString: TQueryString;
            urlPrefix?: string;
          },
        ]
      : TApi[TEndpointName]['payload'] extends UrlParams_QueryString<
            infer TUrlParams,
            infer TQueryString
          >
        ? [
            path: TEndpointName,
            options: {
              init?: NoMethodRequestInit;
              urlParams: TUrlParams;
              queryString: TQueryString;
              urlPrefix?: string;
            },
          ]
        : TApi[TEndpointName]['payload'] extends JsonBody<infer TJsonBody>
          ? [
              path: TEndpointName,
              options: {
                jsonBody: TJsonBody;
                init?: NoMethodRequestInit;
                urlPrefix?: string;
              },
            ]
          : TApi[TEndpointName]['payload'] extends UrlParams<infer TUrlParams>
            ? [
                path: TEndpointName,
                options: {
                  init?: NoMethodRequestInit;
                  urlParams: TUrlParams;
                  urlPrefix?: string;
                },
              ]
            : TApi[TEndpointName]['payload'] extends QueryString<infer TQueryString>
              ? [
                  path: TEndpointName,
                  options: {
                    init?: NoMethodRequestInit;
                    queryString: TQueryString;
                    urlPrefix?: string;
                  },
                ]
              : [
                  path: TEndpointName,
                  options?: {
                    init?: NoMethodRequestInit;
                    urlPrefix?: string;
                  },
                ];
