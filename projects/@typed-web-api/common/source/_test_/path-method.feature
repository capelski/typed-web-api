Feature: Split path and method

   Extracts the path and the method of a given string matching the format 
   "/path_method". It throws an exception otherwise.

   Scenario: Valid string
      Given the string "/api/users/:id_get"
      When calling splitPathMethod
      Then the returned path is "/api/users/:id"
      And the returned method is "get"

   Scenario: Invalid string
      Given the string "hello world"
      When calling splitPathMethod
      Then an error is raised containing "hello world" in the message

   Scenario: Invalid method in string
      Given the string "/api/users/:id_got"
      When calling splitPathMethod
      Then an error is raised containing "/api/users/:id_got" in the message
