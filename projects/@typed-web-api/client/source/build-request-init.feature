Feature: Build request init

   Creates a request init object including the provided method and, when appropriate,
   the stringified JSON body parameter.

   Scenario: Includes the method in the request init
      Given a method "get"
      When calling buildRequestInit
      Then the returned object contains a "method" property with value "get"

   Scenario: Maintains properties passed via the init parameter
      Given any method
      And an init parameter property "mode" with value "cors"
      When calling buildRequestInit
      Then the returned object contains a "mode" property with value "cors"

   Scenario: Overrides the method passed via the init parameter
      Given a method "get"
      And an init parameter property "method" with value "post"
      When calling buildRequestInit
      Then the returned object contains a "method" property with value "get"

   Scenario: Stringifies the jsonBody and includes it in the request init
      Given any method
      And a jsonBody '{ "test": 3 }'
      When calling buildRequestInit
      Then the returned object contains a "body" property with value '{"test":3}'
      And the returned object contains a "Content-Type" header with value "application/json"

   Scenario: Overrides the body passed via the init parameter when jsonBody present
      Given any method
      And an init parameter property "body" with value "initBody"
      And an init parameter header "Content-Type" with value "text/html"
      And a jsonBody ' "X" '
      When calling buildRequestInit
      Then the returned object contains a "body" property with value '"X"'
      And the returned object contains a "Content-Type" header with value "application/json"

   Scenario: Does NOT override the body passed via the init parameter when NO jsonBody present
      Given any method
      And an init parameter property "body" with value "initBody"
      And an init parameter header "Content-Type" with value "text/html"
      When calling buildRequestInit
      Then the returned object contains a "body" property with value "initBody"
      And the returned object contains a "Content-Type" header with value "text/html"
