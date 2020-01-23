#!/usr/bin/env python3

# Created by: Matsuru Hoshi
# Created on: Jan 2020
# This is program get user info

import json
import boto3
import decimal

def replace_decimals(obj):
        # Helper class to Decimals in an arbitrary object
        #   from: https://github.com/boto/boto3/issues/369

    if isinstance(obj, list):
        for i in range(len(obj)):
            obj[i] = replace_decimals(obj[i])
        return obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            obj[k] = replace_decimals(v)
        return obj
    elif isinstance(obj, set):
        return set(replace_decimals(i) for i in obj)
    elif isinstance(obj, decimal.Decimal):
        if obj % 1 == 0:
            return int(obj)
        else:
            return float(obj)
    else:
        return obj

def lambda_handler(event, context):
    # functino returns row from table
    
    dynamodb = boto3.resource('dynamodb')
    table =  dynamodb.Table('test_table')
    
    try:
        response = table.get_item(
            Key = {
                'email':event['email_address']
            }
        )
    
        try:
            result = response["Item"]
            number = result['chocolate_number']
            number = replace_decimals(number)
        except:
            number = {}
        
        print(number)
        
        #This stuff was just me trying stuff out
        #for x in result:
            #print(result['chocolate_number'])
            #if (x == chocolate_number):
            
        print(event)
        return {
            'statusCode': 200,
            'body': json.dumps(number)
        }
    
    except:
        return {
            'statusCode': 204,
            'body': json.dumps({})
        }