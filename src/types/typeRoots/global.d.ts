declare module '*.svg?react' {
  import { FC, SVGProps } from 'react'
  const ReactComponent: FC<SVGProps<SVGSVGElement>>
  export default ReactComponent
}
declare module '*.css'
declare module '@fontsource/*' {}
declare module '@fontsource-variable/*' {}
