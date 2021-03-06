import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { noop } from '@/nice-router/nice-router-util'
import { useCountdown } from '@/service/use.service'
import Config from '@/utils/config'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { AtInput } from 'taro-ui'

import './form/field/styles.scss'

function MobileVerifyCode(props) {
  const { second, counting, startCount } = useCountdown(props.maxCount)

  const { onChange, name, value, placeholder, className } = props

  const sendCode = async () => {
    if (counting) {
      return
    }
    if (!/^1\d{10}$/.test(value)) {
      await Taro.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    startCount()
    NavigationService.ajax(Config.api.VerifyCode, { mobile: value })
  }

  const tips = counting ? `${second}秒...` : '获取验证码'
  const rootClass = classNames('ele-vcode', className)
  const txtClass = classNames('ele-vcode-txt', { 'ele-vcode-txt-disabled': counting })
  return (
    <AtInput
      name={name}
      border={false}
      type='phone'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={rootClass}
    >
      <View className={txtClass} onClick={sendCode}>
        {tips}
      </View>
    </AtInput>
  )
}

MobileVerifyCode.defaultProps = {
  name: '',
  placeholder: '请输入手机号码',
  onChange: noop,
  maxCount: 60,
}
export default MobileVerifyCode
