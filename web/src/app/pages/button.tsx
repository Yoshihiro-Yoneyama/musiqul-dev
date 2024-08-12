import styled from "styled-components";
import {NextPage} from "next";

type ButtonProps = {
  color: string
  background: string
}

const Button = styled.button<ButtonProps>`
    color: ${(props) => props.color};
    background: ${(props) => props.background};
    border: 2px solid ${(props) => props.color};
    
    font-size: 2em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 8px;
    cursor: pointer;
`

const Page2: NextPage = () => {
  return (
    <div>
      <Button background="transparent" color="#FF0000">
        <div>Hello
          <div>hello2</div>
        </div>
      </Button>
      <Button color="white" background="#1E90FF">
        World!
      </Button>
    </div>
  )
}

export default Page2