import { useSelector } from 'react-redux'
import { selectChannelById } from '../slices/channelsSlice.js'

const useChannel = id => useSelector(state => selectChannelById(state, id))

export default useChannel
