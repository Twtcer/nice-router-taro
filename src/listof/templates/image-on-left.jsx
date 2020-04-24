import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import ServerImage from '@/server-image/server-image'

import { getImageUrl } from '../listof-helper'
import './styles.scss'

function ImageOnLeft(props) {
  const { item = {} } = props
  const { title, brief } = item
  const src = getImageUrl(item)

  const rootClass = classNames('auto', 'image-on-left')

  return (
    <View className={rootClass}>
      {src && <ServerImage className='auto-content-image' src={src} />}
      <View className='auto-content'>
        <Text className='auto-content-title' numberOfLines={1}>
          {title}
        </Text>
        <Text className='auto-content-brief' numberOfLines={1}>
          {brief}
        </Text>
      </View>
    </View>
  )
}

ImageOnLeft.options = {
  addGlobalClass: true,
}

export default ImageOnLeft
