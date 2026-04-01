import type { Router } from 'vue-router'

export const headerTabs = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'stats', label: 'Stats' },
  { key: 'settings', label: 'Settings' }
]

export type HeaderTabKey = (typeof headerTabs)[number]['key']

export const createHeaderTabClickHandler = (router: Router) => {
  return (tabKey: HeaderTabKey) => {
    if (tabKey === 'dashboard') {
      router.push('/home')
      return
    }

    if (tabKey === 'stats') {
      router.push('/stats')
      return
    }

    if (tabKey === 'settings') {
      router.push({ name: 'settings' })
    }
  }
}