export {}

declare module 'vue' {
  type DataAttributeValue = string | number | boolean | undefined
  type AriaAttributeValue = string | number | boolean | undefined
  type AriaAttributeProps = {
    [key in `aria-${string}`]?: AriaAttributeValue
  }
  type DataAttributeProps = {
    [key in `data-${string}`]?: DataAttributeValue
  }

  interface HTMLAttributes {
    [key: `data-${string}`]: DataAttributeValue
  }

  interface ComponentCustomProps extends AriaAttributeProps, DataAttributeProps {
    onClick?: (...args: any[]) => any
  }
}
