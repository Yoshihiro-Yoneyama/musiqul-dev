const Text1 = (props: { content: string }) => {
  const {content} = props
  // const a = props.content
  return <p className="test">{content}子供</p>
}

const Message = () => {
  const content1 = "This is a prent component"
  const content2 = "Message users Text component"

  return (
    <div>
      <Text1 content={content1}/>
      <Text1 content={content2}/>
    </div>
  )
}

export default Message;