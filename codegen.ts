import * as dotenv from 'dotenv'
import type { CodegenConfig } from '@graphql-codegen/cli'

if (!import.meta.env.CONTEXT) {
  dotenv.config({ path: '.env.development' })
} else {
  dotenv.config({
    path: import.meta.env.CONTEXT === 'deploy-preview' ? '.env.preview' : '.env.production',
  })
}

const spaceId = import.meta.env.VITE_APP_CONTENTFUL_SPACE_ID
const accessToken = import.meta.env.VITE_APP_CONTENTFUL_ACCESS_TOKEN

const config: CodegenConfig = {
  schema: `https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${accessToken}`,
  documents: 'src/**/*.graphql',
  ignoreNoDocuments: true,
  generates: {
    'src/gql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
  },
}

export default config
