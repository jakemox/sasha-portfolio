import type { FC, JSX, ReactNode } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Node } from '@contentful/rich-text-types'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import styled from '@emotion/styled'
import Link from './components/ctas/Link'
import Text from './components/styled/Text'
import { RichTextFragment } from './gql/generated/graphql'

const options: {
  renderNode: Record<string, (node: Node, children: ReactNode) => JSX.Element>
} = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => {
      return (
        <StyledText variant="body1" gutterBottom>
          {children}
        </StyledText>
      )
    },
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <Link href={data.uri} layout="inline">
        {children}
      </Link>
    ),
  },
}

const RichText: FC<RichTextFragment> = ({ text }) => {
  return <>{documentToReactComponents(text?.json, options)}</>
}

export default RichText

const StyledText = styled(Text)`
  &:last-child {
    margin-bottom: 0;
  }
`
