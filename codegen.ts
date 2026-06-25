import * as dotenv from 'dotenv'
import type { CodegenConfig } from '@graphql-codegen/cli'

if (!process.env.CONTEXT) {
  dotenv.config({ path: '.env.development' })
} else {
  dotenv.config({
    path: process.env.CONTEXT === 'deploy-preview' ? '.env.preview' : '.env.production',
  })
}

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const config: CodegenConfig = {
  schema: `https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${accessToken}`,
  documents: 'src/**/*.graphql',
  ignoreNoDocuments: true,
  generates: {
    'src/gql/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
      },
    },
  },
}

export default config
