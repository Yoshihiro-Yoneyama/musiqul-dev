import styled, {css} from "styled-components";
import {NextPage} from "next";

const Text = styled.p`
    color: blue;
    font-weight: normal;
`
const BorderText = styled(Text)`
    text-align: center;
    padding: 8px 16px;
    border: 50px solid lightblue;
    border-radius: 25px;
`

const Width = styled.div`
    border: 50px solid red;
    border-radius: 20px;
    width: 20rem;
`

const Page4: NextPage = () => {
  return (
    <Width>
      {/*<Text>Hello</Text>*/}
      <BorderText>World!</BorderText>
      <div>
        <p>Hoge</p>
      </div>
    </Width>
  )
}

export default Page4