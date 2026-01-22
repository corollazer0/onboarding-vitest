import BaseModal from '@/components/base/BaseModal.vue'
import { createWrapper } from '../../../helpers/createWrapper'

describe('BaseModal', () => {
  it('renders slot content when open', () => {
    const wrapper = createWrapper(BaseModal, {
      props: { isOpen: true },
      slots: { default: 'Modal content' }
    })

    expect(wrapper.text()).toContain('Modal content')
  })

  it('does not render content when closed', () => {
    const wrapper = createWrapper(BaseModal, {
      props: { isOpen: false },
      slots: { default: 'Modal content' }
    })

    expect(wrapper.text()).not.toContain('Modal content')
  })

  it('emits close when backdrop is clicked', async () => {
    const wrapper = createWrapper(BaseModal, {
      props: { isOpen: true }
    })

    await wrapper.find('.modal__backdrop').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
