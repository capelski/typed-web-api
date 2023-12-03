Feature: Split endpoint name

   Splits the path and method of a given endpoint name

   Scenario: Endpoint name with one underscore
      Given the endpoint name "path_method"
      When calling splitEndpointName
      Then the returned path is "path"
      And the returned method is "method"

   Scenario: Endpoint name with no underscore
      Given the endpoint name "no-underscores"
      When calling splitEndpointName
      Then the returned path is ""
      And the returned method is "no-underscores"

   Scenario: Endpoint name with multiple underscores
      Given the endpoint name "more_than_one_underscore"
      When calling splitEndpointName
      Then the returned path is "more_than_one"
      And the returned method is "underscore"
