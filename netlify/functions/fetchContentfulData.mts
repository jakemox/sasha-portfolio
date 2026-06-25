/// <reference types="node" />

export const handler = async (event: any) => {
  try {
    const { query, variables } = JSON.parse(event.body)
    const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
    const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN

    const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Contentful responded with ${response.status}: ${response.statusText}`,
        }),
      }
    }

    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    }
  }
}
