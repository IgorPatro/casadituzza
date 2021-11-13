import React from 'react'
import Image from 'assets/images/icon.png'

interface Props {
  title: string
}

const TestComponent: React.FC<Props> = (props) => {
  return (
    <div>
      This is test component with props <br />
      <b>The title prop: {props.title}</b>
      <img src={Image} alt="img" />
    </div>
  )
}

export default TestComponent
