export const handler = async (event: any) => {
  // if (event.httpMethod === 'OPTIONS') {
  //   return {
  //     statusCode: 200,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  //       'Access-Control-Allow-Methods': 'POST, OPTIONS',
  //     },
  //     body: '',
  //   }
  // }

  try {
    const { query, variables } = JSON.parse(event.body)
    const SPACE_ID = process.env.VITE_APP_CONTENTFUL_SPACE_ID
    const ACCESS_TOKEN = process.env.VITE_APP_CONTENTFUL_ACCESS_TOKEN

    console.log('Space ID:', SPACE_ID)
    console.log('Access Token:', ACCESS_TOKEN)

    const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    })

    const data = await response.json()
    return {
      statusCode: 200,
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': 'Content-Type',
      //   'Access-Control-Allow-Methods': 'POST, OPTIONS',
      // },
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },
      body: JSON.stringify({ error: error.message }),
    }
  }
}
