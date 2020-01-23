#!/usr/bin/env python3

# Created by: Matsuru Hoshi
# Created on: Jan 2020
# This function adds a number to test_table row

import json
import boto3


def lambda_handler(event, context):
    # function returns a row from our chocolate_user DynmamoDB

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('test_table')
    
    new_number = 2
    try:
        response = table.update_item(
            Key = {
                'email': event["email_address"]
            },
            ExpressionAttributeValues = {
                'chocolate_number': new_number
            }
        )

        try:
            result = response['ResponseMetadata']
        except:
            result = {}

        print(result)
        return_var = json.dumps(result)

        print(event)

        # Cognito is expecting the "event" object to be returned for success
        return event

    except:
       return "error"