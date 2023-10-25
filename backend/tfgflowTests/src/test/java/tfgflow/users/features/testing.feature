Feature: Testing TFG flow API

    Backgroung: Url 
        Given url 'http://localhost:7071/institute/'

    Scenario: Unautorized access
        When method Get
        Then status 401

        