import React from "react"

interface Props {
  title: string
}

const TestComponent: React.FC<Props> = (props) => {
  return (
    <div>
      This is test component with props <br />
      <b>The title prop: {props.title}</b>
    </div>
  )
}

export default TestComponent
