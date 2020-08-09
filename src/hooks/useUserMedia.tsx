import { useState, useEffect } from 'react'

export type UserMedia = {
  stream?: MediaStream | null;
  error?: MediaStreamError | null;
}

export function useUserMedia(constraints: MediaStreamConstraints): UserMedia {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<MediaStreamError | null>(null)

  useEffect(() => {
    if (stream) return

    let didCancel = false

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        if (!didCancel) {
          setStream(stream)
        }
      } catch (err) {
        if (!didCancel) {
          setError(err)
        }
      }
    }

    const cancel = () => {
      didCancel = true

      if (!stream) return

      if ((stream as MediaStream).getVideoTracks) {
        (stream as MediaStream).getVideoTracks().map(track => track.stop())
      }

      if ((stream as MediaStream).getAudioTracks) {
        (stream as MediaStream).getAudioTracks().map(track => track.stop())
      }
    }

    getUserMedia()

    return cancel
  }, [constraints, stream, error, setStream])

  return {
    stream,
    error,
  }
}
