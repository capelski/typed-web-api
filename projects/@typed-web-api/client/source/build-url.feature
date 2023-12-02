Feature: Build URL

   Builds a complete URL by combining the path with the different optional parameters

   Scenario: Returns the path when no optional parameters provided
      Given a path "/path"
      When calling buildUrl
      Then the returned url is "/path"

   Scenario: Prepends the text provided via baseUrl to the url
      Given a path "/path"
      And a baseUrl "/baseUrl"
      When calling buildUrl
      Then the returned url is "/baseUrl/path"

   Scenario: Prepends the text provided via urlPrefix to the url
      Given a path "/path"
      And a urlPrefix "/prefix"
      When calling buildUrl
      Then the returned url is "/prefix/path"

   Scenario: Prepends the text provided via baseUrl and urlPrefix to the url
      Given a path "/path"
      And a urlPrefix "/prefix"
      And a baseUrl "/baseUrl"
      When calling buildUrl
      Then the returned url is "/baseUrl/prefix/path"

   Scenario: Replaces URL parameters with the provided values
      Given a path "/path/:id"
      And a "id" URL parameter with value "asdf"
      When calling buildUrl
      Then the returned url is "/path/asdf"

   Scenario: Appends query string parameters at the end of the url
      Given a path "/path"
      And a "id" query string parameter with value "asdf"
      And a "details" query string parameter with value "true"
      When calling buildUrl
      Then the returned url is "/path?id=asdf&details=true"

   Scenario: Encodes special characters in the query string parameters
      Given a path "/path"
      And a "special" query string parameter with value "$#?"
      When calling buildUrl
      Then the returned url is "/path?special=%24%23%3F"

   Scenario: Replaces URL parameters and appends query string parameters at the end of the url
      Given a path "/path/:id"
      And a "id" URL parameter with value "asdf"
      And a "details" query string parameter with value "true"
      When calling buildUrl
      Then the returned url is "/path/asdf?details=true"
