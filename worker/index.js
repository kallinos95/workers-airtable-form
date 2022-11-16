addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const createAirtableRecord = body => {
  return fetch(`https://api.airtable.com/v0/appikq78I3OJp58vD/Form`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      // Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      Authorization: `Bearer keyUmC8z2Hu5LeuBg`,
      'Content-type': `application/json`
    }
  })
}

const submitHandler = async request => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405
    })
  }

  const body = await request.formData();

  const {
    first_name,
    last_name,
    email,
    phone,
    subject,
    message
  } = Object.fromEntries(body)

  const reqBody = {
    fields: {
      "First Name": first_name,
      "Last Name": last_name,
      "Email": email,
      "Phone Number": phone,
      "Subject": subject,
      "Message": message
    }
  }

  await createAirtableRecord(reqBody)
  return Response.redirect(FORM_URL)
}

async function handleRequest(request) {
  const url = new URL(request.url)

  if (url.pathname === "/submit") {
    return submitHandler(request)
  }

  return new Response.redirect(FORM_URL)
}
