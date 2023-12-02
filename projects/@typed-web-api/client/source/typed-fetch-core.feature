Feature: Typed fetch core

   Returns a function that, when called, builds a url and request init based
   on its parameters and passes them to the provided fetch handler

   Scenario: Calls fetchDependency with the corresponding path and method
      Given an instance of typedFetch with a fetchDependency handler
      And an endpoint "/path_get"
      When calling typedFetch
      Then the fetchDependency handler is called with path "/path" and method "get"

   Scenario: Uses the optional parameters to build the corresponding request init
      Given an instance of typedFetch with a fetchDependency handler
      And an endpoint "/path_get"
      And an options object
      When calling typedFetch
      Then the buildRequestInit method is called with method "get" and all options

   Scenario: Uses the optional parameters to build the corresponding url
      Given an instance of typedFetch with a fetchDependency handler and a base url "/base"
      And an endpoint "/path_get"
      And an options object
      When calling typedFetch
      Then the buildUrl method is called with path "/path", all options and base url "/base"
