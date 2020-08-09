import { remote } from 'electron'
import { useEffect, useState } from 'react'
import useEventListener from '@use-it/event-listener'

const { app, Menu, MenuItem } = remote

type Screen = 'video' | 'preferences'

type Output = {
  screen: Screen;
  closePreferences: () => void;
}

export function useMenu(): Output {
  const [screen, setScreen] = useState<Screen>('video')
  const preferencesId = 'preferences'

  const onClickPreferences = () => setScreen('preferences')

  const closePreferences = () => setScreen('video')

  useEffect(() => {
    const appMenu = Menu.getApplicationMenu()

    const currentMenuItem = appMenu.getMenuItemById(preferencesId)
    const menuItem = new MenuItem({ label: app.name, submenu: [
      {
        id: preferencesId,
        label: 'Preference',
        click: onClickPreferences
      }
    ]})

    if (!currentMenuItem) {
      appMenu.append(menuItem)
    }

    Menu.setApplicationMenu(appMenu)
  }, [])

  useEventListener('contextmenu', (e) => {
    e.preventDefault()
    const menu = new Menu()
    menu.append(
      new MenuItem({
        label: 'Preferences',
        click: onClickPreferences
      })
    )
    menu.popup({ window: remote.getCurrentWindow() })
  })

  return {
    screen,
    closePreferences
  }
}
