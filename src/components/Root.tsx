import React, { useEffect, useState } from 'react'
import { Video } from './Video'
import { useMenu } from '../hooks/useMenu'

export const Root: React.FC = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [device, setDevice] = useState<MediaDeviceInfo | null>(null)
  const { screen, closePreferences } = useMenu()

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((d) => d.kind === 'videoinput')
      setDevices(videoDevices)
      const mmhmm = videoDevices.find((d) => d.label.match(/mmhmm/))
      if (mmhmm) {
        setDevice(mmhmm)
      }
    })
  }, [])

  if (screen === 'preferences') {
    return <><button onClick={closePreferences}>close</button></>
  }

  if (device) {
    const constraints: MediaStreamConstraints = {
      video: {
        deviceId: device.deviceId
      }
    }
    return <Video constraints={constraints} />
  }

  return <div>empty</div>
}
