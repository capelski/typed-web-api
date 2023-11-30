Feature: Use server endpoints method

   Attempts to expose the provided endpoint handlers and returns a list of
   each operation status.

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
      Then the returned endpoint list contains a successful endpoint "/path/1_get"
      And the returned endpoint list contains a failed endpoint "/path/1_invalid"

   Scenario: Throws an error when failOnInvalidNames is set to true, if there is some invalid name
      Given an express app
      And an endpoint "/path/1_invalid"
      And an endpoint "/path/2_invalid"
      When calling useServerEndpoints with failOnInvalidNames set to "true"
      Then an error is thrown
      And the error contains "/path/1_invalid"
      And the error contains "/path/2_invalid"

   Scenario: Does NOT throw an error when failOnInvalidNames is set to true, if all names are valid
      Given an express app
      And an endpoint "/path/1_delete"
      When calling useServerEndpoints with failOnInvalidNames set to "true"
      Then the returned endpoint list contains a successful endpoint "/path/1_delete"
