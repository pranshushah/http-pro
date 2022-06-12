import React from 'react';
//@ts-ignore
import Image from '@theme/IdealImage';
import InputImage from '../../../static/img/Input.png';
import HpResponseImage from '../../../static/img/HpResponse.png';
import HttpOptionsImage from '../../../static/img/HpOptions.png';

export function Input() {
  return <Image img={InputImage} />;
}

export function HttpOptions() {
  return <Image img={HttpOptionsImage} />;
}

export function HpResponse() {
  return <Image img={HpResponseImage} />;
}
