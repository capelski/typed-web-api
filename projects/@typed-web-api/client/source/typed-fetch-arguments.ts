import {
  ApiDefinition,
  JsonBody,
  JsonBody_QueryString,
  JsonBody_UrlParams,
  JsonBody_UrlParams_QueryString,
  QueryString,
  QueryStringBase,
  UrlParams,
  UrlParams_QueryString,
  UrlParamsBase,
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
        /** When using jsonBody the payload will be stringified via JSON.stringify and a
         * 'Content-Type': 'application/json' header will be added to the request */
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
          /** When using jsonBody the payload will be stringified via JSON.stringify and a
           * 'Content-Type': 'application/json' header will be added to the request */
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
            /** When using jsonBody the payload will be stringified via JSON.stringify and a
             * 'Content-Type': 'application/json' header will be added to the request */
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
                /** When using jsonBody the payload will be stringified via JSON.stringify and a
                 * 'Content-Type': 'application/json' header will be added to the request */
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
                    queryString?: QueryStringBase;
                    urlParams?: UrlParamsBase;
                    urlPrefix?: string;
                  },
                ];
