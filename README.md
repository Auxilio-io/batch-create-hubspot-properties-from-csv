# batch-create-hubspot-properties-from-csv
Create porperties in HubSpot CRM in bulk from a .csv file


1 - Install HubSpot API Client: https://www.npmjs.com/package/@hubspot/api-client

npm i @hubspot/api-client

2 - Install csv-parser: https://www.npmjs.com/package/csv-parser

npm i csv-parser

3 - Create a private app token if you don't already have one: https://developers.hubspot.com/docs/api/private-apps#create-a-private-app

4 - Make sure your private app has the proper scopes:

This depends on which object you want to create properties for:

For instance:

companies = crm.schemas.companies write
deals = crm.schemas.deals write
contacts = crm.schemas.contacts write
tickets = tickets
custom object = crm.schemas.custom write

5 - Create your csv from sample.csv: following the same format is mandatory or the script won't work

6 - Run script with

node index 

Notes: 

- Refer to HubSpot Properties API Documentation if you have any format issue: https://developers.hubspot.com/docs/api/crm/properties

- If you want to create a calculation property that includes one of the property you want to create in your batch request you will need to do it in a separate request afterward.
