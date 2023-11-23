export class EndpointResponse<T> {
  constructor(
    public payload: T,
    public status?: number,
  ) {}
}
