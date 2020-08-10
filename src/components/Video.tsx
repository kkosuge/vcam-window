import React, { useRef, useEffect } from 'react'
import { useUserMedia } from '../hooks/useUserMedia'

type Props = {
  constraints: MediaStreamConstraints;
}

export const Video: React.FC<Props> = ({ constraints }) => {
  const { stream } = useUserMedia(constraints)
  const videoRef = useRef()

  useEffect(() => {
    if (videoRef && stream) {
      (videoRef.current as HTMLVideoElement).srcObject = stream
    }
  }, [videoRef, stream])

  if (stream) {
    return <video width={1280} height={720} ref={videoRef} autoPlay></video>
  } else {
    return <div>loading...</div>
  }
}
