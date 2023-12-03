Feature: Use server endpoints

   Attempts to expose the provided endpoint handlers and returns a list of endpoints
   exposed successfully and a list of endpoints which failed to be exposed due to
   invalid endpoint name

   Scenario: Exposes endpoints with valid names
      Given an express app
      And an endpoint "/path/1_get"
      When calling useServerEndpoints
      Then the endpoint "/path/1_get" is exposed with path "/path/1" and method "get"

   Scenario: Ignores endpoints with invalid names
      Given an express app
      And an endpoint "/path/1_invalid"
      When calling useServerEndpoints
      Then the endpoint "/path/1_invalid" is NOT exposed

   Scenario: Returns a list with each endpoint status
      Given an express app
      And an endpoint "/path/1_get"
      And an endpoint "/path/1_invalid"
      When calling useServerEndpoints
      Then the returned successful endpoints list contains the endpoint "/path/1_get"
      And the returned failed endpoints list contains the endpoint "/path/1_invalid"

