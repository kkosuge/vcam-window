import React, { useEffect, useState } from 'react'
import { Video } from './Video'
import { useMenu } from '../hooks/useMenu'
import styled from 'styled-components'
import { Button, Select } from '@zeit-ui/react'

const Preference = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.8;
  padding: 20px;
  background: #fff;
  h1 {
    font-size: 24px;
  }
  .group {
    margin-top: 20px;
    label {
      display: block;
      font-weight: bold;
    }
  }
`

export const Root: React.FC = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [device, setDevice] = useState<MediaDeviceInfo | null>(null)
  const [showVideo, setShowVideo] = useState(true)
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

  const reloadVideo = () => {
    setShowVideo(false)
    setTimeout(() => setShowVideo(true), 100)
  }

  const onChangeDeviceSelection = (deviceId: string) => {
    const selectedDevice = devices.find((d) => d.deviceId === deviceId)
    setDevice(selectedDevice)
    reloadVideo()
  }

  const preferences = (
    <Preference>
      <h1>Preference</h1>
      <div className="group">
        <label>Camera</label>
        <Select
          placeholder="Choose one"
          onChange={onChangeDeviceSelection}
          disableMatchWidth
        >
          {devices.map((d) => {
            return (
              <Select.Option value={d.deviceId} key={d.deviceId}>
                {d.label}
              </Select.Option>
            )
          })}
        </Select>
      </div>
      <div className="group">
        <Button type="secondary" onClick={closePreferences}>
          Close
        </Button>
      </div>
    </Preference>
  )

  if (device) {
    const constraints: MediaStreamConstraints = {
      video: {
        deviceId: device.deviceId,
      },
    }
    return (
      <>
        { showVideo && <Video constraints={constraints} /> }
        { screen === 'preferences' && preferences }
      </>
    )
  }

  return <div>empty</div>
}
