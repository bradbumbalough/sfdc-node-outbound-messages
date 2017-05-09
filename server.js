import express from 'express';
import xmlparser from 'express-xml-bodyparser';
const app = express();

app.post('/salesforce', xmlparser(), (req, res) => {
  console.log('Incoming message!');
  let xml = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soapenv:Body>
    <notifications xmlns="http://soap.sforce.com/2005/09/outbound">
        <Ack>true</Ack>
    </notifications>
  </soapenv:Body>
</soapenv:Envelope>`;
  console.log(req.body);
  res.set("Content-Type", "text/xml").send(xml);
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});

/* SAMPLE BODY

{
  "soapenv:envelope": {
    "soapenv:body": [
      {
        "notifications": [
          {
            "organizationid": "",
            "actionid": "",
            "sessionid": "",
            "enterpriseurl": "",
            "notification": [
              {
                "id": "04lP0000007UkLBIA1",
                "sobject": [
                  {
                    "sf:id": ["006P0000006uyYUIBY"],
                    "sf:accountid": ["001P000000zcWKQIA2"]
                  }
                ]
              }
              // there could be multiple records
            ]
            // end notification
          }
          // end notifications
        ]
      }
    ]
    // end soapenv:body
  }
}

*/