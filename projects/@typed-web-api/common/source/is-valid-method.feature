Feature: Is valid method

   Returns true when the method is a valid Http method

   Scenario: Accepts delete
      Given an endpoint method "delete"
      Then calling isValidEndpoint returns "true"

   Scenario: Accepts get
      Given an endpoint method "get"
      Then calling isValidEndpoint returns "true"
   
   Scenario: Accepts patch
      Given an endpoint method "patch"
      Then calling isValidEndpoint returns "true"

   Scenario: Accepts post
      Given an endpoint method "post"
      Then calling isValidEndpoint returns "true"

   Scenario: Accepts put
      Given an endpoint method "put"
      Then calling isValidEndpoint returns "true"

   Scenario: Does not accept other values
      Given an endpoint method "invalid"
      Then calling isValidEndpoint returns "false"
