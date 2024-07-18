const Text2 = (props: {content: string}) => {
  const {content} = props

  return <p className="text">{content}</p>
}

const Message = (props: {}) => {
  const contentOfParentComponent1 = "this is parent component"
  const contentOfParentComponent2 = "message uses text2 component"

  return (
    <div>
      <Text2 content={contentOfParentComponent1}/>
      <Text2 content={contentOfParentComponent2}/>
    </div>
  )
}

export default Message