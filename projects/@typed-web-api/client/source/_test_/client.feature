Feature: Get typed fetch

   The getTypedFetch method returns a wrapper function that calls window.fetch
   with the corresponding parameters

   Scenario: Simple fetch request
      Given an instance of typedFetch
      And an endpoint "/sample/url_get"
      And a RequestInit object "X"
      When calling typedFetch with the described parameters
      Then window.fetch is called
      And gets url "/sample/url" as first parameter
      And gets RequestInit object "X" as second parameter

   Scenario: Fetch request with query string parameters
      Given an instance of typedFetch
      And an endpoint "/sample/url_get"
      And a query string parameter "name" with value "John"
      And a query string parameter "age" with value "45"
      When calling typedFetch with the described parameters
      Then window.fetch is called
      And gets url "/sample/url?name=John&age=45" as first parameter

   Scenario: Fetch request with query string parameters including special characters
      Given an instance of typedFetch
      And an endpoint "/sample/url_get"
      And a query string parameter "special" with value "$#?"
      When calling typedFetch with the described parameters
      Then window.fetch is called
      And gets url "/sample/url?special=%24%23%3F" as first parameter

   Scenario: Fetch request with URL parameters
      Given an instance of typedFetch
      And an endpoint "/sample/:id_get"
      And a url parameter "id" with value "856c96ae-60ee-4b9d-8565-41682bbf87af"
      When calling typedFetch with the described parameters
      Then window.fetch is called
      And gets url "/sample/856c96ae-60ee-4b9d-8565-41682bbf87af" as first parameter

   Scenario: Fetch request with URL parameters and query string parameters
      Given an instance of typedFetch
      And an endpoint "/sample/:id_get"
      And a url parameter "id" with value "856c96ae-60ee-4b9d-8565-41682bbf87af"
      And a query string parameter "name" with value "John"
      When calling typedFetch with the described parameters
      Then window.fetch is called
      And gets url "/sample/856c96ae-60ee-4b9d-8565-41682bbf87af?name=John" as first parameter

   Scenario: Fetch request with body
      Given an instance of typedFetch
      And an endpoint "/sample/url_post"
      And a body object containing a "city" property with value "Madrid"
      When calling typedFetch with the described parameters
      Then window.fetch is called
      And gets '{"city":"Madrid"}' as the body property of the second parameter

   Scenario: Fetch request with baseUrl
      Given an instance of typedFetch with "/api/v1" baseUrl
      And an endpoint "/sample/url_get"
      When calling typedFetch with the described parameters
      Then window.fetch is called
      And gets url "/api/v1/sample/url" as first parameter
