const hubspot = require('@hubspot/api-client');
const fs = require('fs');
const csv = require('csv-parser');

const token = "YOUR_ACCESS_TOKEN"
const objectType = "contacts";

const hubspotClient = new hubspot.Client({"accessToken": token});

const results = [];

fs.createReadStream('sample.csv')
  .pipe(csv())
  .on('data', (data) => {
    const options = [];
    if (data.options) {
      data.options.split('|').forEach((option) => {
        const [label, description, value, displayOrder, hidden] = option.split(':');
        options.push({
          label,
          description,
          value,
          displayOrder: parseInt(displayOrder),
          hidden: hidden === 'true',
        });
      });
    }

    const obj = {
      label: data.label,
      type: data.type,
      fieldType: data.fieldType,
      groupName: data.groupName,
      hidden: (data.hidden && (data.hidden === 'true' || data.hidden.toUpperCase() === 'TRUE')) || false,
      hasUniqueValue: (data.hasUniqueValue && (data.hasUniqueValue === 'true' || data.hasUniqueValue.toUpperCase() === 'TRUE')) || false,
      formField: (data.formField && (data.formField === 'true' || data.formField.toUpperCase() === 'TRUE')) || false,
      name: data.name,
      description: data.description,
    };

    if (options.length > 0) {
      obj.options = options;
    }

    if (data.externalOptions) {
      obj.externalOptions = (data.externalOptions === 'true' || data.externalOptions.toUpperCase() === 'TRUE') || false;
    }

    if (data.referencedObjectType) {
      obj.referencedObjectType = data.referencedObjectType;
    }

    if (data.calculationFormula) {
      obj.calculationFormula = data.calculationFormula;
    }

    if (data.displayOrder) {
      obj.displayOrder = parseInt(data.displayOrder);
    }

    results.push(obj);
  })
  .on('end', () => {
    console.log(results);
    const inputs = results
    const BatchInputPropertyCreate = { inputs: inputs };
    

    try {
      const apiResponse = hubspotClient.crm.properties.batchApi.create(objectType, BatchInputPropertyCreate);
      console.log(JSON.stringify(apiResponse, null, 2));
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
  });