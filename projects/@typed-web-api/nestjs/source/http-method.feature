Feature: Http method decorator

   Method decorator that calls the corresponding NestJS http decorator
   based on the decorated method name.

   Scenario: Decorated methods with valid names
      Given the class defined in "./samples/rest-controller.ts"
      Then the "Delete" NestJS decorator is called with "/path/1"
      And the "Get" NestJS decorator is called with "/path/2"
      And the "Patch" NestJS decorator is called with "/path/3"
      And the "Post" NestJS decorator is called with "/path/4"
      And the "Put" NestJS decorator is called with "/path/5"

   Scenario: Decorated method with invalid name
      Given the class defined in "./samples/invalid-controller.ts"
      Then an error is thrown containing "/path_invalidMethod" in the message
