import { useSelector } from 'react-redux'

export default function useSettings() {
  const app = useSelector((state) => state.app)
  const settings = app?.settings
  const isInitialized = app?.isInitialized

  return { settings, isInitialized }
}
