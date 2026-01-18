import { defineComponent, h, type CSSProperties, type PropType } from 'vue'
import type { FormContext } from 'vee-validate'
import { css, cx } from '~/styled-system/css'

const formClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export default defineComponent({
  name: 'DesignSystemFormWithHook',
  inheritAttrs: false,
  props: {
    form: {
      type: Object as () => FormContext<Record<string, unknown>>,
      required: true,
    },
    style: {
      type: [Object, String] as PropType<CSSProperties | string | undefined>,
      default: undefined,
    },
    onSubmit: {
      type: Function as PropType<((values: Record<string, unknown>) => void) | undefined>,
      default: undefined,
    },
  },
  emits: ['submit'],
  setup(formProps, { slots, emit, attrs }) {
    const handle = formProps.form.handleSubmit((values) => {
      formProps.onSubmit?.(values)
      emit('submit', values)
    })

    return () =>
      h(
        'form',
        {
          ...attrs,
          class: cx(formClass, attrs.class as string | undefined),
          style: formProps.style,
          novalidate: true,
          onSubmit: (event: Event) => {
            event.preventDefault()
            handle()
          },
        },
        slots.default?.({ form: formProps.form }),
      )
  },
})
