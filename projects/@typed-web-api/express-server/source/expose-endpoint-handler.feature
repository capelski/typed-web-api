Feature: Expose endpoint handler

   Creates a request handler wrapper that calls the endpoint handler with its arguments,
   and passes it to the corresponding express router methods. The wrapper uses the object
   returned by the endpoint handler to set the express response accordingly

   Scenario: The corresponding express router method is called
      Given an express app
      When calling exposeEndpointHandler with method "get" and path "/path"
      Then the "get" method of the express app is called with path "/path"

   Scenario: On HTTP request, the endpoint handler is called with the wrapper arguments
      Given an express app
      And a handler
      When an HTTP request arrives after having called exposeEndpointHandler
      Then the handler is called with the express request, response and next parameters

   Scenario: On HTTP request, the endpoint handler payload is sent in the express response
      Given an express app
      And a handler that returns a payload "X"
      When an HTTP request arrives after having called exposeEndpointHandler
      Then the send method of the express response is called with "X"
      And the status method of the express response is NOT called

   Scenario: On HTTP request, the endpoint handler status is set in the express response
      Given an express app
      And a handler that returns a status "400"
      When an HTTP request arrives after having called exposeEndpointHandler
      And the status method of the express response is called with "400"
      
