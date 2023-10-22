Feature: Testing TFG flow API

    Scenario: Unautorized access
        Given url 'http://localhost:7071//institute/'
        When method Get
        Then status 401