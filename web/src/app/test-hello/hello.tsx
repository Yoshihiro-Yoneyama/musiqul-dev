'use client';
//クリックするとアラートを出す
const Hello = () => {
  const onClick = () => {
    alert('Hello');
  }
  const text: String = "Hello, World!";

  return (
    <div onClick={onClick}>
      {text}
    </div>
  )
}


export default Hello;